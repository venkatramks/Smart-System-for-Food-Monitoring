# 🧠 Smart System for Food Monitoring

A real-time **IoT-enabled Smart Refrigerator** that monitors food freshness and tracks items using **RFID** and **temperature/humidity sensors**. Built using **ESP32**, **Python Flask**, **React.js**, and **Supabase**.

---

## 📦 Features

* 🏷️ **RFID-based Food Identification**
  Each item is tagged and scanned via RFID for precise tracking.

* 🌡️ **Temperature & Humidity Monitoring**
  ESP32 continuously sends real-time temperature and humidity readings using DHT sensors.

* ⚠️ **Food Freshness Alerts**
  Based on expiry logic and ML-based condition prediction, the system alerts users if food is about to expire or spoiled.

* 🛄 **Live Data Sync with Supabase**
  All scanned items are stored in Supabase and displayed on a live React dashboard.

* 📱 **Modern PWA Dashboard**
  Sleek UI built with React + Tailwind + Context API for managing fridge items visually.

---

## 🧠 Tech Stack

### 👨‍💻 Frontend

* React.js with Hooks
* Tailwind CSS
* Context API
* React Router
* Progressive Web App (PWA) support
* Axios for API calls

### 🌐 Backend

* Python Flask (IoT Serial Handling)
* RFID reader via SPI (MFRC522)
* DHT22 sensor (Temperature + Humidity)
* ML model for food condition (`joblib`-based)

### 🔗 Database

* **Supabase** (PostgreSQL, Realtime, Auth)

---

## 📁 Folder Structure

```
smart-food-monitoring/
├── backend/
│   └── vision/
│       ├── app.py                      # Flask server for ESP32 communication
│       └── models/                    # ⬆️ Manually create this folder
│           ├── try_condition_model.pkl
│           └── Fruits_Vegetables_Dataset(12000)/
│               └── [dataset files]
├── frontend/
│   └── src/
│       ├── components/
│       └── context/
├── requirements.txt
└── README.md
```

---

## 🧠 Machine Learning Models

We use pre-trained `.pkl` models for freshness detection and classification.

### 🔗 Download `.pkl` Model Files

Get all required model files from the following Google Drive link:

📂 **[Download Model Files (.pkl)](https://drive.google.com/drive/folders/1604KjtqgklhdLasJK6XrEO4D7VeBrUqS?usp=sharing)**

> After downloading, **create a folder** named `models` inside `backend/vision/` and place the `.pkl` files there.

---

## 🍎 Dataset

This project originally used a large fruits and vegetables dataset, which is **not included** in the repository due to size limits.

Download it manually from:

🔗 **[Kaggle – Fruits & Vegetables Dataset (12,000)](https://www.kaggle.com/datasets/muhriddinmuxiddinov/fruits-and-vegetables-dataset)**

> After downloading, extract and place the dataset folder inside:
> `backend/vision/models/Fruits_Vegetables_Dataset(12000)/`

---

## 🚀 Getting Started

### 🔌 Hardware Setup

* ESP32 with:

  * MFRC522 RFID Module (SPI)
  * DHT22 Sensor (GPIO)
* Power supply + serial connection

### 🧪 Backend (Flask)

```bash
cd backend/vision
pip install -r ../../requirements.txt
python app.py  # Runs on http://127.0.0.1:5002
```

Make sure the models folder and all required files exist before running the server.

---

### 🚀 Frontend (React)

```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

---

## 🚀 Future Improvements

* Integration with voice command module
* Food suggestion system powered by LLMs
* Expiry notification through WhatsApp/Telegram bots

---

## 🙏 Acknowledgments

Built with love by passionate AI + IoT developers focused on smart food systems and sustainability.
