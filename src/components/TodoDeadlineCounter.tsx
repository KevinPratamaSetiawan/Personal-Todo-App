import React, { useState } from 'react';

type TodoDeadlineCounterProps = {
    scheduleType: string;
    deadlineStartDate: string;
    deadlineEndDate: string;
    deadlineStartTime: string;
    deadlineEndTime: string;
    isToday: boolean;
};

export default function TodoDeadlineCounter ({ scheduleType, deadlineStartDate, deadlineEndDate, deadlineStartTime, deadlineEndTime, isToday}: TodoDeadlineCounterProps) {
    const now = new Date().getTime();
    const localDate = new Date();
    const today = `${localDate.getFullYear()}-${(localDate.getMonth() + 1).toString().padStart(2, '0')}-${localDate.getDate().toString().padStart(2, '0')}`;
    let deadlineStart = new Date(`${deadlineStartDate}T${deadlineStartTime}:00`).getTime();
    let deadlineEnd = new Date(`${deadlineEndDate}T${deadlineEndTime}:00`).getTime();

    if (scheduleType === '[D]' || scheduleType === '[W]'){
        deadlineStart = new Date(`${today}T${deadlineStartTime}:00`).getTime();
        deadlineEnd = new Date(`${today}T${deadlineEndTime}:00`).getTime();
    }else if (scheduleType === '[A]'){
        deadlineStart = new Date(`${today}T${deadlineStartTime}:00`).getTime();
        deadlineEnd = deadlineStart;
    }

    let msGap = 0, secondsLeft = 0, hoursLeft = 0, minutesLeft = 0, secondsLeftRemaining = 0; 

    let opening = '';
    let closing = '';

    if (isToday) {
        if (now <= deadlineStart) {
            msGap = deadlineStart - now;

            if(scheduleType !== '[A]'){
                opening = 'starts in ';
            }else{
                opening = 'ends in ';
            }
        } else if (now >= deadlineEnd) {
            msGap = now - deadlineEnd;
            opening = 'finished ';
            closing = ' ago';
        } else {
            msGap = deadlineEnd - now;
            opening = 'ends in ';
        }

        secondsLeft = Math.floor(msGap/1000)
        hoursLeft = Math.floor(secondsLeft / 3600);
        minutesLeft = Math.floor((secondsLeft % 3600) / 60);
        secondsLeftRemaining = secondsLeft % 60;
    }

    return (
        <p className='todo-deadline-counter'>
            {opening} 
            <span>{hoursLeft.toString().padStart(2, '0')}</span>h : <span>{minutesLeft.toString().padStart(2, '0')}</span>m : <span>{secondsLeftRemaining.toString().padStart(2, '0')}</span>s 
            {closing}
        </p>
    );
};