import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faCircleExclamation, faTrashCan, faAngleRight, faSquareCheck, faMinus, faPlus, faCopy, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import DeadlineTime from './DeadlineTime';

const TodoItem = ({todoItem, onToggleComplete, onTogglePriority, onDeleteTodo, onToggleSubTask}) => {
    const [todoId, setTodoId] = React.useState(todoItem.id);
    const currentTheme = localStorage.getItem('currentTheme') || 'mono';
    let isToday = false;

    const scheduleAlert = (scheduleType, title) => {
        let todayAlert = ']';
        scheduleType = scheduleType.slice(0, -1);
        const days = [ 
                        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 
                        'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
                    ];
        
        let day = days.findIndex(day => title.includes(day));
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        let todayDate = (today.getDate()).toString().padStart(2, '0') + '-' 
                    + (today.getMonth()+1).toString().padStart(2, '0') + '-' 
                    + (today.getFullYear()).toString().slice(-2);

        let tomorrowDate = (tomorrow.getDate()).toString().padStart(2, '0') + '-' 
                        + (tomorrow.getMonth()+1).toString().padStart(2, '0') + '-' 
                        + (tomorrow.getFullYear()).toString().slice(-2);
        
        if(title.match(/\b(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{2}\b/)){
            if(title.includes(todayDate)){   
                todayAlert = '-TDY]';
                isToday = true;
            }else if(title.includes(tomorrowDate)){ 
                todayAlert = '-TMW]';
            }
        }else if(day !== -1 && day%7 === today.getDay()){
            todayAlert = '-T]';
            isToday = true;
        }

        return scheduleType + todayAlert;
    };

    const getListIcon = (listStyle, status) => {
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

    const onTodoFinishEventHandler = () => {
        onToggleComplete(todoItem.id);
    }

    const onTodoPriorityEventHandler = () => {
        onTogglePriority(todoItem.id);
    }

    const onTodoDeleteEventHandler = () => {
        onDeleteTodo(todoItem.id);
    }

    const onTodoToggleDetailEventHandler = (event) => {
        const li = event.target.parentElement.parentElement.parentElement;
        const title  = li.querySelector('.todo-title');
        const detail = li.querySelector('.todo-detail');
        const summary = li.querySelector('.todo-summary');

        const allTodoItems = document.querySelectorAll('.todo-item');

        allTodoItems.forEach(item => {
            const itemDetail = item.querySelector('.todo-detail');
            const itemSummary = item.querySelector('.todo-summary');
            const itemTitle = item.querySelector('.todo-title');

            if (item !== li && itemDetail.style.display === 'flex') {
                itemDetail.style.display = 'none';
                itemTitle.classList.remove('open');
            }

            if(item !== li){
                itemSummary.classList.add('disabled');
            }
        });

        if(detail.style.display === 'none' || detail.style.display === ''){
            detail.style.display = 'flex';
            title.classList.add('open');
            summary.classList.remove('disabled');
        }else{
            detail.style.display = 'none';
            title.classList.remove('open');

            allTodoItems.forEach(item => {
                const itemSummary = item.querySelector('.todo-summary');
                itemSummary.classList.remove('disabled');
            });
        }
    }

    const onTodoCopyIdEventHandler = (event) => {
        let copyText = todoItem.scheduleType + '=>' + todoItem.title + ' => ' + todoItem.description + '=>' + (todoItem.subTask === 'no subtask' ? todoItem.subTask : JSON.stringify(todoItem.subTask)) + '=>' + todoItem.deadlineTime;

        navigator.clipboard.writeText(copyText);
        setTodoId(<><FontAwesomeIcon icon={faCopy} /> Copied!</>);
        
        setTimeout(function() {
            setTodoId(todoItem.id);
        }, 1000);
    }

    return (
        <li className='todo-item'>
            <div className='todo-summary'>
                <button onClick={onTodoFinishEventHandler}> {todoItem.completed ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faCircle} />} </button>
                <button onClick={onTodoPriorityEventHandler} className='priority-indicator'> {todoItem.priority ? <FontAwesomeIcon icon={faCircleExclamation} /> : <FontAwesomeIcon icon={faCircle} />} </button>
                <button onClick={onTodoToggleDetailEventHandler}><p className={`todo-title ${todoItem.completed ? 'completed' : ''}`}><span className='todo-schedule-display'>{ todoItem.schedule ? scheduleAlert(todoItem.scheduleType, todoItem.title) : null }</span> { todoItem.title }</p></button>
                <button onClick={onTodoDeleteEventHandler}><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
            <div className='todo-detail'>
                <div className='todo-description-container'>
                    <span>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <FontAwesomeIcon icon={faAngleRight} />
                        <FontAwesomeIcon icon={faAngleRight} />
                    </span>
                    <div className='todo-description-subtask'>
                    { 
                        todoItem.description !== "no description" ? 
                        <p className={`todo-description ${todoItem.subTask !== "no subtask" ? 'divider' : ''}`}>{todoItem.description}</p> 
                        : null 
                    }
                    { 
                        todoItem.subTask !== "no subtask" ? 
                        <ul className='todo-description'>
                            {todoItem.subTask.map((task) => (
                                <li 
                                key={task.id} 
                                className={
                                    `${task.listStyle === 'textIndentOne' ? 'text-indent-one' : 
                                        task.listStyle === 'textIndentTwo' ? 'text-indent-two' : 
                                        task.listStyle === 'textIndentThree' ? 'text-indent-three' : ''}
                                    ${currentTheme === 'mono' ? 'mono-theme' : 'color-theme'}`
                                    }>
                                    {task.listStyle !== '' && task.listStyle !== 'textIndentOne' && task.listStyle !== 'textIndentTwo' && task.listStyle !== 'textIndentThree' ?
                                    <button onClick={() => onToggleSubTask(todoId, task.id)}>
                                        {getListIcon(task.listStyle, task.completed)}
                                    </button>
                                    : null}
                                    {task.content}
                                </li>
                            ))}
                        </ul> 
                        : null 
                    }
                    { 
                        todoItem.description === "no description" && todoItem.subTask === "no subtask" ? 
                        <p className='todo-description'>{todoItem.description}</p> 
                        : null 
                    }
                    </div>

                </div>
                <div className='todo-deadline-copy'>
                    {
                        todoItem.deadlineTime !== 'no deadline' ?
                        <DeadlineTime 
                        deadlineTimeData={todoItem.deadlineTime}
                        isToday={isToday}
                        />:
                        null
                    }
                    <button onClick={onTodoCopyIdEventHandler} className='todo-id'><span>{ todoId }</span></button>
                </div>
            </div>
        </li>
    );
};

export default TodoItem;