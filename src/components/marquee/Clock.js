import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(getCurrentTimeAMPM());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTimeAMPM());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getCurrentTimeAMPM() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12

    // Add leading zero if hours/minutes is less than 10
    hours = (hours < 10 ? '0' : '') + hours;
    minutes = (minutes < 10 ? '0' : '') + minutes;

    return hours + ':' + minutes + ' ' + ampm;
  }

  return <h1 className="text-md font-semibold text-center">{time}</h1>;
}

export default Clock;
