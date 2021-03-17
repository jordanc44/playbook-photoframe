$(document).ready(function() {
  var WEATHER_API_KEY = "5c1889d2c0dfc7f19c5ffac8440008bd"; // https://darksky.net/dev/register

  // Default location (for weather)
  var POSITION_LAT = 41.910010;
  var POSITION_LON = -87.669820;

  // Refresh intervals
  var UPDATE_TIME_INTERVAL = 1000 * 60;
  var UPDATE_WEATHER_INTERVAL = 1000 * 60 * 60;

  // Updates the clock and date
  function updateDateTime() {
    $("#clock").html(moment().format("HH:mm"));
    $("#date").html(
      moment()
        .format('ddd[<br>]MMM[<br><span id="date-day">]D[</span>]')
        .toUpperCase()
    );
  }

  // Retrieves weather periodically
  function updateWeather() {
    var url =
      "http://api.openweathermap.org/data/2.5/weather?lat=" + POSITION_LAT + 
      "&lon="+ POSITION_LON +"&appid=" + WEATHER_API_KEY;
    $.ajax({
      url: url,
      type: "GET",
      success: function(data) {
        try {
          console.log(data.weather)
          $("#weather-desc").html(data.weather[0].main);
          $("#weather-number").html(
            Math.round(data.main.temp - 273.15) + '°'
          );
        } catch (err) {
          console.log(err.message);
        }
      },
      error: function(err) {
        console.log(err.message);
      }
    });
  }

  // Call update methods on load, and set an interval so it refreshes
  updateDateTime();
  setInterval(updateDateTime, UPDATE_TIME_INTERVAL);
  setInterval(updateWeather, UPDATE_WEATHER_INTERVAL);
  setInterval(changeImage, 30000);
  updateWeather();


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  var listInt = [];
  for (var i = 1; i <= 71; i++) {
      listInt.push(i);
  }
  shuffle(listInt);

  var i = 0;

  function changeImage() {
    $('#container').css('background-image', 'url(images/image' + listInt[i] + '.JPG');
    console.log(listInt[i])
    i++;
    if (i == 70) {
        i = 0;
        shuffle(listInt);
    }
}

 
});
