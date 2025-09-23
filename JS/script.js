import config from "./config.js";
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");

const apiKey = config.apiKey;
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const checkWeather = async () => {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  let data = await response.json();
  console.log(data);
};
checkWeather();
