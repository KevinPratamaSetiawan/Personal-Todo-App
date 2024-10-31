import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';

import TodoNav from './TodoNav';

const TodoTime = ({ today, currentTime, setTab }) => {
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const todayDay = dayName[today.getDay()];
    const todayDate = today.getDate().toString().padStart(2, '0');
    const todayMonth = monthName[today.getMonth()];
    const todayYear = today.getFullYear().toString().slice(2);

    return (
        <div className='todo-time'>
            <div>
                <p className='time-day nav-title'>{todayDay}</p>
                <TodoNav 
                    currentTab={'time'}
                    setTab={setTab}
                />
            </div>
            <div>
                <div>
                    <p className='time-date'>{todayDate}</p>
                    <p className='time-month'>{todayMonth} <span> </span> '{todayYear}</p>
                </div>
                <div>
                    <p className='time-clock'>{currentTime}</p>
                </div>
            </div>
        </div>
    );
};

export default TodoTime;