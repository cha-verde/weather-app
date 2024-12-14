import "./styles.css";
import loadingIcon from "./assets/loading-icon.gif";

const form = document.querySelector("form");
const input = document.querySelector("input");
const p = document.querySelector("p");
const weatherIcon = document.querySelector(".weather-icon-container");
const location = document.querySelector(".location")
const condition = document.querySelector(".condition")
const temperature = document.querySelector(".temperature")



let isCelsius = true;

class Weather {
  constructor(data) {
    this.place = data.resolvedAddress;
    this.temperature = data.currentConditions.temp;
    this.conditions = data.currentConditions.conditions;
    this.days = data.days;
    this.description = data.description;
  }
}

async function getWeatherData(location) {
  try {
    const unit = isCelsius ? "metric" : "us"
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        location +
        "?unitGroup=us&key=VPSWES24WT3MDWTW337UUCEW5&contentType=json"
    );
    const data = await response.json();
    const d = new Weather(data);
    return d;
  } catch (error) {
    console.log(error);
  }
}



form.addEventListener("submit", function (event) {
  event.preventDefault();

  const icon = document.createElement("img")

  getWeatherData(input.value).then((data) => {
    icon.src = require('./assets/weather-icons/' + data.days[0].icon + '.svg')
    weatherIcon.appendChild(icon)
    location.textContent = data.place;
    condition.textContent = data.description;
    temperature.textContent = data.temperature + "°C";
    input.value = ""
  });
});

// getWeatherData()
