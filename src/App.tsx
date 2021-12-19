import './App.css';
import { useState } from 'react';
import AutoCompleteAirport from './components/AutoCompleteAirport';
import Time from './components/Time';
import FlightsList from './components/FlightsList';

type Airline = {
  name: string
}

type Airport = {
  city: string,
  name: string
}

type AirportOrAirline = Airport | Airline

interface IncludedData {
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

const App = () => {

  /* Getting Data from JSON */
  const JSON = require('./data/flights.json')
  const flightsData: FlightsDataObj[] = JSON.data
  const includedData: IncludedData = JSON.included

  /* Formating suggestions for Autocomplete */
  const airports = new Set();

  flightsData.forEach(flight => {
    airports.add(flight.arrivalAirport);
    airports.add(flight.departureAirport);
  })

  //Type guard
  function isAirport(toBeDetermined: AirportOrAirline): toBeDetermined is Airport {
    if ((toBeDetermined as Airport).city) {
      return true
    }
    return false
  }

  const suggestions: string[] = [];
  const airportsDictionnary = new Map<string, string>()

  for (const [key, value] of Object.entries(includedData)) {
    if (isAirport(value)) {
      const IATA = key.substring(key.length - 3, key.length)
      suggestions.push(`${value.city} - ${value.name} (${IATA})`)
      airportsDictionnary.set(`${value.city} - ${value.name} (${IATA})`, IATA)
    }
  }

  /* State definition */
  const [inputDep, setInputDep] = useState("");
  const [inputArr, setInputArr] = useState("");
  const [startDate, setDate] = useState(new Date);
  const [results, setResults] = useState<FlightsDataObj[]>([]);

  const setInputDepFromChild = (userInput: string) => {
    setInputDep(userInput)
  }

  const setInputArrFromChild = (userInput: string) => {
    setInputArr(userInput)
  }

  const setInputTimeFromChild = (inputDate: Date) => {
    setDate(inputDate)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    /* Search flight inputs */
    const dep = airportsDictionnary.get(inputDep);
    const arr = airportsDictionnary.get(inputArr);

    const inputDepTime = startDate  //   Sat Dec 18 2021 19:08:40 GMT+0100 (heure normale d’Europe centrale)
      .toLocaleTimeString()         //  '19:08:51'
      .substring(0, 5)              //  '19:08'
      .split(':');                  //  [19,08]

    const inputDepTimeToMin = Number(inputDepTime[0]) * 60 + Number(inputDepTime[1])

    /* Search flight according inputs */
    setResults(flightsData
      .filter(flight => {
        let IATA = flight.departureAirport.substring(flight.departureAirport.length - 3, flight.departureAirport.length)
        return IATA === dep
      })
      .filter(flight => {
        let IATA = flight.arrivalAirport.substring(flight.arrivalAirport.length - 3, flight.arrivalAirport.length)
        return IATA === arr
      })
      .filter(flight => {
        let depTime = flight.takeoff.split(':');
        let depTimeToMin = Number(depTime[0]) * 60 + Number(depTime[1]);
        return depTimeToMin > inputDepTimeToMin
      })
    )
  }

  return (

    <div className="App">
      <form onSubmit={handleSubmit}>
        <AutoCompleteAirport
          type='Departure'
          suggestions={suggestions}
          input={inputDep}
          updateStateFromChild={setInputDepFromChild} />
        <AutoCompleteAirport
          type='Arrival'
          suggestions={suggestions}
          input={inputArr}
          updateStateFromChild={setInputArrFromChild} />
        <Time
          inputDate={startDate}
          updateStateFromChild={setInputTimeFromChild} />
        <button type='submit'>Search</button>
      </form>

      {results.length > 0 ?
        (
          <FlightsList
            flights={results} />
        ) : (
          <>No Result</>
        )}
    </div >
  );
}

export default App;