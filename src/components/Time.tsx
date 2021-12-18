import { useState } from 'react';
import DatePicker from 'react-datepicker'
// import styled from 'styled-components'

const Time = () => {

  const [startDate, setDate] = useState(new Date)
  const today = new Date()

  const selectDateHandler = (d: Date) => {
    setDate(d)
  }

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={selectDateHandler}
        minDate={today}
        maxDate={today}
        showTimeSelect
        dateFormat="dd/MM/yyyy HH:mm"
      />
    </>
  );
};
export default Time;