import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
// import styled from 'styled-components'

type TimeProps = {
  inputDate: Date | null | undefined,
  updateStateFromChild: (date: Date) => void
}

const Time = (props: TimeProps) => {

  const today = new Date()

  return (
    <>
      <DatePicker
        selected={props.inputDate}
        placeholderText='Select select a date'
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