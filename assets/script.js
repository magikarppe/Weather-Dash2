var apiKey = "ef80f2dc5e60b96cd68851cdf32e0502";
var searchBtn = document.querySelector("#search-button");
var todElement = document.getElementById("today");
var fcElement = document.getElementById("forecast");
var searchButton = document.getElementById("search-button");
var cities = JSON.parse(localStorage.getItem("cities")) || [];
var cityHistory = document.querySelector("#history");

searchBtn.addEventListener("click", searchVal);


function searchVal () {
    var searchVal = document.querySelector('#search-value').value;
    if (!cities.includes(searchVal)) {
      cities.unshift(searchVal);
      localStorage.setItem("cities", JSON.stringify(cities));
    
      getWeather(searchVal);
      fiveDay(searchVal);
      saveSearchVal();
    }
  }

    
  

function saveSearchVal() {
    cityHistory.innerHTML = "";
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    console.log(cities);
    // loop of the cities searched
    for (var i = 0; i < cities.length; i++) {
      var cityPrev = document.createElement("button");
      cityPrev.setAttribute("location", cities[i]);
      // button text content
      cityPrev.textContent = cities[i];
      // click and gets attributes
      cityPrev.addEventListener("click", function () {
        // buttons' loc value
        getWeather(searchVal)(this.getAttribute("location"));
        fiveDay(this.getAttribute("location"));
      });
  
      cityHistory.appendChild(cityPrev);
    }
  }




//current weather 
function getWeather(searchVal) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&appid=" + apiKey + "&units=imperial";

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var loc = data.name;
            var temp = data.main.temp;
            var wind = data.wind.speed;
            var humid = data.main.humidity;
            var long = data.coord.lon;
            var lat = data.coord.lat;
            var dateElement = moment().format("MM/DD/YYYY");
            var iconWeatherEl =
                "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            var iconElement = document.createElement("img");
            var placeElement = document.createElement("h1");
            var templiElement = document.createElement("li");
            var windliElement = document.createElement("li");
            var humiliElement = document.createElement("li");

            iconElement.setAttribute("src", iconWeatherEl);

            uvIndex(latitude, longitude);
        
            console.log("temperature---------");
            console.log(temp);
            console.log("wind speed----------");
            console.log(wind);
            console.log("humidity----------");
            console.log(humid);
            console.log("city being searched---------");
            console.log(loc);
            console.log("longitude---------");
            console.log(long);
            console.log("latitude---------");
            console.log(lat);
           

            $(todayElement).css({ border: "black solid 2px", padding: "10px" });
            $(placeEl).text(location + " " + dateElement + "");
            $(windliEl).text("Windspeed: " + wind + " MPH");
            $(templiEl).text("Temperature: " + temp + "°F");
            $(humiliEl).text("Humidity: " + humid + " %");

            todayElement.append(placeElement);
            todayElement.append(iconElement);
            todayElement.append(windliElement);
            todayElement.append(templiElement);
            todayElement.append(humiliElement);
        });
        
        todayElement.innerHTML = "";
}


  function fiveDay(searchVal) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchVal + "&appid=" + apiKey + "&units=imperial";
  
    fetch(queryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
        fcElement.innerHTML = "";
  
        var day = 1;
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            var todayDate = moment().add(day, "days").format("MM/DD/YYYY");
            var date = todayDate;
            var iconUrl =
              "http://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              ".png";
            var temp = "Temp: " + data.list[i].main.temp + "°F";
            var wind = "Wind: " + data.list[i].wind.speed + " MPH";
            var humidity = "Humidity: " + data.list[i].main.humidity + " %";
  
            var cardEl = document.createElement("div");
            cardEl.classList.add("card");
  
            var dateFiveEl = document.createElement("h5");
            dateFiveEl.textContent = date;
            cardEl.append(dateFiveEl);
  
            var iconFiveEl = document.createElement("img");
            iconFiveEl.setAttribute("src", iconUrl);
            cardEl.append(iconFiveEl);
  
            var tempFiveEl = document.createElement("p");
            tempFiveEl.textContent = temp;
            cardEl.append(tempFiveEl);
  
            var windFiveEl = document.createElement("p");
            windFiveEl.textContent = wind;
            cardEl.append(windFiveEl);
  
            var humidFiveEl = document.createElement("p");
            humidFiveEl.textContent = humidity;
            cardEl.append(humidFiveEl);
  
            fcElement.append(cardEl);
  
            day++;
          }
        }
      });
  }

  function uvIndex(latitude, longitude) {
    var uviURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
  
    fetch(uviURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
        var uviValue = data.current.uvi;
        console.log(uviValue);
  
        var uviEl = document.createElement("li");
        $(uviEl).text("UV Index: " + uviValue);
        todElement.append(uviEl);
      });
  }
  saveSearchVal();


