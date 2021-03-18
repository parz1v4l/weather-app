const api = {
    key: "3910a72a69447b82ef6fdfbe13a0080f",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery (evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    if (weather.main.temp > 10) {
        document.body.style.backgroundImage=imageUrl="url(https://res.cloudinary.com/dwqdzfb3t/image/upload/v1612538193/weather%20app/travel-wallpaper-2008061351273-scaled_bzdgjy.jpg)";
    } 
    else if(weather.main.temp < 2) {
        document.body.style.backgroundImage=imageUrl="url(https://res.cloudinary.com/dwqdzfb3t/image/upload/v1612537885/weather%20app/BBiKpXl-rainy-wallpaper_vgjntt.jpg)";
    }
    else if(weather.main.temp < 10) {
        document.body.style.backgroundImage=imageUrl="url(https://res.cloudinary.com/dwqdzfb3t/image/upload/v1612537009/weather%20app/Wallpaper-Firewatch_spjsfx.jpg)";
    }


    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;

}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }