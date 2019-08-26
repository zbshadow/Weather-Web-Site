window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    //New York, New York
    long = -118.2437;
    lat = 34.0522;
    getWeather(long, lat);
    setLocation(long, lat);

    function getWeather(long,lat){
         //proxy needed for local host testing
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const apiWeather = `${proxy}https://api.darksky.net/forecast/d6c54403d3a95091c4bafacaf12808cd/${lat},${long}`;

        fetch(apiWeather)
            .then(fetched => {
                return fetched.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                //set DOM Elements from API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                //locationTimezone.textContent = data.timezone;

                //formula for celsius
                let celsius = (temperature - 32) * (5 / 9);

                //Set Icon
                setIcons(icon, document.querySelector(".icon"));

                //Change temperature to C/F
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                });
                tz = data.timezone;
                setClock(tz);
                setInterval(setClock, 1000, tz);
            });
    }

        function setLocation(long, lat) {
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const apiLocation = `${proxy}https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDgkz55qvQ6bG36xW7MUjY0ORVDYqCi-Mw`
            fetch(apiLocation)
                .then (fetched => {
                    return fetched.json();
                })
                .then(dataL => {
                    console.log(dataL);
                    locationArray = dataL.results[0];
                    for (var i=0; i<locationArray.address_components.length; i++)
                    {
                        if (locationArray.address_components[i].types[0] == "locality"){
                            city = locationArray.address_components[i];
                        }
                        if (locationArray.address_components[i].types[0] == "administrative_area_level_1"){
                            region = locationArray.address_components[i];
                        }
                        if (locationArray.address_components[i].types[0] == "postal_code"){
                            postal = locationArray.address_components[i];
                        }
                    }
                    locationTimezone.textContent = city.long_name + ", " + region.long_name;
                })

        }

        function setClock(tz){
            console.log(tz);
            const dateString = new Date().toLocaleString("en-US", {timeZone: `${tz}`});
            const fullDate = new Date(dateString);
            console.log(dateString);
            console.log(fullDate);

            var dow = new Array();
            dow[0] = "Sunday";
            dow[1] = "Monday";
            dow[2] = "Tuesday";
            dow[3] = "Wednesday";
            dow[4] = "Thursday";
            dow[5] = "Friday";
            dow[6] = "Saturday";
            var d = dow[fullDate.getDay()];
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "Novemeber";
            month[11] = "December";
            var m = month[fullDate.getMonth()];
            var day = fullDate.getDate();
            var hours = fullDate.getHours();
            var mins = fullDate.getMinutes();



            if (hours < 10){
                hours = "0" + hours;
            }
        
            if (mins < 10) {
                mins = "0" +mins;
            }

            document.getElementById('dow').innerHTML = d + ",";
            document.getElementById('month').innerHTML = m;
            document.getElementById('day').innerHTML = day;
            document.getElementById('hour').innerHTML = hours + " :";
            document.getElementById('minute').innerHTML = mins;

            if (hours > 19 || hours < 7){
                document.body.style.background ='linear-gradient(rgb(89,0,179), rgb(38,0,77))';
            }

        }

        function setIcons(icon, iconID) {
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }      
});