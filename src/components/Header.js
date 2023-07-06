import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Header = () => {

    const [selectedDate, setSelectedDate] = useState(moment().startOf('isoWeek').add(4, 'days').utc());
    const [timezone, setTimezone] = useState('UTC');


    const handleChangeDate = (direction) => {
        setSelectedDate(selectedDate.clone().add(direction, 'week'));
    };
    const formattedSelectedDate = selectedDate.tz(timezone).format('MMMM Do, YYYY');

    return (
        <div className='flex justify-between mx-5 my-1 py-2 border border-gray-300'>
            <div className='flex cursor-pointer '>
                <span><ArrowLeftIcon className='text-blue-600 -mr-2' /></span>
                <p onClick={() => handleChangeDate(-1)} className='text-blue-600 bg-gray-100 px-1 rounded'>Previous Week</p>
            </div>
            <div>
                <p>{formattedSelectedDate}</p>
            </div>
            <div className='flex cursor-pointer'>
                <p onClick={() => handleChangeDate(1)} className='text-blue-600 bg-gray-100 px-1 rounded'>Next Week</p>
                <span><ArrowRightIcon className='text-blue-600 -ml-2' /></span>
            </div>
        </div>
    )
}

export default Header