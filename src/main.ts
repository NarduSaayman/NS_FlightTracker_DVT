import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/styles/index.scss";
import { Flight } from "./model/Flight";
import { State } from "./model/State";
import { fetchFlights } from "./service"

      const flights = fetchFlights();

      console.log(flights);

      flights.forEach(flight => {
        // Setup flight marker
        L.marker([flight.latitude, flight.longitude], {
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
          .addTo(map)
          .bindPopup(
            `<strong>Flight</strong> ${flight.callsign} - <strong>Origin</strong> ${flight.origin_country}`
          );
  
        // Add flight item to flights list
        const flightItem = document.createElement(`div`);
        flightItem.className = 
        `flight-item bg-jawgdark-500 p-4 mb-4 mt-6
        hover:cursor-pointer hover:bg-jawgdark-400 hover:shadow-white-glow
        lg:z-10 lg:transition-all lg:ease-in-out lg:delay-50 lg:duration-200
        lg:hover:translate-x-1 lg:hover:w-[405px]
        border-solid border-1 rounded-md
        drop-shadow-lg`;
        flightItem.id = flight.icao24address;
        flightItem.innerHTML = `
        <div class="flight-item-header hover:shadow-none shadow-white-glow rounded-md bg-jawgdark-50 p-1 text-center -mt-7 w-[50%] drop-shadow-md"><strong>Flight</strong> ${flight.callsign}</div>
        <div class="pt-2 text-jawgdark-50"><strong>Origin</strong> - ${flight.origin_country}</div>`;
        document.getElementById(`flights_list`)!.appendChild(flightItem);
      });


    // Setup eventListeners
    document.querySelectorAll(`.flight-item`).forEach((item) => {
      const matchedFlight = flights.find(
        (flight) => flight.icao24address === item.id
      );
      if (matchedFlight) {
        item.addEventListener(`click`, () => {
          setMapView(matchedFlight.latitude, matchedFlight.longitude);
        });
      }
    });

function setMapView(latitude: number, longitude: number) {
  map.flyTo([latitude, longitude], 8);
}
