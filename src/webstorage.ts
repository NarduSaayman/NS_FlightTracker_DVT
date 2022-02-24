import { get, set } from "idb-keyval";
import { from } from "rxjs";
import { Flight } from "./model/Flight";

export const webStorageFlights$ = from(get('FligthsDB'));

export function storeFlights(flights: Flight[]){set('FlightsDB',flights)};