import { fromEvent, Subject, takeUntil } from "rxjs";
import { Flight } from "./model/Flight";

const cleaup$ = new Subject();

export function listFlights(flights: Flight[], leafletMap:L.Map){

    cleaup$.next(true); // Destructor for eventLiteners

    // move to dom ts
    const flightListElement = document.getElementById(`flights_list`)
    if (!!flightListElement) {
        flightListElement.innerHTML = ``;
    }

    flights.forEach(flight =>{
        // Add flight item to flights list
        const flightItem = document.createElement(`div`);

        // Item styling
        flightItem.className = 
        `flight-item bg-jawgdark-500 p-4 mb-4 mt-6
        hover:cursor-pointer hover:bg-jawgdark-400 hover:shadow-white-glow
        lg:z-10 lg:transition-all lg:ease-in-out lg:delay-50 lg:duration-200
        lg:hover:translate-x-1 lg:hover:w-[405px]
        border-solid border-1 rounded-md
        drop-shadow-lg`;

        flightItem.id = flight.icao24address;
        flightItem.innerHTML = `
        <div class="flight-item-header hover:shadow-none shadow-white-glow text-black rounded-md bg-jawgdark-50 p-1 text-center -mt-7 w-[50%] drop-shadow-md">
            <strong>Flight</strong> - ${flight.callsign}
        </div>
        <div class="pt-2 text-jawgdark-50">
            <strong>Origin</strong> - ${flight.origin_country}
        </div>`;
        document.getElementById(`flights_list`)!.appendChild(flightItem);
    });

    // Setup eventListeners
    document.querySelectorAll(`.flight-item`).forEach((item) => {
        const matchedFlight = flights.find(
          (flight) => flight.icao24address === item.id
        );
        if (matchedFlight) {
          fromEvent(item, 'click').pipe(takeUntil(cleaup$)).subscribe(() => leafletMap.flyTo([matchedFlight.latitude, matchedFlight.longitude], 8));
        }
      });
}