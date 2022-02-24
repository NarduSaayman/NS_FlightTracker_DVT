import "leaflet/dist/leaflet.css";
import { interval, Subject } from "rxjs";
import "../assets/styles/index.scss";
import { renderMap } from "./Leaflet";
import { Flight } from "./model/Flight";
import { fetchFlights } from "./service"

      const apiFlights$ = fetchFlights();
      // const webStorageFlights$ = 
      const flightState$ = new Subject<Flight[]>()

      flightState$.subscribe((flights) => {
        renderMap(flights);
        // listFlights(flights);
        // storeFlights(flgihts)

      });

      // if getStoredFlights() length 0
      // call fetchFlights()

      apiFlights$.subscribe((flights) => {
        flightState$.next(flights)
      });

      // webStorageFlights$.subscribe((flights) => {
      //   flightState$.next(flights)
      // });