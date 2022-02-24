import L, { marker } from "leaflet"
import "leaflet/dist/leaflet.css";
import "../assets/styles/index.scss";
import { fromEvent, Subject, takeUntil } from "rxjs";
import { Flight } from "./model/Flight";

const markers: L.Marker[] = [];

// Leaflet map setup
const leafletMap = L.map(`map`).setView([0, 0], 3);

L.tileLayer(
    `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=oU2G7Jcu16TVkU41lY2b9OYNvr12IhqiK1SPVkM349tunMkQkA3eSR1CCUPiyEIn`,
    {
    attribution: `&copy; <a href="https://www.jawg.io/">JAWG</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
    maxZoom: 22,
    }
).addTo(leafletMap);

// Funcitons to render flight Markers
export function renderMap(flights: Flight[]){

    // Clear layer if exists
    if(leafletMap && markers.length > 0){
        markers.forEach(marker => leafletMap.removeLayer(marker))
    }

    // Add markers
    flights.forEach(flight => {
        // Setup flight marker
        const marker = L.marker([flight.latitude, flight.longitude], {
          icon: L.divIcon({
            className: `leaflet-plane-marker`,
            html: L.Util.template(
              `<svg style="filter: invert(100%) sepia(0%) saturate(7478%) hue-rotate(227deg) brightness(109%) contrast(100%); 
                stroke: #e6e5e5; 
                stroke-width: 5px; 
                -webkit-transform: rotate({Heading}deg); 
                -moz-transform:rotate({Heading}deg);
                " version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 97.239 100" enable-background="new 0 0 97.239 100" xml:space="preserve"><path d="M42.732,5.521c0.01-7.396,11.138-7.396,11.151,0.207v30.956l43.355,26.108v11.412L54.091,60.032v23.137l9.953,7.814V100l-15.373-4.741L33.248,100v-9.017l9.9-7.814V60.032L0,74.205V62.792l42.732-26.108V5.521L42.732,5.521z"></path>
                </svg>`
            ,{Heading: flight.true_track}),
            iconAnchor: [12, 32],
            iconSize: [25, 30],
            popupAnchor: [0, -28],
          }),
        })
          .addTo(leafletMap)
          .bindPopup(
            `<strong>Flight</strong> ${flight.callsign} - <strong>Origin</strong> ${flight.origin_country}`
          );

        markers.push(marker);
    });
}

export function getMap(){return leafletMap}