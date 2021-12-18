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
      {/* <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={selectDateHandler}
        minDate={today}
        todayButton={"Today"} /> */}

      <DatePicker
        selected={startDate}
        onChange={selectDateHandler}
        minDate={today}
        maxDate={today}
        showTimeSelect
        dateFormat="d/MM/yyyy HH:mm"
      />
    </>
  );
};
export default Time;