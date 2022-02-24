import "leaflet/dist/leaflet.css";
import { Subject } from "rxjs";
import "../assets/styles/index.scss";
import { listFlights } from "./domManipulation";
import { getMap, renderMap } from "./Leaflet";
import { Flight } from "./model/Flight";
import { fetchFlights } from "./service"
import { storeFlights, webStorageFlights$ } from "./webstorage";

const apiFlights$ = fetchFlights();
const flightState$ = new Subject<Flight[]>()

flightState$.subscribe((flights) => {
  renderMap(flights);
  listFlights(flights,getMap());
  storeFlights(flights)
});

webStorageFlights$.subscribe((flights) =>{
  if (flights.length === 0) {
    flightState$.next(flights)
  }
})

apiFlights$.subscribe((flights) => {
  flightState$.next(flights)
});