import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/styles/index.css";

//Leaflet map setup
var map = L.map('map').setView([0, 0], 3);

L.tileLayer('https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4d525ab52e854ce982f0e8a5b2315989', 
{attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
apikey: '4d525ab52e854ce982f0e8a5b2315989',
maxZoom: 22
}).addTo(map);


//Get API calls from openskynetwork
var data;
var flights;

fetch('https://opensky-network.org/api/states/all')
.then((response) => response.json())
.then((json) => {
    data = json;
    flights = data.states;
    /*
    State - 0 = icao24address
            1 = callsign
            2 = origin_country
            5 = longitude
            6 = latitude
            8 = on_ground
            10 = true_track
    */
   
    //Plot flights
    for (let i = 0; i < 300; i++) {
        var flight = flights[i];
        var icao24address = flight[0]; // icao24bit
        var callsign = flight[1]; // callsign
        var origin_country = flight[2]; // origin_country
        var longitude = flight[5]; // longitude
        var latitude = flight[6]; // latitude
        var on_ground = flight[8]; // on_ground
        var true_track = flight[10]; // true_track - plane direction

        //If flight is airborne and has coords
        if (flight != null 
            && icao24address != null
            && on_ground == false 
            && longitude != null
            && latitude != null
            && callsign != null) {
            
        L.marker([latitude, longitude], 
            {icon: L.divIcon({
                className: "leaflet-plane-marker",
                html: L.Util.template('<svg style="filter: invert(57%) sepia(11%) saturate(3678%) hue-rotate(189deg) brightness(98%) contrast(98%); -webkit-transform: rotate('+ true_track +'deg); -moz-transform:rotate('+ true_track +'deg);" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 97.239 100" enable-background="new 0 0 97.239 100" xml:space="preserve"><path d="M42.732,5.521c0.01-7.396,11.138-7.396,11.151,0.207v30.956l43.355,26.108v11.412L54.091,60.032v23.137l9.953,7.814V100l-15.373-4.741L33.248,100v-9.017l9.9-7.814V60.032L0,74.205V62.792l42.732-26.108V5.521L42.732,5.521z"></path></svg>'),
                iconAnchor  : [12, 32],
                iconSize    : [25, 30],
                popupAnchor : [0, -28]
            })
        
        }).addTo(map)
        .bindPopup('Flight: ' + callsign + ' - From: ' + origin_country)
        }

        // add a flight element to flights conatiner
        var flightItem = document.createElement("div");
        flightItem.className = "flight-item";
        flightItem.id = icao24address;
        flightItem.innerHTML = "<p>Flight - " + callsign + "</p><p>Origin - " + origin_country + "</p>" ;
        document.getElementById("flights_list").appendChild(flightItem);
        //setup listener
        flightItem.addEventListener("click", function(){setView(latitude, longitude)});
    }
})
.catch((err) => console.log(err));

function setView(latitude, longitude)
{
    map.setView([latitude,longitude], 8);
}