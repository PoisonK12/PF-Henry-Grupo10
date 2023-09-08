import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import styles from "../Details/Calendar.module.css"

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.container}>
      <h2>Seleccione la fecha del check-in:</h2>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
      {selectedDate && (
        <p>Fecha seleccionada: {selectedDate.toDateString()}</p>
      )}
    </div>
  );
}

export default Calendar;
