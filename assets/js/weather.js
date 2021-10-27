var userFormEl = document.querySelector(".form-holder");
var cityInputEl = document.querySelector(".cityInput");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getCityWeather(cityname);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city name");
    }
}



var getCityWeather = function(city) {
    // format the open weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=9ac94d5206a0a04e92ba7cbf64fe39f8";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
    
    
}

userFormEl.addEventListener("submit", formSubmitHandler);