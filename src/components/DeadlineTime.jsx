import React, { useState } from 'react';

const DeadlineTime = ({deadlineTimeData, isToday}) => {
    const now = new Date();
    const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
    const currentTotalSeconds = currentTotalMinutes * 60 + now.getSeconds();

    const [timePart, meridiem] = deadlineTimeData.split(' ');
    const [hour, minute] = timePart.split(':').map(Number);

    let deadlineHour = hour % 12 + (meridiem === 'PM' ? 12 : 0);
    const deadlineTotalMinutes = deadlineHour * 60 + minute;
    const deadlineTotalSeconds = deadlineTotalMinutes * 60;

    let timeLeft = '';

    if (isToday) {
        const secondLeft = deadlineTotalSeconds - currentTotalSeconds;
        const absSecondLeft = Math.abs(secondLeft);
        const hourLeft = Math.floor(absSecondLeft / 3600);
        const minuteLeft = Math.floor((absSecondLeft % 3600) / 60);
        const secondLeftRemaining = absSecondLeft % 60;

        if (secondLeft > 0) {
            timeLeft = ` • ${hourLeft.toString().padStart(2, '0')}h : ${minuteLeft.toString().padStart(2, '0')}m : ${secondLeftRemaining.toString().padStart(2, '0')}s`;
        } else {
            timeLeft = ` • ${hourLeft.toString().padStart(2, '0')}h : ${minuteLeft.toString().padStart(2, '0')}m : ${secondLeftRemaining.toString().padStart(2, '0')}s`;
        }
    }

    return (
        <p>{deadlineTimeData}{timeLeft}</p>
    );
};

export default DeadlineTime;