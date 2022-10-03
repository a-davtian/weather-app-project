function getCurrentDate() {
  let now = new Date();
  let date = now.getDate();

  let timeHou = now.getHours();
  if (timeHou < 10) {
    timeHou = `0${timeHou}`;
  }
  let timeMin = now.getMinutes();
  if (timeMin < 10) {
    timeMin = `0${timeMin}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let nowDate = document.querySelector("#now-date");
  nowDate.innerHTML = `${day}, ${month} ${date}, ${timeHou}:${timeMin}`;
}
getCurrentDate();


function forecastFormatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;
  let forecast = response.data.daily;

  forecast.forEach(function(forecastDay, index){
    if (index < 6) {
forecastHTML =
  forecastHTML +
  `
    <div class="col-2">
      <div class="weather-forecast-date">${forecastFormatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="42"/>
      <div class="weather-forecast-temperetures">
        <span class="weather-forecast-tempereture-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="weather-forecast-tempereture-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>`; }
})

forecastHTML = forecastHTML + `</div`;
 forecastElement.innerHTML = forecastHTML;
 
}


function getForecast(coordinates) {

  let apiKey = `&appid=40b745c14eadad7b7c4e6e4bf3b70103`;
  let apiSite = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUnit = `&units=metric`;
  let apiUrl = `${apiSite}lat=${coordinates.lat}&lon=${coordinates.lon}${apiKey}${apiUnit}`;
 axios.get(apiUrl).then(displayForecast)
}

function changeWeatherData(response) {
  console.groupCollapsed(response.data);

  defoultTempCel = response.data.main.temp;
  document.querySelector("#now-temp").innerHTML = Math.round(defoultTempCel);

  document.querySelector("#now-city").innerHTML = response.data.name;
  document.querySelector("#now-country").innerHTML = response.data.sys.country;
  document.querySelector("#now-status").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.getElementById(
    "icon-current"
  ).src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

let sunriseInput = response.data.sys.sunrise;
let timestampRise = sunriseInput * 1000;

let sunsetInput = response.data.sys.sunset;
let timestampSet = sunsetInput * 1000;

  document.querySelector("#sunrice").innerHTML = new Date(
    timestampRise
  ).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  document.querySelector("#sunset").innerHTML = new Date(
    timestampSet
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    

  //sunset
  //sunrice

getForecast(response.data.coord);
}


function defaultSearchCity(city) {
  let apiKey = `&appid=40b745c14eadad7b7c4e6e4bf3b70103`;
  let apiSite = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let apiUnit = `&units=metric`;
  let apiUrl = `${apiSite}${city}${apiKey}${apiUnit}`;
  axios.get(apiUrl).then(changeWeatherData);
}

function getCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city-input").value;

  defaultSearchCity(city);
}

function showCurrentLocation(position) {
  let apiKey = `40b745c14eadad7b7c4e6e4bf3b70103`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeWeatherData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function changeTempFahrenheit(event) {
  event.preventDefault();
  let changeToFahrenheit = document.querySelector("#now-temp");
  //changeToCelsium.classList.remove("active");
  //changeToFahrenheit.classList.add("active");
  changeToFahrenheit.innerHTML = Math.round((defoultTempCel * 9) / 5 + 32);
}

function changeTempCelsium(event) {
  event.preventDefault();
  //changeToCelsium.classList.add("active");
  //changeToFahrenheit.classList.remove("active");
  let changeToCelsium = document.querySelector("#now-temp");
  changeToCelsium.innerHTML = Math.round(defoultTempCel);
}

let changeToCelsium = document.querySelector("#celsium-link");
changeToCelsium.addEventListener("click", changeTempCelsium);

let changeToFahrenheit = document.querySelector("#fahrenheit-link");
changeToFahrenheit.addEventListener("click", changeTempFahrenheit);

let defoultTempCel = null;

let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", getCityWeather);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

defaultSearchCity("Kyiv");


