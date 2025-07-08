// CameraView.tsx

import React, { useState, useEffect, useCallback } from 'react';
import ObjectDetection from './ObjectDetection';
import styles from './styles.module.css';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { supabase } from '../supabase/supabase';

function CameraView() {
    const [detectedItems, setDetectedItems] = useState<{ name: string; count: number }[]>([]);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    const ipWebcamUrl = "http://192.168.114.28:8080/video";

    const playBeep = () => {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
        oscillator.start();

        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
        oscillator.stop(audioCtx.currentTime + 0.2);
    };

    const analyzeFrame = useCallback(async () => {
        if (!cameraEnabled) return;

        try {
            const response = await axios.post("http://127.0.0.1:5001/api/analyze_image", {
                camera_on: true
            });

            if (response.data && response.data.food_type) {
                updateDetectedItems(response.data.food_type);
            }

            if (response.data?.food_type?.startsWith("Rotten")) {
                playBeep();
            }

            setAnalysisResult(response.data);
        } catch (error: any) {
            console.error("Error analyzing image:", error);
            setAnalysisResult({ error: error.message });
        }
    }, [cameraEnabled]);

    const updateDetectedItems = (foodType: string) => {
        setDetectedItems((prevItems) => {
            const existingItem = prevItems.find(item => item.name === foodType);
            if (existingItem) {
                return prevItems.map(item =>
                    item.name === foodType ? { ...item, count: item.count + 1 } : item
                );
            } else {
                return [...prevItems, { name: foodType, count: 1 }];
            }
        });
    };

    const insertIntoSupabase = async () => {
        if (detectedItems.length === 0) {
            console.log("⚠️ No detected items to insert.");
            return;
        }

        console.log("📦 Inserting items into Supabase:", detectedItems);

        try {
            const { data, error } = await supabase
                .from('fridge_contents')
                .insert(detectedItems.map(item => ({
                    name: item.name,
                    quantity: item.count
                })))
                .select('*');

            if (error) {
                console.error('⚠️ Supabase Insert Error:', error.message);
            } else {
                console.log('✅ Successfully inserted into Supabase:', data);
                setDetectedItems([]);
            }
        } catch (err) {
            console.error('❌ Unexpected insert error:', err);
        }
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (cameraEnabled) {
            intervalId = setInterval(analyzeFrame, 1000);
        }
        return () => clearInterval(intervalId);
    }, [cameraEnabled, analyzeFrame]);

    return (
        <div className={styles.cameraViewContainer}>
            <FormControlLabel
                control={<Switch checked={cameraEnabled} onChange={(e) => setCameraEnabled(e.target.checked)} />}
                label="Camera"
            />

            {cameraEnabled && (
                <img 
                    src={ipWebcamUrl} 
                    alt="Live Camera Feed" 
                    width="640" 
                    height="480" 
                    style={{ border: "2px solid black" }} 
                />
            )}

            <ObjectDetection detections={detectedItems.map(item => item.name)} />

            <button onClick={insertIntoSupabase} style={{ marginTop: '20px' }}>
                Save to Supabase
            </button>

            {analysisResult && (
                <div>
                    <h3>Analysis Result:</h3>
                    {analysisResult.error ? (
                        <p style={{ color: 'red' }}>Error: {analysisResult.error}</p>
                    ) : (
                        <>
                            <p>Freshness: {analysisResult.freshness}</p>
                            <p>Food Type: {analysisResult.food_type}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CameraView;
       