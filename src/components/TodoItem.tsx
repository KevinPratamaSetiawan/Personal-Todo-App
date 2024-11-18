import React, { useState, ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faCircleExclamation, faTrashCan, faAngleRight, faSquareCheck, faMinus, faPlus, faCopy, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import TodoDeadlineStats from './TodoDeadlineStats';
import TodoDeadlineCounter from './TodoDeadlineCounter';
import { formatDate } from '../utils/script';
import { todoItem, SubTask } from '../utils/props';

type TodoItemProps = {
    todoItem: todoItem;
    onToggleComplete: (id: string) => void;
    onTogglePriority: (id: string) => void;
    onDeleteTodo: (id: string) => void;
    onToggleSubTask: (id: string, subtaskId: number) => void;
}

export default function TodoItem ({todoItem, onToggleComplete, onTogglePriority, onDeleteTodo, onToggleSubTask}: TodoItemProps) {
    const [todoId, setTodoId] = React.useState<string | ReactNode>(todoItem.id);
    const currentTheme = localStorage.getItem('currentTheme') || 'mono';
    let isToday = todoItem.scheduleType === '[D]' ? true : false;
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const scheduleAlert = (scheduleType: string, deadlineStartDate: string) => {
        let todayAlert = ']';
        scheduleType = scheduleType.slice(0, -1);
        const days = [ 
                        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 
                        'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
                    ];
        
        let day = days.findIndex(day => deadlineStartDate.includes(day));
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        let todayDate = (today.getDate()).toString().padStart(2, '0') + '-' 
                    + (today.getMonth()+1).toString().padStart(2, '0') + '-' 
                    + (today.getFullYear()).toString();

        let tomorrowDate = (tomorrow.getDate()).toString().padStart(2, '0') + '-' 
                        + (tomorrow.getMonth()+1).toString().padStart(2, '0') + '-' 
                        + (tomorrow.getFullYear()).toString();
        
        if(deadlineStartDate !== 'noDeadlineStartDate' && day === -1){
            if(formatDate(deadlineStartDate, 'DD-MM-YY')!.includes(todayDate)){   
                todayAlert = '-TDY]';
                isToday = true;
            }else if(formatDate(deadlineStartDate, 'DD-MM-YY')!.includes(tomorrowDate)){ 
                todayAlert = '-TMW]';
            }
        }else if(day !== -1 && day%7 === today.getDay()){
            todayAlert = '-T]';
            isToday = true;
        }

        return scheduleType + todayAlert;
    };

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

    const onTodoFinishEventHandler = () => {
        onToggleComplete(todoItem.id);
    }

    const onTodoPriorityEventHandler = () => {
        onTogglePriority(todoItem.id);
    }

    const onTodoDeleteEventHandler = () => {
        onDeleteTodo(todoItem.id);
    }

    const onTodoToggleDetailEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const li = (event.target as HTMLElement).parentElement?.parentElement?.parentElement;
        const title   = li!.querySelector('.todo-title');
        const detail = li!.querySelector('.todo-detail');
        const summary = li!.querySelector('.todo-summary');

        const allTodoItems = document.querySelectorAll('.todo-item');

        allTodoItems.forEach(item => {
            const itemDetail = item.querySelector('.todo-detail');
            const itemSummary = item.querySelector('.todo-summary');
            const itemTitle = item.querySelector('.todo-title');

            if (item !== li && (itemDetail as HTMLElement).style.display === 'flex') {
                (itemDetail as HTMLElement).style.display = 'none';
                itemTitle!.classList.remove('open');
            }

            if(item !== li){
                itemSummary!.classList.add('disabled');
            }
        });

        if((detail as HTMLElement)!.style.display === 'none' || (detail as HTMLElement).style.display === ''){
            (detail as HTMLElement)!.style.display = 'flex';
            title!.classList.add('open');
            summary!.classList.remove('disabled');
        }else{
            (detail as HTMLElement)!.style.display = 'none';
            title!.classList.remove('open');

            allTodoItems.forEach(item => {
                const itemSummary = item.querySelector('.todo-summary');
                itemSummary!.classList.remove('disabled');
            });
        }
    }

    const onTodoCopyIdEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        let copyText = 
        todoItem.scheduleType + '=>' + 
        todoItem.title + ' => ' + 
        todoItem.description + '=>' + 
        (todoItem.subTask === 'no subtask' ? todoItem.subTask : JSON.stringify(todoItem.subTask)) + '=>' + 
        todoItem.deadlineStartDate + '=>' +
        todoItem.deadlineEndDate + '=>' +
        todoItem.deadlineStartTime + '=>' +
        todoItem.deadlineEndTime;

        navigator.clipboard.writeText(copyText);
        setTodoId(<><FontAwesomeIcon icon={faCopy} /> Copied!</>);
        
        setTimeout(function() {
            setTodoId(todoItem.id);
        }, 1000);
    }

    return (
        <>
        <Modal
            show={showModal}
            onHide={handleModalToggle}
            backdrop="static"
            centered
            keyboard={false}
            dialogClassName="custom-modal"
        >
            <Modal.Header className="bg-dark text-white">
            <Modal.Title>{todoId} · {todoItem.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
            Are you sure you want to delete this item ?
            </Modal.Body>
            <Modal.Footer className="bg-dark text-white">
            <Button variant="secondary" onClick={handleModalToggle}>
                Cancel
            </Button>
            <Button variant="danger" onClick={onTodoDeleteEventHandler}>Yes</Button>
            </Modal.Footer>
        </Modal>

        <li className='todo-item'>
            <div className='todo-summary'>
                <button onClick={onTodoFinishEventHandler}> {todoItem.completed ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faCircle} />} </button>
                <button onClick={onTodoPriorityEventHandler} className='priority-indicator'> {todoItem.priority ? <FontAwesomeIcon icon={faCircleExclamation} /> : <FontAwesomeIcon icon={faCircle} />} </button>
                <button onClick={onTodoToggleDetailEventHandler}><p className={`todo-title ${todoItem.completed ? 'completed' : ''}`}><span className='todo-schedule-display'>{ todoItem.schedule ? scheduleAlert(todoItem.scheduleType, todoItem.deadlineStartDate) : null }</span> { todoItem.title }</p></button>
                <button onClick={handleModalToggle}><FontAwesomeIcon icon={faTrashCan} /></button>
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
                            {Array.isArray(todoItem.subTask) && todoItem.subTask.map((task: SubTask) => (
                                <li 
                                key={task.id} 
                                className={
                                    `${task.listStyle === 'textIndentOne' ? 'text-indent-one' : 
                                        task.listStyle === 'textIndentTwo' ? 'text-indent-two' : 
                                        task.listStyle === 'textIndentThree' ? 'text-indent-three' : ''}
                                    ${currentTheme === 'mono' ? 'mono-theme' : 'color-theme'}`
                                    }>
                                    {task.listStyle !== '' && task.listStyle !== 'textIndentOne' && task.listStyle !== 'textIndentTwo' && task.listStyle !== 'textIndentThree' ?
                                    <button onClick={() => onToggleSubTask(todoItem.id, task.id)}>
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
                        <p className='todo-description no-string'>{todoItem.description}</p> 
                        : null 
                    }
                    </div>

                </div>
                {
                    todoItem.scheduleType !== '' ?
                    <TodoDeadlineStats 
                    scheduleType={todoItem.scheduleType}
                    deadlineStartDate={todoItem.deadlineStartDate}
                    deadlineEndDate={todoItem.deadlineEndDate}
                    deadlineStartTime={todoItem.deadlineStartTime}
                    deadlineEndTime={todoItem.deadlineEndTime}
                    />:
                    null
                }
                <div className='todo-deadline-copy'>
                    {
                        todoItem.scheduleType !== '' && isToday ?
                        <TodoDeadlineCounter 
                        deadlineStartTime={todoItem.deadlineStartTime}
                        deadlineEndTime={todoItem.deadlineEndTime}
                        isToday={isToday}
                        />:
                        null
                    }
                    <button onClick={onTodoCopyIdEventHandler} className='todo-id'><span>{ todoId }</span></button>
                </div>
            </div>
        </li>
        </>
    );
};