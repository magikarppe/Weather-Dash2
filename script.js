var apiKey = "ef80f2dc5e60b96cd68851cdf32e0502";
var todElement = document.getElementById("today");
var fcElement = document.getElementById("forecast");
var searchBtn = document.querySelector("#search-button");
var clearButton = $("#clear-history");
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
        getWeather(this.getAttribute("location"));
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

      uvIndex(lat, long);
        
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
    
      $(todElement).css({ border: "black solid 2px", padding: "10px" });
      $(placeElement).text(loc + " " + dateElement + "");
      $(windliElement).text("Windspeed: " + wind + " MPH");
      $(templiElement).text("Temperature: " + temp + "°F");
      $(humiliElement).text("Humidity: " + humid + " %");

      todElement.append(placeElement);
      todElement.append(iconElement);
      todElement.append(windliElement);
      todElement.append(templiElement);
      todElement.append(humiliElement);
    });
  todElement.innerHTML = "";
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
            var todDate = moment().add(day, "days").format("MM/DD/YYYY");
            var date = todDate;
            var iconUrl =
              "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            var temp = "Temp: " + data.list[i].main.temp + "°F";
            var wind = "Wind: " + data.list[i].wind.speed + " MPH";
            var humidity = "Humidity: " + data.list[i].main.humidity + " %";
  
            var cardElement = document.createElement("div");
            cardElement.classList.add("card");
  
            var dateFiveElm = document.createElement("h5");
            dateFiveElm.textContent = date;
            cardElement.append(dateFiveElm);
  
            var iconFiveElm = document.createElement("img");
            iconFiveElm.setAttribute("src", iconUrl);
            cardElement.append(iconFiveElm);
  
            var tempFiveElm = document.createElement("p");
            tempFiveElm.textContent = temp;
            cardElement.append(tempFiveElm);
  
            var windFiveElm = document.createElement("p");
            windFiveElm.textContent = wind;
            cardElement.append(windFiveElm);
  
            var humidFiveElm = document.createElement("p");
            humidFiveElm.textContent = humidity;
            cardElement.append(humidFiveElm);
  
            fcElement.append(cardElement);
  
            day++;
          }
        }
      });
  }

  function uvIndex(lat, long) {
    var uviURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
  
    fetch(uviURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
        var uviVal = data.current.uvi;
        console.log(uviVal);
  
        var uviElement = document.createElement("li");
        $(uviEl).text("UV Index: " + uviVal);
        todElement.append(uviElement);
      });
  }
  saveSearchVal();

function clearHistory(event){
  event.preventDefault();
  sCity=[];
  localStorage.clear();
  document.location.reload();
} 

$("#clear-history").on("click",clearHistory);

