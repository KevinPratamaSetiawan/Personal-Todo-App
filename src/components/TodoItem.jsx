import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faCircleExclamation, faTrashCan, faAngleRight, faSquareCheck, faMinus, faPlus, faCopy, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({todoItem, onToggleComplete, onTogglePriority, onDeleteTodo, onToggleSubTask}) => {
    const [todoId, setTodoId] = React.useState(todoItem.id);

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
            }else if(title.includes(tomorrowDate)){ 
                todayAlert = '-TMW]';
            }
        }else if(day !== -1 && day%7 === today.getDay()){
            todayAlert = '-T]';
        }

        return scheduleType + todayAlert;
    };

    const getListIcon = (listStyle, status) => {
        let icon;

        if(listStyle === "plusIndentOne"){
            if(status){
                icon = <FontAwesomeIcon icon={faPlus} className="todo-list-dash todo-list-indent-one" />;
            }else{
                icon = <FontAwesomeIcon icon={faMinus} className="todo-list-dash todo-list-indent-one" />;
            }
        }else if(listStyle === "plusIndentTwo"){
            if(status){
                icon = <FontAwesomeIcon icon={faPlus} className="todo-list-dash todo-list-indent-two" />;
            }else{
                icon = <FontAwesomeIcon icon={faMinus} className="todo-list-dash todo-list-indent-two" />;
            }
        }else if(listStyle === "plusIndentThree"){
            if(status){
                icon = <FontAwesomeIcon icon={faPlus} className="todo-list-dash todo-list-indent-three" />;
            }else{
                icon = <FontAwesomeIcon icon={faMinus} className="todo-list-dash todo-list-indent-three" />;
            }
        }else if(listStyle === "checkboxIndentOne"){
            if(status){
                icon = <FontAwesomeIcon icon={faSquareCheck} className="todo-list-checkbox todo-list-indent-one" />;
            }else{
                icon = <FontAwesomeIcon icon={faSquare} className="todo-list-checkbox todo-list-indent-one" />;
            }
        }else if(listStyle === "checkboxIndentTwo"){
            if(status){
                icon = <FontAwesomeIcon icon={faSquareCheck} className="todo-list-checkbox todo-list-indent-two" />;
            }else{
                icon = <FontAwesomeIcon icon={faSquare} className="todo-list-checkbox todo-list-indent-two" />;
            }
        }else if(listStyle === "checkboxIndentThree"){
            if(status){
                icon = <FontAwesomeIcon icon={faSquareCheck} className="todo-list-checkbox todo-list-indent-three" />;
            }else{
                icon = <FontAwesomeIcon icon={faSquare} className="todo-list-checkbox todo-list-indent-three" />;
            }
        }else if(listStyle === "xcircleIndentOne"){
            if(status){
                icon = <FontAwesomeIcon icon={faCircleXmark} className="todo-list-circle todo-list-indent-one" />;
            }else{
                icon = <FontAwesomeIcon icon={faCircle} className="todo-list-circle todo-list-indent-one" />;
            }
        }else if(listStyle === "xcircleIndentTwo"){
            if(status){
                icon = <FontAwesomeIcon icon={faCircleXmark} className="todo-list-circle todo-list-indent-two" />;
            }else{
                icon = <FontAwesomeIcon icon={faCircle} className="todo-list-circle todo-list-indent-two" />;
            }
        }else if(listStyle === "xcircleIndentThree"){
            if(status){
                icon = <button><FontAwesomeIcon icon={faCircleXmark} className="todo-list-circle todo-list-indent-three" /></button>;
            }else{
                icon = <FontAwesomeIcon icon={faCircle} className="todo-list-circle todo-list-indent-three" />;
            }
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
        const summary = li.querySelector('.todo-title');
        const detail = li.querySelector('.todo-detail');

        const allTodoItems = document.querySelectorAll('.todo-item');

        allTodoItems.forEach(item => {
            const itemDetail = item.querySelector('.todo-detail');
            const itemSummary = item.querySelector('.todo-title');

            if (item !== li && itemDetail.style.display === 'flex') {
                itemDetail.style.display = 'none';
                itemSummary.classList.remove('open');
            }
        });

        if(detail.style.display === 'none' || detail.style.display === ''){
            detail.style.display = 'flex';
            summary.classList.add('open');
        }else{
            detail.style.display = 'none';
            summary.classList.remove('open');
        }
    }

    const onTodoCopyIdEventHandler = (event) => {
        let copyText = todoItem.scheduleType + '=>' + todoItem.title + ' => ' + todoItem.description + '=>' + JSON.stringify(todoItem.subTask);

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
                <button onClick={onTodoToggleDetailEventHandler}><p className={`todo-title ${todoItem.completed ? 'completed' : ''}`}><span>{ todoItem.schedule ? scheduleAlert(todoItem.scheduleType, todoItem.title) : null }</span> { todoItem.title }</p></button>
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
                        <p className='todo-description'>{todoItem.description}</p> 
                        : null 
                    }
                    { 
                        todoItem.subTask !== "no subtask" ? 
                        <ul className='todo-description'>
                            {todoItem.subTask.map((task) => (
                                <li key={task.id}>
                                    <button onClick={() => onToggleSubTask(todoId, task.id)}>
                                        {getListIcon(task.listStyle, task.completed)}
                                    </button>
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
                <button onClick={onTodoCopyIdEventHandler}><span className='todo-id'>{ todoId }</span></button>
            </div>
        </li>
    );
};

export default TodoItem;