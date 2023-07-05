import React, { useState } from 'react';

const WorkingDayComponent = () => {
  const [workingDays, setWorkingDays] = useState([
    { day: 'Mon', selected: false },
    { day: 'Tue', selected: false },
    { day: 'Wed', selected: false },
    { day: 'Thu', selected: false },
    { day: 'Fri', selected: false },
  ]);

  const handleWorkingDayChange = (index, selected) => {
    setWorkingDays(prevWorkingDays => {
      const newWorkingDays = [...prevWorkingDays];
      newWorkingDays[index].selected = selected;
      return newWorkingDays;
    });
  };

  return (
    <div>
      {workingDays.map((day, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={day.selected}
              onChange={e => handleWorkingDayChange(index, e.target.checked)}
            />
            {day.day}
          </label>
        </div>
      ))}
    </div>
  );
};

export default WorkingDayComponent;
