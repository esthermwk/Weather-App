let h2 = document.querySelector("h2");
let now = new Date();

h2.innerHTML = `Last updated: ${now}`;

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
             <div class="forecast-date"> ${day}</div>
              <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weatherIcon" width="72"/> 
              <div class="forecast-temp">
                <span class="max-temp">25</span>° <span class="min-temp">20</span>° 
              </div>
            </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector(".tempElement").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemp = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "caf5e0b506da44f3e8e5a592de514d36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#result").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "caf5e0b506da44f3e8e5a592de514d36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".tempElement");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".tempElement");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let weatherApp = document.querySelector(".weather-app");
weatherApp.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-btn");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Hong Kong");
displayForecast();
