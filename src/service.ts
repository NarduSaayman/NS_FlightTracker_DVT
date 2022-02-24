import { Flight } from "./model/Flight";
import { State } from "./model/State";

export function fetchFlights(): Flight[]{
    
    const flights: Flight[] = [];

    fetch(`https://opensky-network.org/api/states/all`)
      .then((response) => response?.json())
      .then((data: State) => {
        const states = data?.states
          ?.filter(
            (state) =>
              !!state[0] &&
              state[8] === false &&
              !!state[5] &&
              !!state[6] &&
              !!state[1]
          )
          .slice(0, 200);

        states?.map((state) => {
          const flight = ({
            icao24address: state[0],
            callsign: state[1],
            origin_country: state[2],
            longitude: state[5],
            latitude: state[6],
            on_ground: state[8],
            true_track: state[10],
          } as Flight)


          // push onto flights array
          flights.push(flight);

        });

        return flights;

      }).catch((err) => console.error(err));

      return flights;
}
