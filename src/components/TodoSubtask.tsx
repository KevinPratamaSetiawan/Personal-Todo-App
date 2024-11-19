import React from 'react';
import { SubTask } from '../utils/props';
import TodoCopyButton from './TodoCopyButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck, faMinus, faPlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

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
            case "plusIndentOne":
                icon = <FontAwesomeIcon icon={status ? faPlus : faMinus} className="todo-list-dash todo-list-indent-one" />;
                break;

            case "plusIndentTwo":
                icon = <FontAwesomeIcon icon={status ? faPlus : faMinus} className="todo-list-dash todo-list-indent-two" />;
                break;
            
            case "plusIndentThree":
                icon = <FontAwesomeIcon icon={status ? faPlus : faMinus} className="todo-list-dash todo-list-indent-three" />;
                break;
            
            case "checkboxIndentOne":
                icon = <FontAwesomeIcon icon={status ? faSquareCheck : faSquare} className="todo-list-checkbox todo-list-indent-one" />;
                break;
            
            case "checkboxIndentTwo":
                icon = <FontAwesomeIcon icon={status ? faSquareCheck : faSquare} className="todo-list-checkbox todo-list-indent-two" />;
                break;
                
            case "checkboxIndentThree":
                icon = <FontAwesomeIcon icon={status ? faSquareCheck : faSquare} className="todo-list-checkbox todo-list-indent-three" />;
                break;
            
            case "xcircleIndentOne":
                icon = <FontAwesomeIcon icon={status ? faCircleXmark : faCircle} className="todo-list-circle todo-list-indent-one" />;
                break;
                                        
            case "xcircleIndentTwo":
                icon = <FontAwesomeIcon icon={status ? faCircleXmark : faCircle} className="todo-list-circle todo-list-indent-two" />;
                break;
                                    
            case "xcircleIndentThree":
                icon = <FontAwesomeIcon icon={status ? faCircleXmark : faCircle} className="todo-list-circle todo-list-indent-three" />;
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
        task.listStyle !== '' && 
        task.listStyle !== 'textIndentOne' && 
        task.listStyle !== 'textIndentTwo' && 
        task.listStyle !== 'textIndentThree' && 
        task.listStyle !== 'linkIndentZero' &&
        task.listStyle !== 'linkIndentOne' && 
        task.listStyle !== 'linkIndentTwo' && 
        task.listStyle !== 'linkIndentThree' ? 
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
                className={`${task.listStyle === 'textIndentOne' ? 'text-indent-one' : task.listStyle === 'textIndentTwo' ? 'text-indent-two' : task.listStyle === 'textIndentThree' ? 'text-indent-three' : ''} ${task.listStyle === 'linkIndentZero' ? 'link-indent-zero' : task.listStyle === 'linkIndentOne' ? 'link-indent-one' : task.listStyle === 'linkIndentTwo' ? 'link-indent-two' : task.listStyle === 'linkIndentThree' ? 'link-indent-three' : ''} ${currentTheme === 'mono' ? 'mono-theme' : 'color-theme'}`}>
                    {task.listStyle !== '' && 
                        task.listStyle !== 'textIndentOne' && 
                        task.listStyle !== 'textIndentTwo' && 
                        task.listStyle !== 'textIndentThree' && 
                        task.listStyle !== 'linkIndentZero' &&
                        task.listStyle !== 'linkIndentOne' && 
                        task.listStyle !== 'linkIndentTwo' && 
                        task.listStyle !== 'linkIndentThree' ?

                    <button onClick={() => onToggleSubTask(todoId, task.id)}>
                        {getListIcon(task.listStyle, task.completed)}
                    </button> : null}
                    {
                        task.listStyle !== 'linkIndentZero' &&
                        task.listStyle !== 'linkIndentOne' && 
                        task.listStyle !== 'linkIndentTwo' && 
                        task.listStyle !== 'linkIndentThree' 
                        ?
                        task.content 
                        : 
                        <>
                            # <TodoCopyButton
                                buttonText={task.content}
                            />
                        </>
                    }
                </li>
            ))}
        </ul>
    );
};