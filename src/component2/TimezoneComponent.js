import React, { useState } from 'react';

const TimezoneComponent = () => {
  const [timezone1, setTimezone1] = useState('UTC-0');
  const [timezone2, setTimezone2] = useState('Your Target Timezone');

  const handleChangeTimezone1 = (e) => {
    setTimezone1(e.target.value);
  };

  const handleChangeTimezone2 = (e) => {
    setTimezone2(e.target.value);
  };

  const getTimeForTimezone = (timezone) => {
    const date = new Date().toLocaleString('en-US', { timeZone: timezone });
    return new Date(date).toLocaleTimeString('en-US');
  };

  return (
    <div>
      <select value={timezone1} onChange={handleChangeTimezone1}>
        <option value="UTC-0">UTC-0</option>
        <option value="Your Timezone 1">Your Timezone 1</option>
      </select>
      <select value={timezone2} onChange={handleChangeTimezone2}>
        <option value="Your Target Timezone">Your Target Timezone</option>
        <option value="Your Timezone 2">Your Timezone 2</option>
      </select>
      <div>{getTimeForTimezone(timezone1)}</div>
      <div>{getTimeForTimezone(timezone2)}</div>
    </div>
  );
};

export default TimezoneComponent;
