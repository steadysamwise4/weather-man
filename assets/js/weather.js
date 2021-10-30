var userFormEl = document.querySelector(".form-holder");
var cityInputEl = document.querySelector(".cityInput");
var stateInputEl = document.querySelector("#stateInput");
var cityHeadingEl = document.querySelector("#citySearch");
var cityContentEl = document.querySelector(".city-content");
var cityDataEl = document.querySelector(".city-data");
var cityIconEl = document.querySelector(".icon");
var cityTempEl = document.querySelector(".temp");
var cityHumidityEl = document.querySelector(".humid");
var cityWindEL = document.querySelector(".wind");
var cityUltraEL = document.querySelector(".ultra-v");
var currentTimeEl = document.querySelector("#currentTime");

var displayCityData = function(currentWeather, searchTerm) {
    // clear old content
    cityHeadingEl.textContent = searchTerm;
    cityDataEl.textContent = "";
    console.log(currentWeather);
    console.log(searchTerm);
    // format time
    var timeEl = moment().format('MMMM Do YYYY, h:mm a');
    // append time to dom
    currentTimeEl.textContent = " - " + timeEl;
        //description
        var descript = currentWeather.weather[0].description;
        var descriptEl = document.createElement("p");
        descriptEl.textContent = descript;
        cityDataEl.appendChild(descriptEl);
    
        // format icon
        var icon = currentWeather.weather[0].icon;
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/"+ icon + ".png");
        // append
        
        cityDataEl.appendChild(iconEl);
        
        // format temp
        var temp = Math.round(currentWeather.main.temp);
        // create a container for temp
        var currentTempEl = document.createElement("p");
        
        currentTempEl.textContent = "Currently: " + temp + "°F";
        // append temp to the dom
        cityDataEl.appendChild(currentTempEl);
        
        // format humid
        var humid = currentWeather.main.humidity;
        var currentHumidEl = document.createElement("p");
        currentHumidEl.textContent = humid + "% Humidity";
        cityDataEl.appendChild(currentHumidEl);
        // wind speed
        var wind = Math.round(currentWeather.wind.speed);
        var windEl = document.createElement("p");
        windEl.textContent = "Average Wind Speed: " + wind + " MPH";
        cityDataEl.appendChild(windEl);
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityInputEl.value.trim();
    var stateInput = stateInputEl.value.trim();
    var stateName = "US-" + stateInput;
    var cityState = cityName + "," + stateName
    if (cityName && stateInput) {
        getCityWeather(cityState);
        cityInputEl.value = "";
        stateInputEl.value = "";
    } else if (cityName && !stateInput) {
        cityState = cityName;
        getCityWeather(cityName);
        cityInputEl.value = "";
    } else if (!cityName && !stateInput) {
    console.log("error");
    }
    saveMenu(cityName);
}
var cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];
function saveMenu(city) {
    if (cityArray.indexOf(city) === -1) {

        cityArray.push(city);
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
    }
    buildMenu();
}

var buildMenu = function() {
    console.log(cityArray);
    $(".history").empty();
    for (var i = 0; i < cityArray.length; i++) {
        console.log(cityArray[i]);
        var aTag = $("<button>").addClass("col-12 a").text(cityArray[i]);
        aTag.onclick = getCityWeather(cityArray[i]);
        $(".history").append(aTag);

    }

}


var getCityWeather = function(city) {
    // format the open weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=imperial&appid=9ac94d5206a0a04e92ba7cbf64fe39f8";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayCityData(data, city);
        });
    });
    
    
}

userFormEl.addEventListener("submit", formSubmitHandler);