import { useState, useEffect } from 'react';
import { MapPin, AlertCircle, Cloud, Droplets, Wind, Sun, CloudRain, Thermometer, Eye } from 'lucide-react';
import { getCurrentWeather, getWeatherAlerts, getDetailedForecast } from '../utils/weatherApi';

function Weather() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Lilongwe');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [detailedForecast, setDetailedForecast] = useState(null);
  const [showHourly, setShowHourly] = useState(false);

  // Load cities
  useEffect(() => {
    fetch('/data/cities.json')
      .then(res => res.json())
      .then(data => setCities(data.cities))
      .catch(err => console.error('Error loading cities:', err));
  }, []);

  // Fetch weather when city changes
  useEffect(() => {
    if (!selectedCity) return;

    const getWeather = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch all weather data in parallel
        const [currentData, alertsData, forecastData] = await Promise.all([
          getCurrentWeather(selectedCity),
          getWeatherAlerts(selectedCity),
          getDetailedForecast(selectedCity)
        ]);
        
        // Transform current weather data
        setWeather({
          name: selectedCity,
          main: { 
            temp: currentData.temp, 
            humidity: currentData.humidity,
            feels_like: currentData.feelsLike,
            temp_min: currentData.temp - 2,
            temp_max: currentData.temp + 4
          },
          weather: [{ 
            main: currentData.condition, 
            description: currentData.description, 
            icon: currentData.icon 
          }],
          wind: { speed: currentData.windSpeed / 3.6 },
          visibility: 10000,
          clouds: { all: 40 }
        });
        
        // Set alerts and forecast
        setAlerts(alertsData);
        setDetailedForecast(forecastData);
        
      } catch (err) {
        setError('Could not load weather data. Please check your internet connection.');
        console.error(err);
      }
      
      setLoading(false);
    };

    getWeather();
  }, [selectedCity]);

  const getFarmingTips = () => {
    if (!weather) return [];
    
    const tips = [];
    
    if (weather.main.temp > 25 && weather.main.temp < 32) {
      tips.push({
        icon: Sun,
        color: 'amber',
        title: 'Good conditions for planting',
        description: 'Temperature and humidity are ideal for maize planting today.'
      });
    }
    
    if (weather.main.temp > 30) {
      tips.push({
        icon: Thermometer,
        color: 'red',
        title: 'High temperatures',
        description: 'Ensure crops are well watered. Consider irrigating in the evening.'
      });
    }
    
    if (weather.main.humidity > 70) {
      tips.push({
        icon: Droplets,
        color: 'blue',
        title: 'High humidity',
        description: 'Watch for fungal diseases. Ensure good air circulation around plants.'
      });
    }
    
    if (weather.wind.speed > 5) {
      tips.push({
        icon: Wind,
        color: 'gray',
        title: 'Windy conditions',
        description: 'Secure young plants and protect sensitive crops from wind damage.'
      });
    }

    if (tips.length === 0) {
      tips.push({
        icon: Sun,
        color: 'green',
        title: 'Normal conditions',
        description: 'Weather conditions are favorable for most farming activities today.'
      });
    }
    
    return tips;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with gradient background */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          Weather Forecast
        </h1>
        <p className="text-blue-100 text-lg">
          Real-time weather information to help plan your farming activities
        </p>
      </div>

      {/* City Selector */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <MapPin className="w-4 h-4 inline mr-2" />
          Select Your Location
        </label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-lg"
        >
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name} - {city.region} Region
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800 font-semibold">{error}</p>
            <p className="text-xs text-yellow-600 mt-1">
              Check your API key in .env file
            </p>
          </div>
        </div>
      )}

      {/* Weather Alerts */}
      {!loading && alerts.length > 0 && (
        <div className="mb-6 space-y-3">
          {alerts.map((alert, index) => {
            const severityColors = {
              high: 'bg-red-50 border-red-500 text-red-800',
              medium: 'bg-amber-50 border-amber-500 text-amber-800',
              low: 'bg-blue-50 border-blue-500 text-blue-800'
            };
            
            return (
              <div 
                key={index}
                className={`${severityColors[alert.severity]} border-l-4 rounded-lg p-4 flex items-start space-x-3 shadow-md animate-pulse`}
              >
                <span className="text-2xl flex-shrink-0">{alert.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-lg">{alert.title}</p>
                  <p className="text-sm mt-1">{alert.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  alert.severity === 'high' ? 'bg-red-200 text-red-900' :
                  alert.severity === 'medium' ? 'bg-amber-200 text-amber-900' :
                  'bg-blue-200 text-blue-900'
                }`}>
                  {alert.severity}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading weather data...</p>
        </div>
      ) : weather ? (
        <>
          {/* Current Weather & Farming Tips Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Current Weather Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-100 mb-2 text-sm">Current Weather in {weather.name}</p>
                  <h3 className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</h3>
                  <p className="text-2xl mt-2 capitalize">{weather.weather[0].description}</p>
                  <p className="text-blue-200 text-sm mt-1">
                    Feels like {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
                <Cloud className="w-24 h-24 text-white opacity-30" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white border-opacity-20">
                <div>
                  <Droplets className="w-6 h-6 mb-2 text-blue-200" />
                  <p className="text-2xl font-bold">{weather.main.humidity}%</p>
                  <p className="text-sm text-blue-200">Humidity</p>
                </div>
                <div>
                  <Wind className="w-6 h-6 mb-2 text-blue-200" />
                  <p className="text-2xl font-bold">{Math.round(weather.wind.speed * 3.6)}</p>
                  <p className="text-sm text-blue-200">km/h</p>
                </div>
                <div>
                  <Eye className="w-6 h-6 mb-2 text-blue-200" />
                  <p className="text-2xl font-bold">{(weather.visibility / 1000).toFixed(1)}</p>
                  <p className="text-sm text-blue-200">km</p>
                </div>
              </div>

              {/* Min/Max Temperature */}
              <div className="mt-6 pt-6 border-t border-white border-opacity-20 flex justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Min Temp</p>
                  <p className="text-2xl font-bold">{Math.round(weather.main.temp_min)}°C</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-sm">Max Temp</p>
                  <p className="text-2xl font-bold">{Math.round(weather.main.temp_max)}°C</p>
                </div>
              </div>
            </div>

            {/* Farming Tips Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sun className="w-6 h-6 mr-2 text-amber-600" />
                Today's Farming Tips
              </h3>
              <div className="space-y-4">
                {getFarmingTips().map((tip, index) => {
                  const Icon = tip.icon;
                  const colorClasses = {
                    amber: 'bg-amber-500',
                    blue: 'bg-blue-500',
                    red: 'bg-red-500',
                    gray: 'bg-gray-500',
                    green: 'bg-green-500'
                  };
                  
                  return (
                    <div key={index} className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-sm">
                      <div className={`${colorClasses[tip.color]} rounded-full p-2 mt-1 flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{tip.title}</p>
                        <p className="text-gray-600 text-sm mt-1">{tip.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          {detailedForecast && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Cloud className="w-6 h-6 mr-2 text-primary-600" />
                  5-Day Forecast
                </h3>
                <button
                  onClick={() => setShowHourly(!showHourly)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all"
                >
                  {showHourly ? 'Show Daily' : 'Show Hourly'}
                </button>
              </div>
              
              {/* Daily Forecast */}
              {!showHourly && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {detailedForecast.daily.map((day, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center hover:from-primary-50 hover:to-primary-100 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-primary-500"
                    >
                      <p className="text-gray-600 font-semibold mb-2">{day.day}</p>
                      <p className="text-xs text-gray-500 mb-3">{day.fullDate}</p>
                      <img 
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                        alt={day.condition}
                        className="w-16 h-16 mx-auto mb-3"
                      />
                      <div className="space-y-1">
                        <p className="text-3xl font-bold text-gray-900">{day.temp}°</p>
                        <p className="text-xs text-gray-500">
                          H: {day.maxTemp}° L: {day.minTemp}°
                        </p>
                        <p className="text-xs text-gray-600 mt-2">{day.condition}</p>
                        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600 space-y-1">
                          <div className="flex items-center justify-center gap-1">
                            <Droplets className="w-3 h-3" />
                            <span>{day.humidity}%</span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <Wind className="w-3 h-3" />
                            <span>{day.windSpeed} km/h</span>
                          </div>
                          {day.precipitation > 0 && (
                            <div className="flex items-center justify-center gap-1">
                              <CloudRain className="w-3 h-3" />
                              <span>{day.precipitation}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Hourly Forecast */}
              {showHourly && detailedForecast.hourly && (
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-4">
                    {detailedForecast.hourly.map((hour, idx) => (
                      <div 
                        key={idx}
                        className="flex-shrink-0 bg-gray-50 rounded-xl p-4 text-center min-w-[120px] hover:bg-primary-50 transition-all border-2 border-transparent hover:border-primary-500"
                      >
                        <p className="text-sm font-semibold text-gray-600 mb-2">{hour.time}</p>
                        <img 
                          src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                          alt={hour.condition}
                          className="w-12 h-12 mx-auto mb-2"
                        />
                        <p className="text-2xl font-bold text-gray-900 mb-2">{hour.temp}°</p>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex items-center justify-center gap-1">
                            <Wind className="w-3 h-3" />
                            <span>{hour.windSpeed} km/h</span>
                          </div>
                          {hour.precipitation > 0 && (
                            <div className="flex items-center justify-center gap-1 text-blue-600">
                              <CloudRain className="w-3 h-3" />
                              <span>{hour.precipitation}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Weather Alert Info */}
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-3 shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Weather Tips for Farmers
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Check weather daily to plan planting and harvesting activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Monitor rainfall forecasts for irrigation planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Protect crops during extreme weather conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Use weather data to optimize fertilizer and pesticide application</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Weather;