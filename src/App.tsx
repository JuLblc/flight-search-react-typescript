import './App.css';
import AutoCompleteAirport from './components/AutoCompleteAirport';
import Time from './components/Time';

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

type FlightsDataObj = {
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

  const JSON = require('./data/flights.json')
  const flightsData: FlightsDataObj[] = JSON.data
  const includedData: IncludedData = JSON.included
  const airports = new Set();

  flightsData.forEach(flight => {
    airports.add(flight.arrivalAirport);
    airports.add(flight.departureAirport);
  })

  function isAirport(toBeDetermined: AirportOrAirline): toBeDetermined is Airport {
    if ((toBeDetermined as Airport).city) {
      return true
    }
    return false
  }

  const suggestions: string[] = [];

  for (const [key, value] of Object.entries(includedData)) {
    if (isAirport(value)) {
      const IATA = key.substring(key.length - 3, key.length)
      suggestions.push(`${value.city} - ${value.name} (${IATA})`)
    }
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log('afficher résultat')
    // console.log()
  }

  return (

    <div className="App">
      <form onSubmit={handleSubmit}>
        <AutoCompleteAirport
          type='Departure'
          suggestions={suggestions} />
        <AutoCompleteAirport
          type='Arrival'
          suggestions={suggestions} />
        <Time />
        <button type='submit'>Search</button>
      </form>
    </div >
  );
}

export default App;