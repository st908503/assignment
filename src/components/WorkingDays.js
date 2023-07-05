import React, { useState } from 'react';
import moment from 'moment-timezone';

const TimezonePage = () => {
  // const [selectedDate, setSelectedDate] = useState(moment().utc());
  // const [timezone, setTimezone] = useState('UTC');
  // const [displayedTimes, setDisplayedTimes] = useState([]);
  // const [displayedDays, setDisplayedDays] = useState([]);
  const [weeklyWorkingDays, setWeeklyWorkingDays] = useState([]);
  const [weeklyWorkingTimes, setWeeklyWorkingTimes] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('UTC+0');

  const loadWeeklyData = (date) => {
    const startOfWeek = date.startOf('week');
    const endOfWeek = date.endOf('week');
    const days = [];
    const times = [];

    for (let day = startOfWeek.clone(); day.isSameOrBefore(endOfWeek); day.add(1, 'day')) {
        days.push(day.format('YYYY-MM-DD'));
    }

    for (let time = moment().startOf('day').hour(8); time.isSameOrBefore(moment().startOf('day').hour(23)); time.add(1, 'hour')) {
        times.push(time.format('HH:mm'));
    }

    setWeeklyWorkingDays(days);
    setWeeklyWorkingTimes(times);
};

  // const handleChangeDate = (direction) => {
  //   setSelectedDate(selectedDate.clone().add(direction, 'week'));
  // };

  // const handleChangeTimezone = (event) => {
  //   setTimezone(event.target.value);
  // };

  // const loadWeeklyWorkingDays = () => {
  //   const days = ['Mon', 'Tue', 'Wedn', 'Thu', 'Fri'];
  //   const times = [];

  //   for (let hour = 8; hour <= 23; hour++) {
  //     for (let minute = 0; minute < 60; minute += 30) {
  //       times.push(moment.utc().set({ hour, minute }).format('h:mm A'));
  //     }
  //   }

  //   setDisplayedTimes(times);
  //   setDisplayedDays(days)
  // };
  const displayTimeInSelectedTimezone = (time) => {
    return moment(time, 'HH:mm').tz(selectedTimezone).format('HH:mm');
  };


  const renderTimes = () => {
    // if (displayedTimes.length === 0) {
    //   return <p>No working days loaded</p>;
    // }

    return (
      // <div className='flex border border-gray-300'>
      //   <div>
      //     {displayedDays.map((days, index) => {
      //       return <label className='flex flex-col' key={index}>{days}</label>
      //     })}
      //   </div>
      //   <div>
      //     {displayedTimes.map((time, index) => {
      //       return <label key={index}><input type="checkbox" />{time}</label>
      //     })}
      //   </div>
      // </div>
      <table className="border-collapse">
        <thead>
          {/* <tr>
            <th>Date</th>
            {weeklyWorkingTimes.map((time) => (
              <th key={time}>{displayTimeInSelectedTimezone(time)}</th>
            ))}
          </tr> */}
          hello
        </thead>
        <tbody>
          {weeklyWorkingDays.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {weeklyWorkingTimes.map((time) => (
                <td key={time}>
                  <input type="checkbox" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // const formattedSelectedDate = selectedDate.tz(timezone).format('MMMM Do, YYYY');

  return (
    <div>
      {/* <h1>Weekly Working Days</h1>
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
      </div> */}
      {/* <div className='m-5 border border-gray-300 ' onClick={loadWeeklyWorkingDays}>Working Days</div> */}
      {renderTimes()}
    </div>
  );
};

export default TimezonePage;
