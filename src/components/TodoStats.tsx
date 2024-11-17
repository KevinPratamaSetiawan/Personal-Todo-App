import React from 'react';
import TodoNav from './TodoNav';
import { todoItem, SubTask } from '../utils/props';

type TodoStatsProps = {
    todosData: todoItem[];
    setTab: (tab: string) => void;
}

export default function TodoStats ({ todosData, setTab }: TodoStatsProps) {
    const getTypeLength = (listType: string) => {
        return todosData.filter((item) => {
            if (listType === 'schedule' && !item.completed && item.schedule) {
                return true;
            } else if (listType === 'priority' && !item.completed && item.priority && !item.schedule) {
                return true;
            } else if (listType === 'task' && !item.completed && !item.priority && !item.schedule) {
                return true;
            } else if (listType === 'completed' && item.completed) {
                return true;
            }
            return false;
        }).length
    };

    return (
        <div className='todo-stats'>
            <div>
                <p className='nav-title'>Stats</p>
                <TodoNav 
                    currentTab={'stats'}
                    setTab={setTab}
                />
            </div>
            <div>
                <div className='total-stats'>
                    <p>Total: {todosData.length.toString().padStart(3, '0')}</p>
                    <div className='todo-ratio-container progress'>
                        <div id="schedule-ratio" className='schedule-ratio ratio-item progress-bar progress-bar-striped progress-bar-animated' style={{ width: `${getTypeLength('schedule') / todosData.length * 100}%` }}></div>
                        <div id="priority-ratio" className='priority-ratio ratio-item progress-bar progress-bar-striped progress-bar-animated' style={{ width: `${getTypeLength('priority') / todosData.length * 100}%` }}></div>
                        <div id="task-ratio" className='task-ratio ratio-item progress-bar progress-bar-striped progress-bar-animated' style={{ width: `${getTypeLength('task') / todosData.length * 100}%` }}></div>
                        <div id="complete-ratio" className='complete-ratio ratio-item progress-bar progress-bar-striped progress-bar-animated' style={{ width: `${getTypeLength('completed') / todosData.length * 100}%` }}></div>
                    </div>
                </div>
                <div className='fraction-stats'>
                    <div className='stats-item'>
                        <p className='stats-percent'>{(getTypeLength('schedule') / todosData.length * 100).toString().slice(0, 4)}%</p>
                        <p className='schedule-ratio stats-title'>Schedule: <span>{getTypeLength('schedule').toString().padStart(3, '0')}</span></p>
                    </div>
                    <div className='stats-item'>
                        <p className='stats-percent'>{(getTypeLength('priority') / todosData.length * 100).toString().slice(0, 4)}%</p>
                        <p className='priority-ratio stats-title'>Priority: <span>{getTypeLength('priority').toString().padStart(3, '0')}</span></p>
                    </div>
                </div>
                <div className='fraction-stats'>
                    <div className='stats-item'>
                        <p className='stats-percent'>{(getTypeLength('task') / todosData.length * 100).toString().slice(0, 4)}%</p>
                        <p className='task-ratio stats-title'>Task: <span>{getTypeLength('task').toString().padStart(3, '0')}</span></p>
                    </div>
                    <div className='stats-item'>
                        <p className='stats-percent'>{(getTypeLength('completed') / todosData.length * 100).toString().slice(0, 4)}%</p>
                        <p className='complete-ratio stats-title'>Completed: <span>{getTypeLength('completed').toString().padStart(3, '0')}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};