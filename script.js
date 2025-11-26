// DOM Elements
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");

const cityName = document.querySelector(".display-weather .city");
const temp = document.querySelector(".display-weather .temperature");
const wind = document.querySelector(".display-weather .wind");
const humidity = document.querySelector(".display-weather .humidity");
const weatherCard = document.querySelector(".display-weather");
const weatherIcon = document.querySelector(".icon");
const flag = document.querySelector(".flag");
const description = document.querySelector(".weatherDescription");
const alertBox = document.querySelector(".alert-box");
const alertBoxText = document.querySelector(".alert-box_text");

const API_KEY = "1208613478be6d68e54a8bb2e423956d";

/**
 * Clear input field and refocus
 * @param {HTMLElement} element - Input element to clear
 */
const clearInputField = (element) => {
  element.value = "";
  element.focus();
};

/**
 * Show error alert
 * @param {string} message - Error message to display
 */
const showError = (message) => {
  alertBox.classList.remove("hide");
  alertBoxText.textContent = message;
  
  setTimeout(() => {
    alertBox.classList.add("hide");
    clearInputField(searchInput);
  }, 3000);
};

/**
 * Get weather icon URL with HTTPS
 * @param {string} iconCode - Weather icon code from API
 * @returns {string} Icon URL
 */
const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Format city name with proper capitalization
 * @param {string} city - City name
 * @returns {string} Formatted city name
 */
const formatCityName = (city) => {
  return city.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const city = searchInput.value.trim();
  
  if (!city) {
    showError("Please enter a city name");
    return;
  }
  
  weatherCard.classList.add("hide");
  
  const baseUrl = location.protocol === "http:" 
    ? "http://api.openweathermap.org" 
    : "https://api.openweathermap.org";
  
  const url = `${baseUrl}/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("City not found");
    }
    
    const data = await response.json();
    
    // Extract weather data
    const weatherTemperature = data.main.temp;
    const weatherHumidity = data.main.humidity;
    const weatherWindSpeed = data.wind.speed;
    const weatherIconCode = data.weather[0].icon;
    const weatherDescription = data.weather[0]?.description || "";
    const countryCode = data.sys.country;
    
    // Update DOM
    cityName.textContent = formatCityName(city);
    temp.textContent = `${weatherTemperature.toFixed(1)}°C`;
    humidity.textContent = `${weatherHumidity}%`;
    wind.textContent = `${weatherWindSpeed.toFixed(1)} m/s`;
    description.textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    
    flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    flag.alt = `${countryCode} flag`;
    
    weatherIcon.src = getWeatherIconUrl(weatherIconCode);
    weatherIcon.alt = weatherDescription;
    
    weatherCard.classList.remove("hide");
    
  } catch (err) {
    console.error("Weather fetch error:", err);
    showError(`${err.message}, please try again`);
  }
};

// Event Listeners
searchForm.addEventListener("submit", handleSubmit);

// Enable search on Enter key
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSubmit(e);
  }
});
