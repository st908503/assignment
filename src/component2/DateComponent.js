import React, { useState } from 'react';

const DateComponent = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const handlePrevWeek = () => {
    setCurrentWeek(prevWeek => prevWeek - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => prevWeek + 1);
  };

  const getDateForWeek = (weekOffset) => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() + weekOffset * 7));
    const lastDayOfWeek = new Date(today.setDate(today.getDate() + 6));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return `${firstDayOfWeek.toLocaleDateString('en-US', options)} - ${lastDayOfWeek.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div>
      <button onClick={handlePrevWeek}>Previous</button>
      <button onClick={handleNextWeek}>Next</button>
      <div>{getDateForWeek(currentWeek)}</div>
    </div>
  );
};

export default DateComponent;
