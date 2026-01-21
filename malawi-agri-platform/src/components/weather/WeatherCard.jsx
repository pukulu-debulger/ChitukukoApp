import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';

function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-500">Select a city to see weather</p>
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-500" />;
    if (lowerCondition.includes('cloud')) return <Cloud className="w-16 h-16 text-gray-400" />;
    return <Sun className="w-16 h-16 text-yellow-500" />;
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">{weather.name}</h2>
          <p className="text-blue-100">{new Date().toLocaleDateString()}</p>
        </div>
        {getWeatherIcon(weather.weather[0].main)}
      </div>

      <div className="text-center mb-6">
        <div className="text-6xl font-bold mb-2">
          {Math.round(weather.main.temp)}°C
        </div>
        <p className="text-xl text-blue-100 capitalize">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400">
        <div className="flex items-center space-x-2">
          <Wind className="w-5 h-5" />
          <div>
            <p className="text-xs text-blue-200">Wind</p>
            <p className="font-semibold">{weather.wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="w-5 h-5" />
          <div>
            <p className="text-xs text-blue-200">Humidity</p>
            <p className="font-semibold">{weather.main.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;