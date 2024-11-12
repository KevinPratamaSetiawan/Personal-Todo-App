import React, { useState } from 'react';

import { formatDate } from '../utils/script';

const TodoDeadlineCounter = ({deadlineStartTime, deadlineEndTime, isToday}) => {
    const now = new Date();
    const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
    const currentTotalSeconds = currentTotalMinutes * 60 + now.getSeconds();

    const [startHour, startMinute] = deadlineStartTime.split(':').map(Number);
    const [endHour, endMinute] = deadlineEndTime.split(':').map(Number);

    const deadlineTotalMinutes = startHour * 60 + startMinute;
    const deadlineTotalSeconds = deadlineTotalMinutes * 60;

    let timeLeft = '';

    if (isToday) {
        const secondLeft = deadlineTotalSeconds - currentTotalSeconds;
        const absSecondLeft = Math.abs(secondLeft);
        const hourLeft = Math.floor(absSecondLeft / 3600);
        const minuteLeft = Math.floor((absSecondLeft % 3600) / 60);
        const secondLeftRemaining = absSecondLeft % 60;

        if (secondLeft > 0) {
            timeLeft = `in ${hourLeft.toString().padStart(2, '0')}h : ${minuteLeft.toString().padStart(2, '0')}m : ${secondLeftRemaining.toString().padStart(2, '0')}s`;
        }else if(now.getHours() > startHour && now.getHours() < endHour){
            timeLeft = `now`;
        }else {
            timeLeft = `${hourLeft.toString().padStart(2, '0')}h : ${minuteLeft.toString().padStart(2, '0')}m : ${secondLeftRemaining.toString().padStart(2, '0')}s ago`;
        }
    }

    return (
        <p>{timeLeft}</p>
    );
};

export default TodoDeadlineCounter;