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

// WEEK 5 HOME WORK

function changeWeatherData(response) {
  console.groupCollapsed(response.data);
  document.querySelector("#now-temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
  //sunset
  //sunrice
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

  //console.log(apiUrl);
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

let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", getCityWeather);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

defaultSearchCity("Kyiv");

//function changeTempFahrenheit(event) {
// event.preventDefault();
//let changeToFahrenheit = document.querySelector("#now-temp");
//changeToFahrenheit.innerHTML = `77`;
//}

//let changeToFahrenheit = document.querySelector("#fahrenheit-link");
//changeToFahrenheit.addEventListener("click", changeTempFahrenheit);

//function changeTempCelsium(event) {
//event.preventDefault();
// let changeToCelsium = document.querySelector("#now-temp");
// changeToCelsium.innerHTML = `25`;
//}

//let changeToCelsium = document.querySelector("#celsium-link");
//changeToCelsium.addEventListener("click", changeTempCelsium);
