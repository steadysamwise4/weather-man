var userFormEl = document.querySelector(".form-holder");
var cityInputEl = document.querySelector(".cityInput");
var stateInputEl = document.querySelector("#stateInput");
var cityHeadingEl = document.querySelector("#citySearch");
var currentTimeEl = document.querySelector("#currentTime");
var cityContentEl = document.querySelector(".city-content");
var cityDataEl = document.querySelector(".city-data");
var historyEl = document.querySelector(".history");
var dayCardEl = document.querySelector(".day");
var cardHeadingZeroEl = document.querySelector("#first-day");
var cardHeadingOneEl = document.querySelector("#second-day");
var cardHeadingTwoEl = document.querySelector("#third-day");
var cardHeadingThreeEl = document.querySelector("#fourth-day");
var cardHeadingFourEl = document.querySelector("#fifth-day");

var buttonClickHandler = function(event) {
    var cityClick = event.target.getAttribute("data-city");
    if (cityClick) {
        cityInputEl.textContent = cityClick;
        getCityWeather(cityClick);
    }
}

var buildMenu = function() {
    //console.log(cityArray);
    $(".history").empty();
    for (var i = 0; i < cityArray.length; i++) {
        //console.log(cityArray[i]);
        var aTag = document.createElement("button");
        aTag.textContent = cityArray[i];
        aTag.setAttribute("data-city", cityArray[i]);
        aTag.classList= "col-12 a";
      // var aTag = $("<button>").addClass("col-12 a").data("data-city", cityArray[i]).text(cityArray[i]);
       // aTag.onclick = getCityWeather(cityArray[i]);
        $(".history").append(aTag);

       
    }

}

var cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];

function saveMenu(city) {
    if (cityArray.length >= 11) {
        cityArray.shift();
    }
    if (cityArray.indexOf(city) === -1) {

        cityArray.push(city);
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
    }
    buildMenu();
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

var getForecastData = function(latitude, longitude) {
    //format the open weather api forcast url
    var apiForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=9ac94d5206a0a04e92ba7cbf64fe39f8";
    // make the request to the url
    fetch(apiForecast).then(function(response) {
        response.json().then(function(data) {
            displayForecastData(data);
        });
    });
}


buildMenu();

var displayForecastData = function(forecast) {
    console.log(forecast);
    //clear old content
    dayCardEl.textContent = "";

    // format and load correct date headings
    var zero = moment().add(1, 'days').format('dddd');
    var first = document.createElement("h4");
    first.className = "card-head";
    first.setAttribute("id", "first-date");
    first.textContent = zero;
    cardHeadingZeroEl.appendChild(first);

    var one = moment().add(2, 'days').format('dddd');
    var second = document.createElement("h4");
    second.className = "card-head";
    second.setAttribute("id", "second-date");
    second.textContent = one;
    cardHeadingOneEl.appendChild(second);

    var two = moment().add(3, 'days').format('dddd');
    var third = document.createElement("h4");
    third.className = "card-head";
    third.setAttribute("id", "third-date");
    third.textContent = two;
    cardHeadingTwoEl.appendChild(third);

    var three = moment().add(4, 'days').format('dddd');
    var fourth = document.createElement("h4");
    fourth.className = "card-head";
    fourth.setAttribute("id", "fourth-date");
    fourth.textContent = three;
    cardHeadingThreeEl.appendChild(fourth);

    var four = moment().add(5, 'days').format('dddd');
    var fifth = document.createElement("h4");
    fifth.className = "card-head";
    fifth.setAttribute("id", "fifth-date");
    fifth.textContent = four;
    cardHeadingFourEl.appendChild(fifth);

    // format and load UV Index
    var uv = forecast.current.uvi;
    var ultra = "  UV Index: " + forecast.current.uvi + "  ";
    var ultraEL = document.createElement('p');
    ultraEL.textContent = ultra;
    if (uv <= 2) {
        ultraEL.className = "good";
    }
    else if (uv > 2 && uv <= 5) {
        ultraEL.className = "ok";
    }
    else if (uv > 5 && uv <= 7) {
        ultraEL.className = "moderate";
    }
    else if (uv > 7 && uv <= 10) {
        ultraEL.className = "danger";
    } else {
        ultraEL.className = "meltdown";
    }
    cityDataEl.appendChild(ultraEL);

    // display 5 day forecast
    var displayFiveDay = function(i, day) {
    var descOne = forecast.daily[i].weather[0].description;
    var descOneEl = document.createElement('p');
    descOneEl.textContent = descOne;
    day.appendChild(descOneEl);

    var iconOne = forecast.daily[i].weather[0].icon;
    var iconOneEl = document.createElement('img');
    iconOneEl.setAttribute("src", "http://openweathermap.org/img/w/" + iconOne + ".png");
    day.appendChild(iconOneEl);

    var hiOne = Math.round(forecast.daily[i].temp.max);
    var hiOneEl = document.createElement('p');
    hiOneEl.textContent = "H: " + hiOne + "°F";
    day.appendChild(hiOneEl);

    var lowOne = Math.round(forecast.daily[i].temp.min);
    var lowOneEl = document.createElement('p');
    lowOneEl.textContent = "L: " + lowOne + "°F";
    day.appendChild(lowOneEl);

    var humidOne = forecast.daily[i].humidity;
    var humidOneEl = document.createElement('p');
    humidOneEl.textContent = humidOne + "% Humidity";
    day.appendChild(humidOneEl);

    var windOne = Math.round(forecast.daily[i].wind_speed);
    var windOneEl = document.createElement('p');
    windOneEl.textContent = "Wind: " + windOne + " MPH";
    day.appendChild(windOneEl);



    }
    displayFiveDay(0, cardHeadingZeroEl);
    displayFiveDay(1, cardHeadingOneEl);
    displayFiveDay(2, cardHeadingTwoEl);
    displayFiveDay(3, cardHeadingThreeEl);
    displayFiveDay(4, cardHeadingFourEl);

}

var displayCityData = function(currentWeather, searchTerm) {
    // clear old content
    cityHeadingEl.textContent = currentWeather.name;
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
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
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

        // formatting latitude and longitude
        var lat = currentWeather.coord.lat;
        var lon = currentWeather.coord.lon;

        
        
        getForecastData(lat, lon);
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
        saveMenu(cityName);
        cityInputEl.value = "";
        stateInputEl.value = "";
    } else if (cityName && !stateInput) {
        cityState = cityName;
        getCityWeather(cityName);
        saveMenu(cityName);
        cityInputEl.value = "";
    } else if (!cityName && !stateInput) {
    console.log("error");
    }
    
}





userFormEl.addEventListener("submit", formSubmitHandler);
historyEl.addEventListener("click", buttonClickHandler);
