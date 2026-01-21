// Weather API utility
const WEATHER_API_KEY = 'YOUR_API_KEY'; // We'll add this later
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?q=${city},MW&appid=${WEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('Weather data not available');
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?q=${city},MW&appid=${WEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('Forecast not available');
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};