var lat;
var long;
var mymap;
var marker;

function find(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(pos){
  console.log(pos);
  lat = pos.coords.latitude;
  long = pos.coords.longitude;
 mymap = L.map('mapid').setView([lat, long], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicnVhbmJpbmRhY28iLCJhIjoiY2twOGNjYXp2MDRmdjJvcnQ2M3N4MHl0aiJ9.MpsAh5Msqku6BRQnTQiA-g'
  }).addTo(mymap);

  marker = L.marker([lat, long]).addTo(mymap);

  //requisição AJAX clima
  new Ajax.Request("server.php",
  {
    method : "get",
    parameters : {lat : lat, long : long},
    onSuccess : ajaxsuccess
  }
  );
}

function ajaxsuccess(response){
  console.log(response.responseText);
  var objClima = JSON.parse(response.responseText);

  var conteudo = "Temp = " + (objClima.main.temp - 273).toFixed(2) + "°";
  conteudo += '<br><img src="https://openweathermap.org/img/w/' + objClima.weather[0].icon + '.png">';

  marker.bindPopup(conteudo).openPopup();
}
