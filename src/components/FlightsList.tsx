import { FlightsDataObj } from "../types/types"
import { StyledButton } from './styled-components/Button.style';

import AF from '../data/AF.jpg'
import LH from '../data/LH.png'

type FlightsListProps = {
  flights: FlightsDataObj[]
}

/* Mapping logos */
const logos = new Map()
logos.set('AF', AF);
logos.set('LH', LH);

const FlightsList = (props: FlightsListProps) => {

  /* utils function to convert minutes into hours */
  const minToHour = (minutes: number): string => {
    let nbHour = Math.trunc(minutes / 60);
    let nbminuteRestante = (minutes % 60);
    if (nbminuteRestante === 0) {
      return nbHour.toString() + "h"
    } else {
      return nbHour.toString() + "h" + nbminuteRestante;
    }
  }

  const printFlightDetails = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const selectedFlight = props.flights.filter(flight => flight.id === id)
    console.log(selectedFlight)
  }

  return (
    <>
      {props.flights.map(flight =>
      (
        <div key={flight.id} className="flight-container">

          <img className='logo' src={logos.get(flight.airline.substring(flight.airline.length - 2, flight.airline.length))} alt={flight.airline.substring(flight.airline.length - 2, flight.airline.length)} />
          <div className="flight-info">

            <div className="flight-info-airport">
              <p className="hour">{flight.takeoff}</p>
              <p className="airport">{flight.departureAirport.substring(flight.departureAirport.length - 3, flight.departureAirport.length)}</p>
            </div>

            <p className="duration">{minToHour(flight.duration)}</p>

            <div className="flight-info-airport">
              <p className="hour">{flight.landing}</p>
              <p className="airport">{flight.arrivalAirport.substring(flight.departureAirport.length - 3, flight.departureAirport.length)}</p>
            </div>


          </div>
          <div className="flight-price">
            <p>{flight.price} {flight.currencyCode}</p>
            <StyledButton type='submit' variante='select' onClick={(e) => printFlightDetails(e, flight.id)}>Select Flight</StyledButton>
          </div>
        </div>
      ))}
    </>
  );
};
export default FlightsList;