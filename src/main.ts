import "leaflet/dist/leaflet.css";
import { Subject, withLatestFrom } from "rxjs";
import "../assets/styles/index.scss";
import { input$, listFlights } from "./domManipulation";
import { getMap, renderMap } from "./Leaflet";
import { Flight } from "./model/Flight";
import { fetchFlights } from "./service"
import { storeFlights, webStorageFlights$ } from "./webstorage";

const apiFlights$ = fetchFlights();
const flightState$ = new Subject<Flight[]>();

let filterTextLocal:string = ``

flightState$.subscribe((flights) => {
  let filteredFlights = flights;
  
  if(!!filterTextLocal && filterTextLocal?.length > 0){
   filteredFlights = flights.filter(flight => flight.callsign.toUpperCase().indexOf(filterTextLocal.toUpperCase()) > -1);
  }
  renderMap(filteredFlights);
  listFlights(filteredFlights, getMap());
  storeFlights(flights)
});

input$.pipe(withLatestFrom(flightState$)).subscribe(([filterText,flights]) => {
  let filteredFlights = flights;
  filterTextLocal = filterText;

  if(!!filterText && filterText?.length > 0){
   filteredFlights = flights.filter(flight => flight.callsign.toUpperCase().indexOf(filterText.toUpperCase()) > -1);
  }
  renderMap(filteredFlights);
  listFlights(filteredFlights, getMap());
});

webStorageFlights$.subscribe((flights) =>{
  if (flights?.length === 0) {
    flightState$.next(flights)
  }
})

apiFlights$.subscribe((flights) => {
  flightState$.next(flights)
});