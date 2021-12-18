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

  for (const [key, value] of Object.entries(includedData)) {
    if (isAirport(value)) {
      const IATA = key.substring(key.length - 3, key.length)
      suggestions.push(`${value.city} - ${value.name} (${IATA})`)
    }
  }

  /* State definition */


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log('afficher résultat');
    console.log('flightsData: ', flightsData)
    // 1. Récuperer airport Time, Dep & arr
    let dep = 'CDG';
    let arr = 'JFK';
    let inputDepTime = '17:30'.split(':');
    let inputDepTimeToMin = Number(inputDepTime[0]) * 60 + Number(inputDepTime[1])

    // 2. Checker dans filghtdata si match
    const result = flightsData
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

    console.log('result: ', result)

    // 3. setState results
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