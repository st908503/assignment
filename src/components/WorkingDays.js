import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const WorkingDays = () => {

  const [weeklyWorkingDays, setWeeklyWorkingDays] = useState([]);
  const [timezone, setTimezone] = useState('UTC');
  const [selectedDate, setSelectedDate] = useState(moment().startOf('isoWeek').add(4, 'days').utc());
  const [weeklyWorkingTimes, setWeeklyWorkingTimes] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('UTC+0');



  const startOfWeekday = moment().startOf('isoWeek').add(2, 'days');
  const weekday = [];

  for (let i = 0; i < 7; i++) {
    weekday.push(startOfWeekday.clone().add(i - 3, 'days').format('ddd'));
  }

  const today = moment().tz(timezone).startOf('day');
  const isPastDate = selectedDate.isBefore(today);

  const displayTimeInSelectedTimezone = (time) => {
    return moment(time, 'HH:mm').tz(selectedTimezone).format('HH:mm');
  };

  return (
    <div className="flex border border-collapse m-5 border-gray-300 py-2 px-2">
      <div>
        {weeklyWorkingDays.map((day, index) => {
          const formattedDate = moment(day).format('MM/DD');
          return (
            <div key={index} className="flex">
              <div className="w-[6%] flex ml-4 flex-col items-center justify-center bg-gray-100 text-red-800 font-bold">
                <div>{weekday[index]} </div>
                <div>{formattedDate}</div>
              </div>
              <div className="w-[80%] m-3">
                {isPastDate ? (<label className="p-7">Past</label>) : (
                  weeklyWorkingTimes.map((time, index) => (
                    <label className="p-7" key={index}>
                      <input className="" type="checkbox" />
                      {displayTimeInSelectedTimezone(time)}
                    </label>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default WorkingDays