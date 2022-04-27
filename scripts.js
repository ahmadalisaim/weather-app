async function loadweather(lat, long) {
  let latitude = lat;
  let longitude = long;
  const endpoint = new URL(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6aea09e86a2248ecc6ac4a53217bd2d8`
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
  document.getElementById("city_name").innerHTML = city_name;
  document.getElementById("country_name").innerHTML = "(" + country + ")";
  console.log(data);
}

// function displayData() {}

function getLocation() {
  //   console.log("get location started");
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

getLocation();
// window.onload = getLocation();
