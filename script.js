var apiKey = "ef80f2dc5e60b96cd68851cdf32e0502";
var searchBtn = document.querySelector("#search-button");



function searchVal () {
    var searchVal = document.querySelector('#search-value').value;
    // To-do: Set up validation if form is blank
    console.log(searchVal);
    getWeather(searchVal)
}

function getWeather (searchVal) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&appid=" + apiKey;

    fetch(apiURL)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);
            // To-do: Append content to the DOM either here, or with a function
            // To-do: Call 5-day forecast and UV index
        })
}



searchBtn.addEventListener("click", searchVal);