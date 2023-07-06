import React, { useState, useEffect } from 'react';

const Timezone = () => {

    const [selectedTimezone, setSelectedTimezone] = useState('UTC+0');
    const handleTimezoneChange = (e) => {
        setSelectedTimezone(e.target.value);
    };
    return (
        <div className='flex flex-col px-5 mt-5'>
            <label className='font-bold' htmlFor="timezone">Timezone:</label>
            <select
                className='mt-2 outline-none border border-gray-300 py-2'
                id="timezone"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
            >
                <option value="UTC+0">UTC+0</option>
                <option value="America/New_York">America/New_York</option>
            </select>
        </div>
    )
}

export default Timezone