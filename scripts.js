const cityht = document.getElementById("city_name");
const countryht = document.getElementById("country_name");
const temp_ht = document.getElementById("current_temperature");
const feels_ht = document.getElementById("current_feels_like");
const weather_condition_ht = document.getElementById(
  "current_weather_condition"
);
const icon_ht = document.getElementById("current_icon");
const place_ht = document.getElementById("place_country");
const city_input = document.getElementById("city_input");
setInterval(getTime, 1000);
getLocation();
async function loadweather(lat, long) {
  let latitude = lat;
  let longitude = long;
  const app_id = "6aea09e86a2248ecc6ac4a53217bd2d8";
  const endpoint = new URL(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${app_id}`
  );
  //////////Promise.all to run 2 API requests in paralell////////

  const [response, response_current] = await Promise.all([
    fetch(endpoint),
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily,minutely&appid=6aea09e86a2248ecc6ac4a53217bd2d8`
    ),
  ]);
  const data = await response.json();
  const data_current = await response_current.json();
  console.log(response);
  console.log(response_current);

  /////////////////////////////////end fetch in paralell/////////

  if (response.status == 404) {
    alert("didnt got API response");
  }

  show_current_weather_block(data_current);
  let city_name = data.name;
  let country = data.sys.country;
  let temperature = data.main.temp;
  let feels_like = data.main.feels_like;
  let weather_status = data.weather[0].description;
  let current_icon = data.weather[0].icon;
  cityht.innerHTML = city_name;
  countryht.innerHTML = "(" + country + ")";
  temp_ht.innerHTML = temperature.toFixed(0) + "&deg;C";
  feels_ht.innerHTML = feels_like.toFixed(0);
  weather_condition_ht.innerHTML = weather_status;
  place_ht.innerHTML = data_current.timezone;
  icon_ht.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${current_icon}@4x.png`
  );
  console.log(data);
  console.log(data_current);
}

//   Get Current location
function getLocation() {
  let options = {
    enableHighAccuracy: true,
    timeout: 1000 * 10, //10 seconds
    maximumAge: 1000 * 60 * 5, //5 minutes
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, failed, options);
  } else {
    alert("sorry your browser doesn't support geolocation");
  }
}

function success(position) {
  console.log("Location obtained successfully");
  let cords = position.coords;
  let latitude = cords.latitude;
  let longitude = cords.longitude;
  console.log(position);

  loadweather(latitude, longitude);
}

function failed() {
  console.log("couldnt obtain location");
}
//Get Current Time
function getTime() {
  let time = new Date();
  let hours = time.getHours() % 12;
  let minutes = time.getMinutes();
  //   let seconds = time.getSeconds();

  let session = document.getElementById("session");

  if (hours === 0) {
    hours = 12;
  }
  if (hours >= 12) {
    session.innerHTML = "PM";
  } else {
    session.innerHTML = "AM";
  }
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML =
    minutes < 10 ? "0" + minutes : minutes;
  //   document.getElementById("seconds").innerHTML = seconds;
}
function show_current_weather_block(data_current) {
  let { humidity, pressure, sunrise, sunset, wind_speed } =
    data_current.current;
  let possibility_rain = data_current.hourly[23].pop * 100;
  const add_div = (document.getElementById(
    "current_weather_items"
  ).innerHTML = `<div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}%</div>
      </div>
      <div class="weather-item">
      <div>Pressure</div>
      <div>${pressure}</div>
      </div>
      <div class="weather-item">
      <div>Wind Speed</div>
      <div>${wind_speed}</div>
      </div>
      <div class="weather-item">
      <div>Possibility Of Rain in 24 hours</div>
      <div>${possibility_rain}%</div>
      </div>
      `);
}

async function display_city_weather() {
  if (city_input.value == "") {
    alert("Please Enter A City Name");
  }
  let city_name = city_input.value;
  const city_response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=6aea09e86a2248ecc6ac4a53217bd2d8`
  );
  const city_data = await city_response.json();
  let city_temp = city_data.main.temp;
  let condition_weather = city_data.weather[0].description;
  let city_icon = city_data.weather[0].icon;
  let citycont_name = city_data.name;
  let cityCountryName = city_data.sys.country;
  const add_city = (document.getElementById("city_items").innerHTML = `
  
            <img
              id="city_icon"
              src="http://openweathermap.org/img/wn/${city_icon}@4x.png"
              alt="weather icon"
            />
            <div><span>${citycont_name}</span><span>,</span><span>(${cityCountryName})</span></div>
            <div class="city_temperature_day">
              Temperature :&nbsp;<span>${city_temp}</span><span>&deg;C</span>
            </div>
            <div class="mist">${condition_weather}</div>
          `);
  console.log(city_data);
}
