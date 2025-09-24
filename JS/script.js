import config from "./config.js";
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");
console.log("Error element:", error);

const apiKey = config.apiKey;
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const updateWeatherDisplay = (data) => {
  console.log("API response code:", data.cod);
  if (data.cod === 200) {
    error.style.display = "none";
    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";
    const weatherCondition = data.weather[0].main.toLowerCase();

    if (weatherCondition === "clouds") {
      weatherIcon.src = "../images/clouds.png";
    } else if (weatherCondition === "clear") {
      weatherIcon.src = "../images/clear.png";
    } else if (weatherCondition === "rain") {
      weatherIcon.src = "../images/rain.png";
    } else if (weatherCondition === "drizzle") {
      weatherIcon.src = "../images/drizzle.png";
    } else if (weatherCondition === "mist") {
      weatherIcon.src = "../images/mist.png";
    } else if (weatherCondition === "snow") {
      weatherIcon.src = "../images/snow.png";
    }
  } else {
    console.log("Showing error message");
    error.style.display = "block";
  }
};

const checkWeather = async (cityName) => {
  try {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    const data = await response.json();
    updateWeatherDisplay(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      () => {
        checkWeather("Mingora");
      }
    );
  } else {
    checkWeather("Mingora");
  }
};

const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(`${geoApiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await response.json();
    updateWeatherDisplay(data);
  } catch (error) {
    console.error("Error:", error);
    checkWeather("Mingora");
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

getUserLocation();
