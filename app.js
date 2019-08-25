window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    //New York, New York
    long = -74.0060;
    lat = 40.7128;
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
        
        function setIcons(icon, iconID) {
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }      
});