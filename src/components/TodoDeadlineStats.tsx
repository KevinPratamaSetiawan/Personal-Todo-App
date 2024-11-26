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
            <div className={`todo-detail-item`}>
                <p className='todo-deadline-stats-label'>Type</p>
                <span></span>
                <p>
                    {scheduleType}
                    <span className='todo-deadline-stats-label'> → </span>
                    {
                        scheduleType === '[D]' ? 'Daily' :
                        scheduleType === '[W]' ? 'Weekly' : 
                        scheduleType === '[Y]' ? 'Yearly' :
                        scheduleType === '[A]' ? 'Assignment' :
                        scheduleType === '[S]' ? 'Scheduled' : 'Custom'
                    }
                </p>
            </div>
            {deadlineStartDate !== 'noDeadlineStartDate' ?
            <div className={`todo-detail-item`}>
                <p className='todo-deadline-stats-label'>{scheduleType === '[W]' ? 'Day' : (scheduleType === '[A]' ? 'Deadline Date' : 'Date')}</p>
                <span></span>
                <p>
                    {deadlineStartDate === 'noDeadlineStartDate' ? null : scheduleType === '[Y]' ? 
                        formatDate(deadlineStartDate, 'DD MMM')
                    : scheduleType === '[A]' ? 
                        formatDate(deadlineStartDate, 'dddd, DD MMM YY')
                    :
                        formatDate(deadlineStartDate, 'dddd, DD MMM')
                    }

                    {deadlineEndDate === 'noDeadlineEndDate' ? null : scheduleType === '[Y]' ? 
                    <>
                        <span className='todo-deadline-stats-label'> → </span> {formatDate(deadlineEndDate, 'DD MMM')}
                    </> : <>
                        <span className='todo-deadline-stats-label'> → </span> {formatDate(deadlineEndDate, 'DD MMM YY')}
                    </>}
                </p>
            </div> : null}
            {deadlineStartTime !== 'noDeadlineStartTime' ? 
            <div className={`todo-detail-item`}>
                <p className='todo-deadline-stats-label'>{scheduleType === '[A]' ? 'Deadline Time' : 'Time'}</p>
                <span></span>
                <p>
                    {deadlineStartTime !== 'noDeadlineStartTime' ? deadlineStartTime : null}
                    {deadlineEndTime !== 'noDeadlineEndTime' ? <><span className='todo-deadline-stats-label'> → </span> {deadlineEndTime}</> : null}
                </p>
            </div> : null}
        </div>
    );
};