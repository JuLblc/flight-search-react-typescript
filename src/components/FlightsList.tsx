import { FlightsDataObj } from "../App"

type FlightsListProps = {
  flights: FlightsDataObj[]
}

const FlightsList = (props: FlightsListProps) => {
  return (
    <>
      {props.flights.map(flight => (
        <div>
          {flight.takeoff} - {flight.landing} - {flight.duration}
        </div>
        )
      )       
     }
    </>
  );
};
export default FlightsList;