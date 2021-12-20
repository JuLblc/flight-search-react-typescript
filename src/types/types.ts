export type Airline = {
    name: string
}

export type Airport = {
    city: string,
    name: string
}

export type AirportOrAirline = Airport | Airline

export interface IncludedData {
    [key: string]: Airline | Airport
}

export type FlightsDataObj = {
    id: string,
    flightNumber: string,
    airline: string,
    takeoff: string,
    landing: string,
    duration: number,
    price: number,
    currencyCode: string,
    departureAirport: string,
    arrivalAirport: string
}

//Type guard
export function isAirport(toBeDetermined: AirportOrAirline): toBeDetermined is Airport {
    if ((toBeDetermined as Airport).city) {
        return true
    }
    return false
}