<script>
  function addZero(i) {
        if (i < 10) {
    i = "0" + i;
        }
        return i;
      }

      function currentDate(date) {
    let hours = addZero(date.getHours());
        let minutes = addZero(date.getMinutes());
        let number = date.getDate();
        let month = date.getMonth();

        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        month = months[date.getMonth()];

        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];

        let today = days[date.getDay()];

        return `${today} ${number} ${month}, ${hours}:${minutes}`;
      }

      let now = new Date();
      let date = document.querySelector("#full-date");
      date.innerHTML = currentDate(now);

      //DISPLAY THE CITY WRITTEN IN THE SEARCH BAR

      function displaydata(response) {
    //city
    document.querySelector("#full-city").innerHTML = response.data.name;


        //degrees
        document.querySelector("#change-temp").innerHTML = Math.round(
          response.data.main.temp
        );

        //description
        let description = response.data.weather[0].description;
        let weatherType = document.querySelector("#description");
        description = description.charAt(0).toUpperCase() + description.slice(1);
        description.innerHTML = description;

        //extra information-humidity
        document.querySelector("#extrahumidity").innerHTML = Math.round(
          response.data.main.humidity
        );

        //extra information wind
        let windy = (document.querySelector("#extrawind").innerHTML = Math.round(
          response.data.wind.speed
        ));

        //extra information feels like
        let percipitation = (document.querySelector(
          "#extrapercip").innerHTML = Math.round(response.data.main.percip));
      }
      function toSearch(city) {
    let apiKey = "c3f2e22d068bc89a846c4b1c217f57c3";
        let units = "metric";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

        axios.get(apiUrl).then(displaydata);
      }

      function handleSubmit(event) {
    event.preventDefault(); //solo se usa cuando trigger un link, form o button.
        //si entras en esta funcion a traves de otra funcion, no hay que ponerlo porque no me va a funcionar

        /*let writtenCity = document.querySelector("#city-name");

        //write the input city in a nice way in my page
        let citycapital = writtenCity.value.toLowerCase();
        citycapital = citycapital.trim();
        citycapital = citycapital.charAt(0).toUpperCase() + citycapital.slice(1);

        let title = document.querySelector("#full-city");
        title.innerHTML = `${citycapital}`;
        */

        //make the API call and display the name of the city and the temperature

        let city = document.querySelector("#find-weather").value;
        toSearch(city);
      }

      let search = document.querySelector("#search-city");
      search.addEventListener("submit",handleSubmit);

      //CHANGE CELSIUS-FAHRENHEIT

      function convertFahrenheit(event) {
    event.preventDefault();
          let changeTemp = document.querySelector("#change-temp");
          let degreeNumber= changeTemp.innerHTML;
          degreeNumber= Number(degreeNumber);
          let fahrenheit= Math.round((degreeNumber /5 ) * 9 + 32);
        changeTemp.innerHTML = `${fahrenheit}`;

        }
        function convertCelsius(event) {
    event.preventDefault();
          let changeTemp = document.querySelector("#change-temp");
          let degreeNumber = changeTemp.innerHTML;
          degreeNumber = Number(degreeNumber);
          let celsius = Math.round(((degreeNumber - 32) * 5) / 9);
          changeTemp.innerHTML = `${celsius}`;
        }

        let getFahrenheit = document.querySelector("#fahrenheit-unit");
        getFahrenheit.addEventListener("click", convertFahrenheit);
        let getCelsius = document.querySelector("#celcius-unit");
        getCelsius.addEventListener("click", convertCelsius);


      //city data by default
      toSearch("Vancouver");

      function showPosition(position) {
    console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        let apiKey = "c3f2e22d068bc89a846c4b1c217f57c3";
        let units = "metric";
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
        console.log(apiUrl);

        axios.get(apiUrl).then(displaydata);
      }

      function currentPosition(event) {
    event.preventDefault();
        navigator.geolocation.getCurrentPosition(showPosition);
      }

      let button = document.querySelector("#current-location");
      button.addEventListener("click", currentPosition);