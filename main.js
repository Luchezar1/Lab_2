const apiKey = 'e5b57f8f95db429a50c7d6be2da6fe47';
const weatherUrl = 'https://api.openweathermap.org/';
const weatherIconUrl = 'http://openweathermap.org/img/wn/';

function initMap()
{
    const myLatlng = {lat: 49.2306482953111, lng: 28.41531254863};

    const map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 15
    });

    let infoWindow;

    map.addListener("click", (e) =>
    {
        infoWindow?.close();
        infoWindow = new google.maps.InfoWindow({
            position: e.latLng
        });

        fetch(`${weatherUrl}data/2.5/weather?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&appid=${apiKey}`)
            .then(res => res.json())
            .then(function (json){
                let t = parseInt(json.main.temp-273.15);
                let infowindow = new google.maps.InfoWindow({  });
                let marker = new google.maps.Marker();
                infowindow.setContent(
                  "<img src='http://openweathermap.org/img/wn/"+json.weather[0].icon+".png' alt='картинка'>"+
                  "<h1>"+
                    json.name+
                  "</h1>"+
                  "<h1>"+
                    json.weather[0].description+
                  "</h1>"+
                  "<h1>"+
                    "clouds "+json.clouds.all+ "%"+
                  "</h1>"+
                  "<h1>"+
                    "humidity "+json.main.humidity+ "%"+
                  "</h1>"+
          
                  "<h1>"+
                    "t = "+t.toString()+"&#8451\n"+
                  "</h1>");
                marker.setMap(null);
                marker = new google.maps.Marker({
                  position: e.latLng,
                  map: map,
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 0
                }
                });
                infowindow.open(map, marker);
              }); 
    });
}