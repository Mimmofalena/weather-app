const btn = document.querySelector(".form button");
const input = document.querySelector(".form_custom input");
const form = document.querySelector(".form");

const cityName = document.querySelector(".display-weather .city");
const temp = document.querySelector(".display-weather .temperature");
const wind = document.querySelector(".display-weather .wind");
const description = document.querySelector(".display-weather .description");
const weatherForm = document.querySelector(".display-weather");

const API_KEY = "1208613478be6d68e54a8bb2e423956d";

btn.addEventListener("click", function (e) {
  e.preventDefault();

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
      const weatherDescription = data.weather[0].description;
      const weatherWindSpeed = data.wind.speed;

      cityName.innerHTML = `City  <strong>${
        city[0].toUpperCase() + city.slice(1)
      }</strong>`;
      temp.innerHTML = `Temperature <strong>${weatherTemperature.toFixed(
        1
      )}°C</strong>`;
      description.innerHTML = `Currently <strong>${
        weatherDescription[0].toUpperCase() + weatherDescription.slice(1)
      }</strong>`;
      wind.innerHTML = `Wind speed <strong>${weatherWindSpeed.toFixed(
        1
      )} meter/sec</strong>`;

      weatherForm.classList.remove("hide");
    })
    .catch((err) => {
      alert(err.message);
    });
});
