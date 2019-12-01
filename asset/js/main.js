window.addEventListener('load',()=>{
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position)
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/4b93a54a7560e776ec73a09eb18ae066/${latitude},${longitude}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                // Set DOM ELement from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;
                // Formular for celsuis
                let celsuis = (temperature - 32) * (5 / 9);
                setIcons(icon, document.querySelector('.icon'));

                temperatureSection.addEventListener('click',() =>{
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsuis);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });
        function setIcons(icon,IconID){
            const skycons = new Skycons({color:"white"})
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(IconID,Skycons[currentIcon])
        }
    }
});