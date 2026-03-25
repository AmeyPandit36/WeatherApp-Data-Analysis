WeatherApp Data Analysis

A high-performance Flask application that delivers real-time weather metrics, 7-day historical data, and 3-day predictive forecasting. The system features a custom-built Glassmorphism UI and a weather-adaptive Canvas animation engine.


Live Deployment: https://weatherapp-data-analysis.onrender.com/

📂 Repository Architecture
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

🛠 Technical Stack
Backend Infrastructure
 * Framework: Flask (Python)
 * Data Sourcing: WeatherAPI (Real-time & Historical JSON endpoints)
 * Geospatial Logic: geopy (Nominatim) for coordinates & timezonefinder for localized UTC offsets
 * Server: Gunicorn (WSGI HTTP Server)
Frontend & Visualization
 * Interface: Modern Glassmorphism (CSS3 Variables & Backdrop-filters)
 * Animations: Custom JavaScript Canvas API (Dynamic particle systems for Rain, Sun, Snow, and Clouds)
 * Iconography: Font Awesome 6.5.1 (SVG-based)
🚀 Core Functionalities
 * Global Weather Engine: Accurate temperature, humidity, and condition fetching for any valid city worldwide.
 * Adaptive UI: The interface background (weather-bg.js) detects the weather condition from the API response and automatically switches between sun rays, rain droplets, snow particles, or moving clouds.
 * Temporal Data: * Past: 7-day historical lookback for trend analysis.
   * Future: 3-day forecast for planning.
 * Responsive Layout: Fully optimized for mobile, tablet, and desktop viewing using CSS Grid and Flexbox.
⚙️ Installation & Local Setup
1. Environment Setup
git clone <your-repo-url>
cd weather-analysis
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

2. Dependency Management
pip install -r requirements.txt

3. API Configuration
You must have an API key from WeatherAPI. Replace the placeholder in app.py or set it as an environment variable.
4. Execution
flask run

⚠️ Development Status
 * Analysis Module: The MySQL-based historical analysis dashboard (Pandas/Matplotlib) is currently commented out in app.py to prioritize the live forecasting service.
 * Future Roadmap: Integration of Chart.js for hourly temperature trends and browser-based Geolocation API for automatic city detection.
