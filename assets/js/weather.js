var getCityWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=9ac94d5206a0a04e92ba7cbf64fe39f8";
    fetch(apiUrl);
}

getCityWeather();