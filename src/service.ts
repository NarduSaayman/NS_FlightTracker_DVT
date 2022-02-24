import { from, interval, Observable, retry, retryWhen, switchMap, timer } from "rxjs";
import { Flight } from "./model/Flight";
import { JsonRes } from "./model/State";

// Get API calls from openskynetwork

/*
    State - 0 = icao24address
            1 = callsign
            2 = origin_country
            5 = longitude
            6 = latitude
            8 = on_ground
            10 = true_track
    */

export function fetchFlights(): Observable<Flight[]> {
  return timer(0, 15000).pipe(switchMap(() =>
    fetch(`https://opensky-network.org/api/states/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<JsonRes>;
      })
      .then((data: JsonRes) => {
        const states =
          data?.states
            ?.filter(
              (state) =>
                !!state[0] &&
                state[8] === false &&
                !!state[5] &&
                !!state[6] &&
                !!state[1]
            )
            .slice(0, 200) || [];

        return states.map(
          (state) =>
            ({
              icao24address: state[0] as string,
              callsign: state[1] as string,
              origin_country: state[2] as string,
              longitude: state[5] as number,
              latitude: state[6] as number,
              on_ground: state[8] as boolean,
              true_track: state[10] as number,
            } as Flight)
        );
      })
      .catch((err) => {  
        console.error(err)
        throw new Error(err.toString());
    })
  ),
  retry(1) // retry once
  ); // end pipe
}
