import React, { useState } from 'react';

const DeadlineTime = ({deadlineTimeData, isToday}) => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes() + (currentHour * 60);
    
    const [timePart, meridiem] = deadlineTimeData.split(' ');
    const [hour, minute] = timePart.split(':').map(Number);

    let deadlineHour;
    if (meridiem === 'PM' && hour < 12) {
        deadlineHour = hour + 12;
    } else if (meridiem === 'AM' && hour === 12) {
        deadlineHour = 0;
    } else {
        deadlineHour = hour;
    }
    const deadlineTotalMinutes = minute + (deadlineHour * 60);

    let hourLeft = 0;
    let minuteLeft = 0;
    let timeLeft = '';

    if(isToday){
        minuteLeft = deadlineTotalMinutes - currentMinute;

        if(minuteLeft > 0){
            hourLeft = Math.floor(minuteLeft / 60);
            minuteLeft = minuteLeft % 60;

            timeLeft = ' • ' + (hourLeft > 0 ? hourLeft.toString().padStart(2, '0') + ' hour(s) and ' : '') + minuteLeft.toString().padStart(2, '0') + ' minute(s) left';
        }else{
            timeLeft = ' • already passed';
        }
    }

    return (
        <p>{deadlineTimeData}{timeLeft}</p>
    );
};

export default DeadlineTime;