import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const NewFile = () => {
    const [startDate, setStartDate] = useState(moment());
    const [selectedTimezone, setSelectedTimezone] = useState('UTC+0');
    const [weeklyWorkingDays, setWeeklyWorkingDays] = useState([]);
    const [weeklyWorkingTimes, setWeeklyWorkingTimes] = useState([]);

    useEffect(() => {
        loadWeeklyData(startDate);
    }, [startDate]);

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

    const handlePreviousWeek = () => {
        setStartDate(startDate.clone().subtract(1, 'week'));
    };

    const handleNextWeek = () => {
        setStartDate(startDate.clone().add(1, 'week'));
    };

    const handleTimezoneChange = (e) => {
        setSelectedTimezone(e.target.value);
    };

    const displayTimeInSelectedTimezone = (time) => {
        return moment(time, 'HH:mm').tz(selectedTimezone).format('HH:mm');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl mb-4">Weekly Schedule</h1>

            <div className="flex items-center mb-4">
                <button
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
                    onClick={handlePreviousWeek}
                >
                    Previous Week
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleNextWeek}
                >
                    Next Week
                </button>
            </div>

            <div className="mb-4">
                <label htmlFor="timezone" className="mr-2">
                    Select Timezone:
                </label>
                <select
                    id="timezone"
                    value={selectedTimezone}
                    onChange={handleTimezoneChange}
                >
                    <option value="UTC+0">UTC+0</option>
                    <option value="America/New_York">America/New_York</option>
                    {/* Add more timezones as needed */}
                </select>
            </div>

            <table className="border-collapse">
                <thead>
                    <tr>
                        <th>Date</th>
                        {weeklyWorkingTimes.map((time) => (
                            <th key={time}>{displayTimeInSelectedTimezone(time)}</th>
                        ))}
                    </tr>
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
        </div>
    );
};

export default NewFile;
