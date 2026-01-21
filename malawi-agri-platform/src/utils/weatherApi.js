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