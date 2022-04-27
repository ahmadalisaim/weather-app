async function loadweather() {
  const endpoint = new URL(
    `https://api.openweathermap.org/data/2.5/weather?lat=31.279419&lon=72.3314&units=metric&appid=6aea09e86a2248ecc6ac4a53217bd2d8`
  );
  const response = await fetch(endpoint);
  console.log(response);
  if (response.status == 404) {
    alert("didnt got API response");
  }

  const data = await response.json();
  console.log(data);
}

function getLocation() {
  //   console.log("get location started");
  loadweather();
}

window.onload = getLocation();
