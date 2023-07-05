import React, { useState } from 'react';
import moment from 'moment-timezone';

const Workfile = () => {
  const [selectedDate, setSelectedDate] = useState(moment().utc());
  const [timezone, setTimezone] = useState('UTC');
  const [displayedTimes, setDisplayedTimes] = useState([]);

  const handleChangeDate = (direction) => {
    setSelectedDate(selectedDate.clone().add(direction, 'week'));
  };

  const handleChangeTimezone = (event) => {
    setTimezone(event.target.value);
  };

  const loadWeeklyWorkingDays = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = [];

    for (let hour = 8; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        times.push(moment.utc().set({ hour, minute }).format('h:mm A'));
      }
    }

    setDisplayedTimes(times);
  };

  const renderTimes = () => {
    if (displayedTimes.length === 0) {
      return <p>No working days loaded</p>;
    }

    return (
      <ul>
        {displayedTimes.map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>
    );
  };

  const formattedSelectedDate = selectedDate.tz(timezone).format('MMMM Do, YYYY');

  return (
    <div>
      <h1>Weekly Working Days</h1>
      <p>Date: {formattedSelectedDate}</p>
      <div>
        <button onClick={() => handleChangeDate(-1)}>Previous</button>
        <button onClick={() => handleChangeDate(1)}>Next</button>
      </div>
      <div>
        <label htmlFor="timezone">Timezone:</label>
        <select id="timezone" value={timezone} onChange={handleChangeTimezone}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>
      <button onClick={loadWeeklyWorkingDays}>Load Weekly Working Days</button>
      {renderTimes()}
    </div>
  );
};

export default Workfile;
