import './App.css';
import AutoCompleteAirport from './components/AutoCompleteAirport';

function App() {
  return (
    <div className="App">
      <AutoCompleteAirport
        type='Departure'
        suggestions={[
          'Paris',
          'New-York',
          'Tokyo',
          'Londres',
          'Longchamps'
        ]} />
      <AutoCompleteAirport
        type='Arrival'
        suggestions={[
          'Paris',
          'New-York',
          'Tokyo',
          'Londres',
          'Longchamps'
        ]} />
    </div>
  );
}

export default App;
