const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather for a city
export async function getCurrentWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city},MW&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

// Get 5-day forecast
export async function getWeatherForecast(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city},MW&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not available');
    }
    
    const data = await response.json();
    
    // Get one forecast per day (at 12:00)
    const dailyForecasts = data.list.filter(item => 
      item.dt_txt.includes('12:00:00')
    ).slice(0, 5);
    
    return dailyForecasts.map(day => ({
      date: new Date(day.dt * 1000),
      day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(day.main.temp),
      condition: day.weather[0].main,
      icon: day.weather[0].icon,
      humidity: day.main.humidity,
    }));
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
}

// Get weather icon URL
export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}


// Get weather alerts (if available)
export async function getWeatherAlerts(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city},MW&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Alert data not available');
    }
    
    const data = await response.json();
    
    // Generate alerts based on weather conditions
    const alerts = [];
    
    // Temperature alerts
    if (data.main.temp > 35) {
      alerts.push({
        type: 'extreme_heat',
        severity: 'high',
        title: 'Extreme Heat Warning',
        description: 'Temperature above 35°C. Protect crops and ensure adequate irrigation.',
        icon: '🌡️'
      });
    } else if (data.main.temp > 32) {
      alerts.push({
        type: 'heat',
        severity: 'medium',
        title: 'High Temperature Alert',
        description: 'Temperature above 32°C. Monitor crop water needs closely.',
        icon: '☀️'
      });
    }
    
    // Wind alerts
    if (data.wind.speed * 3.6 > 40) {
      alerts.push({
        type: 'wind',
        severity: 'high',
        title: 'Strong Wind Warning',
        description: 'Wind speeds above 40 km/h. Secure structures and protect young plants.',
        icon: '💨'
      });
    }
    
    // Rain alerts
    if (data.weather[0].main === 'Rain' || data.weather[0].main === 'Thunderstorm') {
      alerts.push({
        type: 'rain',
        severity: 'medium',
        title: 'Rainfall Alert',
        description: 'Rain expected. Good for crops but delay spraying activities.',
        icon: '🌧️'
      });
    }
    
    // Humidity alerts
    if (data.main.humidity > 80) {
      alerts.push({
        type: 'humidity',
        severity: 'medium',
        title: 'High Humidity Alert',
        description: 'Humidity above 80%. Monitor for fungal diseases and pests.',
        icon: '💧'
      });
    }
    
    // Low temperature alert
    if (data.main.temp < 15) {
      alerts.push({
        type: 'cold',
        severity: 'medium',
        title: 'Low Temperature Alert',
        description: 'Temperature below 15°C. Protect sensitive crops from cold damage.',
        icon: '❄️'
      });
    }
    
    return alerts;
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    return [];
  }
}

// Get detailed forecast with hourly data
export async function getDetailedForecast(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city},MW&appid=${API_KEY}&units=metric&cnt=40`
    );
    
    if (!response.ok) {
      throw new Error('Detailed forecast not available');
    }
    
    const data = await response.json();
    
    return {
      daily: getDailyForecasts(data.list),
      hourly: data.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        precipitation: item.pop * 100, // Probability of precipitation
        windSpeed: Math.round(item.wind.speed * 3.6),
      }))
    };
  } catch (error) {
    console.error('Error fetching detailed forecast:', error);
    throw error;
  }
}

// Helper function to process daily forecasts
function getDailyForecasts(forecastList) {
  const dailyData = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    
    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        conditions: [],
        icons: [],
        humidity: [],
        wind: [],
        precipitation: []
      };
    }
    
    dailyData[date].temps.push(item.main.temp);
    dailyData[date].conditions.push(item.weather[0].main);
    dailyData[date].icons.push(item.weather[0].icon);
    dailyData[date].humidity.push(item.main.humidity);
    dailyData[date].wind.push(item.wind.speed * 3.6);
    dailyData[date].precipitation.push(item.pop * 100);
  });
  
  return Object.keys(dailyData).slice(0, 5).map(date => {
    const data = dailyData[date];
    const avgTemp = Math.round(data.temps.reduce((a, b) => a + b) / data.temps.length);
    const maxTemp = Math.round(Math.max(...data.temps));
    const minTemp = Math.round(Math.min(...data.temps));
    const mostCommonCondition = data.conditions.sort((a,b) =>
      data.conditions.filter(v => v===a).length - data.conditions.filter(v => v===b).length
    ).pop();
    const mostCommonIcon = data.icons[Math.floor(data.icons.length / 2)];
    
    return {
      date: new Date(date),
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temp: avgTemp,
      maxTemp,
      minTemp,
      condition: mostCommonCondition,
      icon: mostCommonIcon,
      humidity: Math.round(data.humidity.reduce((a, b) => a + b) / data.humidity.length),
      windSpeed: Math.round(data.wind.reduce((a, b) => a + b) / data.wind.length),
      precipitation: Math.round(Math.max(...data.precipitation)),
    };
  });
}