import { useState } from 'react';
import DatePicker from 'react-datepicker'
// import styled from 'styled-components'

type TimeProps = {
  inputDate: Date,
  updateStateFromChild: (date: Date) => void
}

const Time = (props:TimeProps) => {

  const today = new Date()

  return (
    <>
      <DatePicker
        selected={props.inputDate}
        onChange={props.updateStateFromChild}
        minDate={today}
        maxDate={today}
        showTimeSelect
        dateFormat="dd/MM/yyyy HH:mm"
      />
    </>
  );
};
export default Time;