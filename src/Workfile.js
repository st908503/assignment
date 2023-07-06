import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const WorkFile = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC+0");
  const [weeklyWorkingDays, setWeeklyWorkingDays] = useState([]);
  const [weeklyWorkingTimes, setWeeklyWorkingTimes] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    moment().startOf("isoWeek").add(4, "days").utc()
  );
  const timezone = "UTC";

  const handleChangeDate = (direction) => {
    setSelectedDate(selectedDate.clone().add(direction, "week"));
  };

  const formattedSelectedDate = selectedDate
    .tz(timezone)
    .format("MMMM Do, YYYY");
  const today = moment().tz(timezone).startOf("day");
  const isPastDate = selectedDate.isBefore(today);

  const startOfWeekday = moment().startOf("isoWeek").add(2, "days");
  const weekday = [];

  for (let i = 0; i < 7; i++) {
    weekday.push(
      startOfWeekday
        .clone()
        .add(i - 3, "days")
        .format("ddd")
    );
  }
  useEffect(() => {
    loadWeeklyData(selectedDate);
  }, [selectedDate]);

  const loadWeeklyData = (date) => {
    const startOfWeek = date.clone().startOf("week");
    const endOfWeek = date.clone().endOf("week");
    const days = [];
    const times = [];

    for (
      let day = startOfWeek.clone();
      day.isSameOrBefore(endOfWeek);
      day.add(1, "day")
    ) {
      days.push(day.format("YYYY-MM-DD"));
    }

    for (
      let time = moment().startOf("day").hour(8);
      time.isSameOrBefore(moment().startOf("day").hour(23));
      time.add(0.5, "hour")
    ) {
      times.push(time.format("HH:mm"));
    }

    setWeeklyWorkingDays(days);
    setWeeklyWorkingTimes(times);
  };

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  const displayTimeInSelectedTimezone = (time) => {
    return moment(time, "HH:mm").tz(selectedTimezone).format("HH:mm");
  };

  return (
    <div>
      {/* Week and date section */}
      <div className="flex justify-between mx-5 my-1 py-2 border border-gray-300">
        <div className="flex cursor-pointer ">
          <span>
            <ArrowLeftIcon className="text-blue-600 -mr-2" />
          </span>
          <p
            onClick={() => handleChangeDate(-1)}
            className="text-blue-600 bg-gray-100 px-1 rounded"
          >
            Previous Week
          </p>
        </div>
        <div>
          <p>{formattedSelectedDate}</p>
        </div>
        <div className="flex cursor-pointer">
          <p
            onClick={() => handleChangeDate(1)}
            className="text-blue-600 bg-gray-100 px-1 rounded"
          >
            Next Week
          </p>
          <span>
            <ArrowRightIcon className="text-blue-600 -ml-2" />
          </span>
        </div>
      </div>
      {/* Week and date section end */}

      {/* Time zone section */}
      <div className="flex flex-col px-5 mt-5">
        <label className="font-bold" htmlFor="timezone">
          Timezone:
        </label>
        <select
          className="mt-2 outline-none border border-gray-300 py-2"
          id="timezone"
          value={selectedTimezone}
          onChange={handleTimezoneChange}
        >
          <option value="UTC+0">UTC+0</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>

      {/* Time zone section end */}

      {/* Working Day Section */}
      <div className="flex border border-collapse m-5 border-gray-300 py-2 px-2">
        <div>
          {weeklyWorkingDays.map((day, index) => {
            const formattedDate = moment(day).format("MM/DD");
            return (
              <div key={index} className="flex">
                <div className="w-[6%] flex ml-4 flex-col items-center justify-center bg-gray-100 text-red-800 font-bold">
                  <div>{weekday[index]} </div>
                  <div>{formattedDate}</div>
                </div>
                <div className="w-[80%] m-3">
                  {isPastDate ? (
                    <label className="p-7">Past</label>
                  ) : (
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
      {/* Working Day Section Completed */}
    </div>
  );
};

export default WorkFile;
