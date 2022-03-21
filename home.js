const api = {
    key: "3caf0e22ddcce4da021b63f2555d604d",
    base: "https://api.openweathermap.org/data/2.5/",
};

let searchBtn = document.querySelector(".btn");
let cityName = document.querySelector("#city");
let temperature = document.querySelector(".temp");
let condition = document.querySelector("#condition-text");
let wind = document.querySelector("#wind-spped-text");
let loc = document.querySelector("#location-text");
let icon = document.querySelector(".icon");
var cond_text = "default";
let scattered = ["haze", "few clouds"];
let few = "few clouds";
let iconName = "default";
let bcgName = "default_bcg.jpg";



searchBtn.addEventListener("click", () => {
    if (cityName.value.length > 0) {
        fetchResultsFromAPI(cityName.value)
    }
});

let viewResults = (weather) => {
    console.log(weather.main.temp);
    console.log(weather.wind.speed);
    temperature.textContent = Math.floor(weather.main.temp) + "°C";
    condition.innerHTML = weather.weather[0].description;
    loc.innerHTML = `${weather.name} ,${weather.sys.country}`;
    wind.innerHTML = `${weather.wind.speed} Kms/h`;
    setWeather(condition.innerHTML, icon);

};

let fetchResultsFromAPI = (query) => {
    let url = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
    console.log("Url : ", url);
    fetch(url)
        .then((weather) => {
            return weather.json();
        })
        .then((response) => {
            console.log("Response : ", response);
            viewResults(response);
        })
        .catch((error) => {
            temperature.innerHTML = "---"
            condition.innerHTML = "---";


            loc.innerHTML = "---";
            wind.innerHTML = "--- Kms/h";

            renderImage(iconName, bcgName);

            alert("Please enter valid city");

        });
}

function setWeather(cond_text, icon) {
    let body = document.body;
    console.log(cond_text)
    switch (cond_text) {
        case "smoke":
        case "mist":
            renderImage("haze", "smoke_bcg.jpg");
            break;
        case "haze":
            renderImage("haze", "haze_bcg.jpg");
            break;
        case "overcast clouds":
            renderImage("cloudy", "cloud_bcg.jpg");
            break;
        case "few clouds":
            renderImage("haze", "few_clouds.jpg");
            break;
        case "scattered clouds":
        case "broken clouds":
            renderImage("haze", "broken_bcg.jpg");
            break;
        case "rainy":
        case "rain":
        case "heavy rain":
            renderImage("rainy", "rain_bcg.jpg");
            break;
        case "clear sky":
            renderImage("sunny", "sunny_bcg.webp");
            break;

        default:
            renderImage(iconName, bcgName);
    }
}

function renderImage(iconName, bcgName) {
    let body = document.body;
    icon.src = `images/${iconName}.svg`;
    body.style.background = `url('images/${bcgName}') no-repeat center center fixed`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
}