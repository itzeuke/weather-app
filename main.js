let weather = {
    apiKey:"c47ef222dc986e87950a361c1d8ed708",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city
             + "&units=metric&lang=de&appid=" 
             + this.apiKey
            ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Wetter in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Regen: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        localStorage.setItem("last_search", name);
    },
    search: function (){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keypress", function (event) {
    if(event.key === "Enter"){
        weather.search();
    }
});


let last_search = localStorage.getItem("last_search");
if(!last_search) last_search = "Ehrenfriedersdorf";
weather.fetchWeather(last_search);