import Time from './components/Time';
import { useState } from 'react';
import AutoCompleteAirport from './components/AutoCompleteAirport';
import FlightsList from './components/FlightsList';
import './App.css';

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
  const [startDate, setDate] = useState<Date | null>();
  const [results, setResults] = useState<FlightsDataObj[]>([]);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const setInputDepFromChild = (userInput: string) => {
    setInputDep(userInput)
  }

  const setInputArrFromChild = (userInput: string) => {
    setInputArr(userInput)
  }

  const setInputTimeFromChild = (inputDate: Date) => {
    setDate(inputDate)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsFirstSearch(false);

    /* Search flight inputs */
    const dep = airportsDictionnary.get(inputDep);
    const arr = airportsDictionnary.get(inputArr);

    if (startDate) {
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
  }

  return (

    <div className="App">
      <header className="header">
        <h1>Worldia challenge!!</h1>
        <h2>Let the trip begin</h2>
      </header>
      <section className='search-input'>
        <form onSubmit={handleSubmit}>
          <AutoCompleteAirport
            type='From'
            suggestions={suggestions}
            input={inputDep}
            updateStateFromChild={setInputDepFromChild} />
          <AutoCompleteAirport
            type='To'
            suggestions={suggestions}
            input={inputArr}
            updateStateFromChild={setInputArrFromChild} />
          <Time
            inputDate={startDate}
            updateStateFromChild={setInputTimeFromChild} />
          <button className="btn-search" type='submit'>Search</button>
        </form>
      </section>

      {results.length > 0 ?
        (
          <FlightsList
            flights={results} />
        ) : !isFirstSearch ? (
          
          <p className='message'>Sorry we didn't find any flight corresponding to your research...</p>
        ) : null}
    </div >
  );
}

export default App;