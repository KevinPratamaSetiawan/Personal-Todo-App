import React, { useState } from 'react';

type TodoDeadlineCounterProps = {
    deadlineStartTime: string;
    deadlineEndTime: string;
    isToday: boolean;
};

export default function TodoDeadlineCounter ({deadlineStartTime, deadlineEndTime, isToday}: TodoDeadlineCounterProps) {
    const now = new Date();
    const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
    const currentTotalSeconds = currentTotalMinutes * 60 + now.getSeconds();

    const [startHour, startMinute] = deadlineStartTime.split(':').map(Number);
    const [endHour, endMinute] = deadlineEndTime.split(':').map(Number);

    const deadlineStartTotalMinutes = startHour * 60 + startMinute;
    const deadlineEndTotalMinutes = endHour * 60 + endMinute;
    const deadlineStartTotalSeconds = deadlineStartTotalMinutes * 60;
    const deadlineEndTotalSeconds = deadlineEndTotalMinutes * 60;

    let secondsLeft = 0;
    let hoursLeft = 0;
    let minutesLeft = 0;
    let secondsLeftRemaining = 0;

    let opening = '';
    let closing = '';

    if (isToday) {
        if (currentTotalSeconds <= deadlineStartTotalSeconds) {
            secondsLeft = deadlineStartTotalSeconds - currentTotalSeconds;
            hoursLeft = Math.floor(secondsLeft / 3600);
            minutesLeft = Math.floor((secondsLeft % 3600) / 60);
            secondsLeftRemaining = secondsLeft % 60;

            opening = 'starts in ';
        } else if (currentTotalSeconds >= deadlineEndTotalSeconds) {
            secondsLeft = currentTotalSeconds - deadlineEndTotalSeconds;
            hoursLeft = Math.floor(secondsLeft / 3600);
            minutesLeft = Math.floor((secondsLeft % 3600) / 60);
            secondsLeftRemaining = secondsLeft % 60;

            opening = 'finished ';
            closing = ' ago';
        } else {
            secondsLeft = deadlineEndTotalSeconds - currentTotalSeconds;
            hoursLeft = Math.floor(secondsLeft / 3600);
            minutesLeft = Math.floor((secondsLeft % 3600) / 60);
            secondsLeftRemaining = secondsLeft % 60;

            opening = 'ends in ';
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