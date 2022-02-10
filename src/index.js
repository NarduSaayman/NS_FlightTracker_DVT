import L, { Draggable } from "leaflet";
import "leaflet/dist/leaflet.css";

var PlaneSolid = L.icon({
  iconUrl:"./assets/images/plane-solid.png",
  iconSize: [50,50]
});

//Leaflet setup
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09], {icon: PlaneSolid}).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


//Get API calls from openskynetwork 

