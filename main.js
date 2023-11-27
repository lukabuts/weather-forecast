const apiKey = "03c281e0b23dc38defc1a4dd2f1dc273";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const wearherIcon = document.querySelector('.weather-icon');

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    if(response.status === 404 || searchBox.value === ""){
        document.querySelector('.error').style.display = "block";
        document.querySelector(".weather").style.height = "0px";
        searchBox.value = "";
        return;
    }

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector('.humidity').innerHTML = Math.round(data.main.humidity) + '%';
    document.querySelector('.Wind').innerHTML = Math.round(data.wind.speed) + ' km/h';
    
    if(data.weather[0].main === "Clouds"){
        wearherIcon.src = "images/clouds.png";
    } else if(data.weather[0].main === "Clear"){
        wearherIcon.src = "images/clear.png";
    } else if(data.weather[0].main === "Rain"){
        wearherIcon.src = "images/rain.png";
    } else if(data.weather[0].main === "Drizzle"){
        wearherIcon.src = "images/drizzle.png";
    } else if(data.weather[0].main === "Mist"){
        wearherIcon.src = "images/mist.png";
    }

    document.querySelector('.error').style.display = "none";
    searchBox.value = "";
    searchBox.blur();
    document.querySelector(".weather").style.height = "438px";
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", function(e){
    if (e.keyCode === 13){
        checkWeather(searchBox.value);
    }
});
