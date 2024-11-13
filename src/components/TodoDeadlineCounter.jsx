import React, { useState } from 'react';

import { formatDate } from '../utils/script';

const TodoDeadlineCounter = ({deadlineStartTime, deadlineEndTime, isToday}) => {
    const now = new Date();
    const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
    const currentTotalSeconds = currentTotalMinutes * 60 + now.getSeconds();

    const [startHour, startMinute] = deadlineStartTime.split(':').map(Number);
    const [endHour, endMinute] = deadlineEndTime.split(':').map(Number);

    const deadlineStartTotalMinutes = startHour * 60 + startMinute;
    const deadlineEndTotalMinutes = endHour * 60 + endMinute;
    const deadlineStartTotalSeconds = deadlineStartTotalMinutes * 60;
    const deadlineEndTotalSeconds = deadlineEndTotalMinutes * 60;

    let secondsLeft, hoursLeft, minutesLeft, secondsLeftRemaining = 0;

    let timeLeft = '';
    let opening = '';
    let closing = '';

    if (isToday) {
        if (currentTotalSeconds <= deadlineStartTotalSeconds) {
            secondsLeft = deadlineStartTotalSeconds - currentTotalSeconds;
            hoursLeft = Math.floor(secondsLeft / 3600);
            minutesLeft = Math.floor((secondsLeft % 3600) / 60);
            secondsLeftRemaining = secondsLeft % 60;

            opening = 'starts in ';

            // timeLeft = `starts in ${hoursLeft.toString().padStart(2, '0')}h : ${minutesLeft.toString().padStart(2, '0')}m : ${secondsLeftRemaining.toString().padStart(2, '0')}s`;
        } else if (currentTotalSeconds >= deadlineEndTotalSeconds) {
            secondsLeft = currentTotalSeconds - deadlineEndTotalSeconds;
            hoursLeft = Math.floor(secondsLeft / 3600);
            minutesLeft = Math.floor((secondsLeft % 3600) / 60);
            secondsLeftRemaining = secondsLeft % 60;

            opening = 'finished ';
            closing = ' ago';

            // timeLeft = `finished ${hoursLeft.toString().padStart(2, '0')}h : ${minutesLeft.toString().padStart(2, '0')}m : ${secondsLeftRemaining.toString().padStart(2, '0')}s ago`;
        } else {
            secondsLeft = deadlineEndTotalSeconds - currentTotalSeconds;
            hoursLeft = Math.floor(secondsLeft / 3600);
            minutesLeft = Math.floor((secondsLeft % 3600) / 60);
            secondsLeftRemaining = secondsLeft % 60;

            opening = 'ends in ';

            // timeLeft = `ends in ${hoursLeft.toString().padStart(2, '0')}h : ${minutesLeft.toString().padStart(2, '0')}m : ${secondsLeftRemaining.toString().padStart(2, '0')}s`;
        }
    }

    return (
        <p className='todo-deadline-counter'>
            {opening} 
            <span>{hoursLeft.toString().padStart(2, '0')}</span>h : <span>{minutesLeft.toString().padStart(2, '0')}</span>m : <span>{secondsLeftRemaining.toString().padStart(2, '0')}</span>s 
            {closing}
        </p>
    );
};

export default TodoDeadlineCounter;