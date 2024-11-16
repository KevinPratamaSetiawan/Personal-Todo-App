import React, { useState } from 'react';
import { formatDate } from '../utils/script';

type TodoDeadlineStatsProps = {
    scheduleType: string;
    deadlineStartDate: string;
    deadlineEndDate: string;
    deadlineStartTime: string;
    deadlineEndTime: string;
}

export default function TodoDeadlineStats ({scheduleType, deadlineStartDate, deadlineEndDate, deadlineStartTime, deadlineEndTime}: TodoDeadlineStatsProps) {
    return (
        <div className='todo-deadline-detail'>
            {deadlineStartDate !== 'noDeadlineStartDate' ?
            <div className={`todo-detail-item ${deadlineStartDate === 'noDeadlineStartDate' ? 'no-string' : ''}`}>
                <p className='todo-deadline-stats-label'>{scheduleType === '[W]' ? 'Day' : (scheduleType === '[A]' ? 'Deadline Date' : 'Start Date')}</p>
                <span></span>
                <p>{deadlineStartDate !== 'noDeadlineStartDate' ? formatDate(deadlineStartDate, 'DD-MM-YY') : 'none'}</p>
            </div> : null}
            {deadlineStartTime !== 'noDeadlineStartTime' ? 
            <div className={`todo-detail-item ${deadlineStartTime === 'noDeadlineStartTime' ? 'no-string' : ''}`}>
                <p className='todo-deadline-stats-label'>{scheduleType === '[A]' ? 'Deadline Time' : 'Start Time'}</p>
                <span></span>
                <p>{deadlineStartTime !== 'noDeadlineStartTime' ? deadlineStartTime : 'none'}</p>
            </div> : null}
            {deadlineEndDate !== 'noDeadlineEndDate' ?
            <div className={`todo-detail-item ${deadlineEndDate === 'noDeadlineEndDate' ? 'no-string' : ''}`}>
                <p className='todo-deadline-stats-label'>End Date</p>
                <span></span>
                <p>{deadlineEndDate !== 'noDeadlineEndDate' ? formatDate(deadlineEndDate, 'DD-MM-YY') : 'none'}</p>
            </div> : null}
            {deadlineEndTime !== 'noDeadlineEndTime' ?
            <div className={`todo-detail-item ${deadlineEndTime === 'noDeadlineEndTime' ? 'no-string' : ''}`}>
                <p className='todo-deadline-stats-label'>End Time</p>
                <span></span>
                <p>{deadlineEndTime !== 'noDeadlineEndTime' ? deadlineEndTime : 'none'}</p>
            </div> : null}
        </div>
    );
};