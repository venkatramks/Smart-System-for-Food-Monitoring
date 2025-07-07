# 🧠 Smart System for Food Monitoring

A real-time **IoT-enabled Smart Refrigerator** that monitors food freshness and tracks items using **RFID** and **temperature/humidity sensors**. Built using **ESP32**, **Python Flask**, **React.js**, and **Supabase**.

---

## 📦 Features

- 🏷️ **RFID-based Food Identification**  
  Each item is tagged and scanned via RFID for precise tracking.

- 🌡️ **Temperature & Humidity Monitoring**  
  ESP32 continuously sends real-time temperature and humidity readings using DHT sensors.

- ⚠️ **Food Freshness Alerts**  
  Based on expiry logic and ML-based condition prediction, the system alerts users if food is about to expire or spoiled.

- 📤 **Live Data Sync with Supabase**  
  All scanned items are stored in Supabase and displayed on a live React dashboard.

- 📱 **Modern PWA Dashboard**  
  Sleek UI built with React + Tailwind + Context API for managing fridge items visually.

---

## 🧠 Tech Stack

### 👨‍💻 Frontend
- React.js with Hooks
- Tailwind CSS
- Context API
- React Router
- Progressive Web App (PWA) support
- Axios for API calls

### 🌐 Backend
- Python Flask (IoT Serial Handling)
- RFID reader via SPI (MFRC522)
- DHT22 sensor (Temperature + Humidity)
- ML model for food condition (`joblib`-based)

### 🔗 Database
- **Supabase** (PostgreSQL, Realtime, Auth)

---

## 🚀 Getting Started

### 🔌 Hardware Setup
- ESP32 with:
  - MFRC522 RFID Module (SPI)
  - DHT22 Sensor (GPIO)
- Power supply + serial connection

### 🧪 Backend (Flask)
```bash
cd smart-fridge-backend
pip install -r requirements.txt
python app.py  # Runs on http://127.0.0.1:5002
