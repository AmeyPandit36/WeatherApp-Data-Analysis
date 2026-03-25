# WeatherApp Data Analysis

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-46E3B7?logo=render&logoColor=white)](https://weatherapp-data-analysis.onrender.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Framework-Flask-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Gunicorn](https://img.shields.io/badge/Server-Gunicorn-499848?logo=gunicorn&logoColor=white)](https://gunicorn.org/)

A high-performance Flask application that delivers **real-time weather metrics**, **7-day historical data**, and **3-day predictive forecasting**. The system features a custom-built Glassmorphism UI and a weather-adaptive Canvas animation engine.

🌐 **Live Deployment:** [https://weatherapp-data-analysis.onrender.com/](https://weatherapp-data-analysis.onrender.com/)

---

## 📋 Table of Contents

- [Repository Architecture](#-repository-architecture)
- [Technical Stack](#️-technical-stack)
- [Core Functionalities](#-core-functionalities)
- [Installation & Local Setup](#️-installation--local-setup)
- [Development Status](#️-development-status)

---

## 📂 Repository Architecture

```
.
├── app.py                 # Core Flask backend & API integration logic
├── requirements.txt       # Production dependencies
├── Procfile               # Heroku/Render process configuration
├── CNAME                  # Domain routing configuration
├── walkthrough.md         # Technical UI redesign documentation
├── static/
│   ├── css/style.css      # Glassmorphism design system & staggered animations
│   └── js/weather-bg.js   # Canvas-based dynamic background engine
└── templates/
    ├── home.html          # Primary dashboard (Live, History, Forecast)
    └── analysis.html      # Data visualization layer (Legacy/Disabled)
```

---

## 🛠️ Technical Stack

### Backend Infrastructure

| Component | Technology |
|-----------|-----------|
| Framework | Flask (Python) |
| Data Sourcing | [WeatherAPI](https://www.weatherapi.com/) — Real-time & Historical JSON endpoints |
| Geospatial Logic | `geopy` (Nominatim) for coordinates & `timezonefinder` for localized UTC offsets |
| Server | Gunicorn (WSGI HTTP Server) |

### Frontend & Visualization

| Component | Technology |
|-----------|-----------|
| Interface | Modern Glassmorphism (CSS3 Variables & Backdrop-filters) |
| Animations | Custom JavaScript Canvas API — particle systems for Rain, Sun, Snow, and Clouds |
| Iconography | Font Awesome 6.5.1 (SVG-based) |

---

## 🚀 Core Functionalities

- **Global Weather Engine** — Accurate temperature, humidity, and condition fetching for any valid city worldwide.
- **Adaptive UI** — `weather-bg.js` detects the current weather condition from the API response and automatically switches between sun rays, rain droplets, snow particles, or moving clouds.
- **Temporal Data**
  - 📅 **Past** — 7-day historical lookback for trend analysis.
  - 🔮 **Future** — 3-day forecast for planning.
- **Responsive Layout** — Fully optimized for mobile, tablet, and desktop viewing using CSS Grid and Flexbox.

---

## ⚙️ Installation & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AmeyPandit36/WeatherApp-Data-Analysis.git
cd WeatherApp-Data-Analysis
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure the API Key

Obtain a free API key from [WeatherAPI](https://www.weatherapi.com/) and replace the placeholder value in `app.py`:

```python
API_KEY = "your_api_key_here"
```

> **Tip:** For production, set `API_KEY` as an environment variable and read it with `os.environ.get("API_KEY")` to avoid committing secrets.

### 5. Run the Application

```bash
flask run
```

The app will be available at `http://127.0.0.1:5000/`.

---

## ⚠️ Development Status

- **Analysis Module** — The MySQL-based historical analysis dashboard (Pandas/Matplotlib) is currently commented out in `app.py` to prioritize the live forecasting service.
- **Future Roadmap**
  - Integration of Chart.js for hourly temperature trends.
  - Browser-based Geolocation API for automatic city detection.
