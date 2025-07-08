import React, { useState, useEffect, useRef, useCallback } from 'react';
import FridgeContents from './FridgeContents';
import DateTimeDisplay from './DateTimeDisplay';
import TemperatureDisplay from './TemperatureDisplay';
import RFIDScanner from '../CameraView/RFIDScanner';
import styles from './styles.module.css';
import { supabase } from '../supabase/supabase';
import { useFridge } from '../../context/FridgeContext';

interface FridgeItem {
  id: number;
  name: string;
  quantity: number;
  storage_day: number;
}

const fruitExpiry: Record<string, number> = {
  FreshApple: 30,
  FreshBanana: 2,
  FreshMango: 5,
  FreshOrange: 10,
  FreshStrawberry: 2
};

const vegetableExpiry: Record<string, number> = {
  FreshBellpepper: 7,
  FreshCarrot: 14,
  FreshCucumber: 5,
  FreshPotato: 30,
  FreshTomato: 7
};

function beep() {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.1);
}

function Dashboard() {
  const [fridgeItemsLocal, setFridgeItemsLocal] = useState<FridgeItem[]>([]);
  const notifiedItemsRef = useRef<Set<string>>(new Set());
  const { setFridgeItems } = useFridge();
  const lastScannedRef = useRef<string | null>(null);

  const fetchFridgeContents = useCallback(async () => {
    const { data, error } = await supabase.from('fridge_contents').select('*');
    if (error) {
      console.error('Error fetching fridge contents:', error.message);
    } else {
      setFridgeItemsLocal(data || []);
      setFridgeItems(data || []);
    }
  }, [setFridgeItems]);

  useEffect(() => {
    fetchFridgeContents();
    const intervalId = setInterval(fetchFridgeContents, 5000);
    return () => clearInterval(intervalId);
  }, [fetchFridgeContents]);

  useEffect(() => {
    fridgeItemsLocal.forEach((item) => {
      const expiryDays =
        fruitExpiry[item.name] || vegetableExpiry[item.name] || null;
      if (expiryDays !== null) {
        const daysLeft = expiryDays - item.storage_day;
        const notifyKey = `${item.name}-${daysLeft}`;
        if (!notifiedItemsRef.current.has(notifyKey)) {
          if (daysLeft === 1) {
            alert(`⚠️ ${item.name} is about to expire!`);
            notifiedItemsRef.current.add(notifyKey);
          } else if (daysLeft <= 0) {
            beep();
            alert(`❌ ${item.name} has expired!`);
            notifiedItemsRef.current.add(notifyKey);
          }
        }
      }
    });
  }, [fridgeItemsLocal]);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from('fridge_contents').delete().match({ id });
      if (!error) fetchFridgeContents();
    } catch (error) {
      console.error('❌ Unexpected error:', error);
    }
  };

  const handleRFIDScan = async (uid: string, itemName: string) => {
    if (!uid || !itemName || itemName === "Unknown" || itemName === "No Card") return;

    if (lastScannedRef.current === uid) return; // Prevent duplicate scan
    lastScannedRef.current = uid;

    try {
      const { data, error } = await supabase
        .from('fridge_contents')
        .insert([{ name: itemName, quantity: 1, storage_day: 0 }]);

      if (error) {
        console.error('Error adding item to fridge:', error.message);
      } else {
        console.log('✅ Item added:', data);
        fetchFridgeContents();
      }
    } catch (error) {
      console.error('❌ Error during RFID insert:', error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.fridgeBackground}>
        <DateTimeDisplay />
        <TemperatureDisplay />
        <RFIDScanner onScan={handleRFIDScan} />
        <FridgeContents items={fridgeItemsLocal} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Dashboard;
