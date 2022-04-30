const cityht = document.getElementById("city_name");
const countryht = document.getElementById("country_name");

const add_div = (document.getElementById(
  "current_weather_items"
).innerHTML = `<div class="weather-item">
<div>Humidity</div>
<div>12%</div>
</div>
<div class="weather-item">
<div>Pressure</div>
<div>345354</div>
</div>
<div class="weather-item">
<div>Wind Speed</div>
<div>74647</div>
</div>
<div class="weather-item">
<div>Possibility Of Rain in 24 hours</div>
<div>74647</div>
</div>
`);
setInterval(getTime, 1000);
getLocation();
async function loadweather(lat, long) {
  let latitude = lat;
  let longitude = long;
  const app_id = "6aea09e86a2248ecc6ac4a53217bd2d8";
  const endpoint = new URL(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${app_id}`
  );
  const response = await fetch(endpoint);
  console.log(response);
  if (response.status == 404) {
    alert("didnt got API response");
  }

  const data = await response.json();
  let city_name = data.name;
  let country = data.sys.country;
  let temperature = data.main.temp;
  cityht.innerHTML = city_name;
  countryht.innerHTML = "(" + country + ")";
  console.log(data);
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

// window.onload = getLocation();
