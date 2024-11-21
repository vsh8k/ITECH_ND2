async function fetchWeather() {
  try {
    // Fetch location data
    const response = await fetch("http://ip-api.com/json");
    const data = await response.json();
    const { lat: latitude, lon: longitude, city } = data; // Destructure latitude, longitude, and city
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, City: ${city}`);

    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    // Fetch weather data
    const weatherResponse = await fetch(API_URL);
    if (!weatherResponse.ok) throw new Error(`HTTP error! Status: ${weatherResponse.status}`);
    const weatherData = await weatherResponse.json();

    const { temperature, weathercode } = weatherData.current_weather;
    const bikingAdvice = getBikingAdvice(weathercode);

    document.getElementById("weather-info").innerHTML = `
      <strong>Your Location</strong>: ${city}<br>
      <strong>Temperature</strong>: ${temperature}°C<br>
      <strong><em>Biking advice:</em></strong> ${bikingAdvice}
    `;
  } catch (error) {
    document.getElementById("weather-info").textContent = "Failed to load weather data.";
    console.error("Error fetching weather data:", error);
  }
}

async function fetchWeather() {
  try {
    const response = await fetch("http://ip-api.com/json");
    const { lat: latitude, lon: longitude, city } = await response.json();

    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResponse = await fetch(API_URL);
    if (!weatherResponse.ok) throw new Error(`HTTP error! Status: ${weatherResponse.status}`);
    const { current_weather } = await weatherResponse.json();
    const { temperature, weathercode } = current_weather;

    const advice = getBikingAdvice(weathercode, temperature);
    document.getElementById("weather-info").innerHTML = `
      <strong>Your Location</strong>: ${city}<br>
      <strong><em>Biking advice:</em></strong> ${advice}
    `;
  } catch (error) {
    document.getElementById("weather-info").textContent = "Failed to load weather data.";
    console.error("Error fetching weather data:", error);
  }
}

function getBikingAdvice(code, temp) {
  let clothing = "";

  if (temp > 20) clothing = "Wear lightweight, breathable clothing and sunglasses.";
  else if (temp > 10) clothing = "A light jacket or long-sleeve jersey with cycling shorts is ideal.";
  else if (temp > 0) clothing = "Layer up with a thermal jacket, gloves, and warm leggings.";
  else clothing = "Full winter gear: thermal layers, gloves, a windproof jacket, and a balaclava.";

  if (code === 0) return `Clear skies and ${temp}°C. Perfect for biking! ${clothing}`;
  if ([1, 2, 3].includes(code)) return `Cloudy but ${temp}°C. Good for biking. ${clothing}`;
  if ([45, 48].includes(code)) return `Foggy at ${temp}°C. Use lights and reflective gear. ${clothing}`;
  if ([51, 53, 55, 61, 63, 65].includes(code))
    return `Rainy and ${temp}°C. Wear a waterproof jacket, pants, shoe covers, and a helmet cover.`;
  if ([71, 73, 75, 85, 86].includes(code))
    return `Snowy at ${temp}°C. Wear thermal and waterproof gear. Use studded tires if biking.`;
  if (code === 95)
    return `Thunderstorms at ${temp}°C. Unsafe to bike. If you must, wear waterproof gear and stay alert.`;
  return `Unclear weather at ${temp}°C. Dress appropriately and stay safe. ${clothing}`;
}

document.addEventListener("DOMContentLoaded", fetchWeather);
