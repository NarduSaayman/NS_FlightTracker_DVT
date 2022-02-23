export interface JsonResponse{
    flights : Flight[] | undefined;
}

export interface Flight{
    icao24address: string,
    callsign: string,
    origin_country: string,
    longitude: number,
    latitude: number,
    on_ground: boolean,
    true_track: number,   
}