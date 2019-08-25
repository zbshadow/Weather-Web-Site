window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
           // long = position.coords.longitude;
           // lat = position.coords.latitude;
           //Time Square NY
           long = -73.985130;
           lat = 40.758896;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/d6c54403d3a95091c4bafacaf12808cd/${lat},${long}`;

            fetch (api)
                .then( fetched => {
                    return fetched.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;

                    //set DOM Elements from API
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //formula for celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //set Icon
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
                    })
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function setTimezoneText(data){
        var str = data.timezone;
        var strArray = str.split("/");
        var toSelect = strArray.length;
        var newStr = strArray[toSelect -1] + ", " + strArray[toSelect -2];
        return newStr;
    }
});