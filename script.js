const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const form = document.querySelector(".form");

const cityName = document.querySelector(".display-weather .city");
const temp = document.querySelector(".display-weather .temperature");
const wind = document.querySelector(".display-weather .wind");
const humidity = document.querySelector(".display-weather .humidity");
const weatherForm = document.querySelector(".display-weather");
const icon = document.querySelector(".icon");
const flag = document.querySelector(".flag");
// const flagIcon = document.querySelector(".flag-icon");
const description = document.querySelector(".weatherDescription");
const alertBox = document.querySelector(".alert-box");
const alertBoxText = document.querySelector(".alert-box_text");

const API_KEY = "1208613478be6d68e54a8bb2e423956d";

const clearInputField = (element) => {
  element.value = "";
  element.focus();
};

btn.addEventListener("click", function (e) {
  e.preventDefault();
  weatherForm.classList.add("hide");

  let url;
  const city = input.value;
  if (location.protocol === "http:") {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}
    `;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}
    `;
  }
  fetch(url)
    .then((response) => {
      if (!response.ok) throw Error("Wrong city");

      return response.json();
    })
    .then((data) => {
      const weatherTemperature = data.main.temp;
      const weatherHumidity = data.main.humidity;
      const weatherWindSpeed = data.wind.speed;
      const weatherIconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
      const weatherDescription = data.weather[0]?.description;

      cityName.textContent = ` ${city[0].toUpperCase() + city.slice(1)}`;
      temp.textContent = `${weatherTemperature.toFixed(1)}°C`;
      humidity.textContent = ` ${weatherHumidity} %`;
      wind.textContent = `${weatherWindSpeed.toFixed(1)}mt/sec`;
      description.textContent =
        weatherDescription.charAt(0).toUpperCase() +
        weatherDescription.slice(1);
      const countryCode = data.sys.country;
      const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
      flag.src = flagUrl;
      icon.src = iconUrl;

      weatherForm.classList.remove("hide");
    })
    .catch((err) => {
      console.log(err);
      alertBox.classList.remove("hide");
      alertBoxText.textContent = `${err.message}, please try again`;

      setTimeout(() => {
        alertBox.classList.add("hide");
        clearInputField(input);
      }, 3000);
    });
});
