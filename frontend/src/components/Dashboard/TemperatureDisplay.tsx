import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const TemperatureDisplay = () => {
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [humidityData, setHumidityData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchTemp = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5002/temperature');
        const data = response.data;
        const now = new Date().toLocaleTimeString();
        setTemperatureData(prev => [...prev.slice(-9), data.temperature]);
        setHumidityData(prev => [...prev.slice(-9), data.humidity]);
        setLabels(prev => [...prev.slice(-9), now]);

        if (data.temperature > 40) {
          beep();
        }
      } catch (err) {
        console.error('Error fetching temp data:', err);
      }
    };

    const interval = setInterval(fetchTemp, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Humidity (%)',
        data: humidityData,
        borderColor: 'blue',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ]
  };

  return (
    <div style={{ background: '#f3f3f3', padding: 20, borderRadius: 10, marginBottom: 20 }}>
      <h3>🌡️ Real-Time Temperature & Humidity</h3>
      <Line data={chartData} />
    </div>
  );
};

export default TemperatureDisplay;
