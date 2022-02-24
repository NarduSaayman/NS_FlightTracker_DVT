import { fromEvent, Subject, takeUntil } from "rxjs";
import { Flight } from "./model/Flight";

const cleaup$ = new Subject();

export const input$ = new Subject<string>();

export function listFlights(flights: Flight[], leafletMap: L.Map) {
  cleaup$.next(true); // Destructor for eventLiteners

  // move to dom ts
  const flightListElement = document.getElementById(`flights_list`);
  if (!!flightListElement) {
    flightListElement.innerHTML = ``;
  }

  flights.forEach((flight) => {
    // Add flight item to flights list
    const flightItem = document.createElement(`div`);

    // Item styling
    flightItem.className = `flight-item bg-gradient-to-br from-jawgdark-700 to-jawgdark-500 p-4 mb-4 mt-6
        hover:cursor-pointer hover:bg-gradient-to-tl hover:shadow-white-glow
        lg:z-40 lg:transition-all lg:ease-in-out lg:delay-50 lg:duration-200
        lg:hover:translate-x-1 hover:overflow-visible
        border-solid border-1 rounded-md z-40
        drop-shadow-lg`;

    flightItem.id = flight.icao24address;
    flightItem.innerHTML = `
        <div class="flight-item-header hover:shadow-none shadow-white-glow text-black rounded-md bg-jawgdark-50 p-2 text-center -mt-7 w-[50%] drop-shadow-md">
            <strong>Flight</strong> - ${flight.callsign}
        </div>
        <div class="p-2 text-jawgdark-50 text-center ">
            <strong>Origin</strong> - ${flight.origin_country}
        </div>

        <div class="p-3 px-10 pb-3 border border-jawgdark-50 rounded-md bg-gradient-to-tr from-jawgdark-600 to-jawgdark-500 hover:bg-gradient-to-bl">
        <div class="text-jawgdark-50">
        <strong>${flight.climb < 0 ? `Decending` : `Climbing`}</strong> to ${
      flight.altitude.toFixed(2)
    } ft
        </div>

        <div class=" text-jawgdark-50">
        <strong>Curising </strong> at ${flight.velocity.toFixed(2)} km/s
        </div>

        </div>
        
        `;
    document.getElementById(`flights_list`)!.appendChild(flightItem);
  });

  // Setup eventListeners
  document.querySelectorAll(`.flight-item`).forEach((item) => {
    const matchedFlight = flights.find(
      (flight) => flight.icao24address === item.id
    );
    if (matchedFlight) {
      fromEvent(item, "click")
        .pipe(takeUntil(cleaup$))
        .subscribe(() => {
          leafletMap.flyTo(
            [matchedFlight.latitude, matchedFlight.longitude],
            8
          );
        });
    }
  });

  const searchInput = document.getElementById(`searchTxt`);
  
  if (!!searchInput) {
   searchInput.addEventListener(`input`, e => {
       input$.next((e?.target as HTMLInputElement)?.value);
   })
  }

}
