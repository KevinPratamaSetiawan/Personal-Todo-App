import React from 'react';
import { SubTask } from '../utils/props';
import TodoCopyButton from './TodoCopyButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck, faMinus, faPlus, faCircleXmark, faLink } from '@fortawesome/free-solid-svg-icons';

type TodoTaskProps = {
    todoId: string;
    subTasks: SubTask[];
    onToggleSubTask: (id: string, subtaskId: number) => void;
}

export default function TodoTask ({ todoId, subTasks, onToggleSubTask}: TodoTaskProps) {
    const currentTheme = localStorage.getItem('currentTheme') || 'mono';

    const getListIcon = (listStyle: string, status: boolean) => {
        let icon;

        switch (listStyle){
            case "plus":
                icon = <FontAwesomeIcon icon={status ? faPlus : faMinus} />;
                break;

            case "checkbox":
                icon = <FontAwesomeIcon icon={status ? faSquareCheck : faSquare} />;
                break;
            
            case "xcircle":
                icon = <FontAwesomeIcon icon={status ? faCircleXmark : faCircle} />;
                break;

            case "link":
                icon = <FontAwesomeIcon icon={faLink} size='xs' />;
                break;
                                        
            default:
                icon = null;
        }

        return icon;
    };

    let totalSubtask = 0, completedSubtask = 0;
    
    subTasks.map((task: SubTask) => (
        task.completed ? completedSubtask++ : null
    ));

    subTasks.map((task: SubTask) => (
        task.listStyle !== 'text' && 
        task.listStyle !== 'link' ? 
        totalSubtask++ : null
    ));

    return (
        <ul className='todo-description'>
            {totalSubtask !== 0 ? 
                <li className='subtask-counter'>
                    <p>Sub-Tasks</p>
                    <p>
                        <sup>{completedSubtask}</sup>/<sub>{totalSubtask}</sub> - {((completedSubtask/totalSubtask)*100).toString().slice(0, 4)}%
                        {
                            currentTheme === 'mono' ? null : completedSubtask !== totalSubtask ? '🔥' : '👏🎉'
                        }
                    </p>
                </li> : null
            }
            {Array.isArray(subTasks) && subTasks.map((task: SubTask) => (
                <li 
                key={task.id} 
                className={`${currentTheme === 'mono' ? 'mono-theme' : 'color-theme'}`}
                style={{
                    paddingLeft: `${task.indent * 21}px`,
                    marginTop: task.listStyle === 'text' && task.indent > 0 ? '-7px' : '',
                    marginBottom: task.listStyle === 'text' && task.indent > 0 ? '7px' : ''
                }}>
                    {
                        task.listStyle === 'link' ?
                            <button 
                            style={{
                                marginRight: '5px',
                                minWidth: '16px'
                            }}
                            >
                                {getListIcon(task.listStyle, task.completed)}
                            </button>
                        : task.listStyle !== 'text' ? 
                            <button 
                            onClick={() => onToggleSubTask(todoId, task.id)}
                            style={{
                                marginRight: '5px',
                                minWidth: '16px'
                            }}
                            >
                                {getListIcon(task.listStyle, task.completed)}
                            </button>
                        : null
                    }

                    {task.listStyle !== 'link' ? task.content :                         
                        <TodoCopyButton buttonText={task.content} />
                    }
                </li>
            ))}
        </ul>
    );
};