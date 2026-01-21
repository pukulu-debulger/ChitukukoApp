// Weather API utility
const WEATHER_API_KEY = '0876b4d8bbc699c009626123d8358f07';
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