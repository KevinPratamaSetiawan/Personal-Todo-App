import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFloppyDisk, faCheckSquare, faChartGantt } from '@fortawesome/free-solid-svg-icons';

const TodoNav = ({currentTab, setTab}) => {
    const openTimeTab = () => { setTab('time'); };

    const openAddTab = () => { setTab('add'); };

    const openStatsTab = () => { setTab('stats'); };

    const openSaveTab = () => { setTab('save'); };

    return (
        <div className='todo-nav'>
            <button onClick={openTimeTab} className={`${currentTab === 'time' ? 'current-tab' : ''}`}><FontAwesomeIcon icon={faClock} /></button>
            <button onClick={openAddTab} className={`${currentTab === 'add' ? 'current-tab' : ''}`}><FontAwesomeIcon icon={faCheckSquare} /></button>
            <button onClick={openStatsTab} className={`${currentTab === 'stats' ? 'current-tab' : ''}`}><FontAwesomeIcon icon={faChartGantt} /></button>
            <button onClick={openSaveTab} className={`${currentTab === 'save' ? 'current-tab' : ''}`}><FontAwesomeIcon icon={faFloppyDisk} /></button>
        </div>
    );
};

export default TodoNav;