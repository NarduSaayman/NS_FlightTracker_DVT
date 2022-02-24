import "leaflet/dist/leaflet.css";
import "../assets/styles/index.scss";
import { renderMap } from "./Leaflet";
import { fetchFlights } from "./service"

      const flights = fetchFlights();

      console.log(flights);

      renderMap(flights);
