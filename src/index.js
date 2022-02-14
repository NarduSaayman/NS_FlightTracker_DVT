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
var states;

var flights = [];


fetch('https://opensky-network.org/api/states/all')
.then((response) => response?.json())
.then((json) => {
    data = json;
    states = data?.states?.filter(state => !!state[0] && state[8] != false && !!state[5] && !!state[6] && !!state[1]).slice(0,200);

    /*
    State - 0 = icao24address
            1 = callsign
            2 = origin_country
            5 = longitude
            6 = latitude
            8 = on_ground
            10 = true_track
    */
   
    // //Plot flights
    // for (let i = 0; i < 100; i++) {
    //     var state = states[i];

    states.forEach(state => {
        
        const flight = {
            icao24address: state[0],
            callsign: state[1],
            origin_country: state[2],
            longitude: state[5],
            latitude: state[6],
            on_ground: state[8],
            true_track: state[10]
        };

        // //If flight is airborne and has coords
        // if (state != null 
        //     && flight.icao24address != null
        //     && flight.on_ground == false 
        //     && flight.longitude != null
        //     && flight.latitude != null
        //     && flight.callsign != null) {

            
        //push onto flights array
            
            flights.push(flight);
        
        //Setup flight marker
        L.marker([flight.latitude, flight.longitude], 
            {icon: L.divIcon({
                className: "leaflet-plane-marker",
                html: L.Util.template('<svg style="filter: invert(57%) sepia(11%) saturate(3678%) hue-rotate(189deg) brightness(98%) contrast(98%); -webkit-transform: rotate('+ flight.true_track +'deg); -moz-transform:rotate('+ flight.true_track +'deg);" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 97.239 100" enable-background="new 0 0 97.239 100" xml:space="preserve"><path d="M42.732,5.521c0.01-7.396,11.138-7.396,11.151,0.207v30.956l43.355,26.108v11.412L54.091,60.032v23.137l9.953,7.814V100l-15.373-4.741L33.248,100v-9.017l9.9-7.814V60.032L0,74.205V62.792l42.732-26.108V5.521L42.732,5.521z"></path></svg>'),
                iconAnchor  : [12, 32],
                iconSize    : [25, 30],
                popupAnchor : [0, -28]
            })
        
        }).addTo(map)
        .bindPopup('Flight: ' + flight.callsign + ' - From: ' + flight.origin_country);


        // add flight item to flights conatiner
        var flightItem = document.createElement("div");
        flightItem.className = "flight-item";
        flightItem.id = flight.icao24address;
        flightItem.innerHTML = "<p>Flight - " + flight.callsign + "</p><p>Origin - " + flight.origin_country + "</p>" ;
        

        // //setup listener
        // flightItem.addEventListener("click", function(e){setView(flight.latitude, flight.longitude)});
        document.getElementById("flights_list").appendChild(flightItem);
        //}
    });

        document.querySelectorAll('.flight-item').forEach(item => {
            const matchedFlight = flights.find(flight => flight.icao24address === item.id);
            if (!!matchedFlight)
            {
                item.addEventListener('click', event => {
                    setView(matchedFlight.latitude, matchedFlight.longitude);
                })
            }
          });

}
)
.catch((err) => console.log(err));

function setView(latitude, longitude)
{
    map.setView([latitude,longitude], 10);
}