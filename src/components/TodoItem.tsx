import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faCircleCheck, faCircleExclamation, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';

import { todoItem } from '../utils/props';
import TodoDeadlineCounter from './TodoDeadlineCounter';
import TodoDeadlineStats from './TodoDeadlineStats';
import TodoItemOptionButton from './TodoItemOptionButton';
import TodoTask from './TodoSubtask';

type TodoItemProps = {
    todoItem: todoItem;
    onToggleComplete: (id: string) => void;
    onTogglePriority: (id: string) => void;
    onEditTodo: (id: string, edittedObject: todoItem) => void;
    onDeleteTodo: (id: string) => void;
    onToggleSubTask: (id: string, subtaskId: number) => void;
}

export default function TodoItem ({todoItem, onToggleComplete, onTogglePriority, onEditTodo, onDeleteTodo, onToggleSubTask}: TodoItemProps) {
    const [todoId, setTodoId] = React.useState<string | ReactNode>(todoItem.id);
    let isToday = false;

    const scheduleAlert = (scheduleType: string, deadlineStartDate: string, deadlineEndDate: string) => {
        let todayAlert = ']';
        scheduleType = scheduleType.slice(0, -1);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        if(scheduleType === '[D'){
            todayAlert = '-T]';
            isToday = true;
        }else if (scheduleType === '[W'){
            const today = new Date().getDay();
            let day = days.findIndex(day => deadlineStartDate.includes(day));
            
            if(day !== -1 && day === today){
                todayAlert = '-T]';
                isToday = true;
            }
        }else if (scheduleType === '[A'){
            const now = new Date().getTime();
            const deadlineStart = new Date(`${deadlineStartDate}T23:59:59`).getTime();

            if (now <= deadlineStart){
                todayAlert = '-DUE]';
                isToday = true;
            }
        }else if (scheduleType !== '[D' && scheduleType !== '[W' && scheduleType !== '[A'){
            const now = new Date().getTime();
            const deadlineStart = new Date(`${deadlineStartDate}T00:00:01`).getTime();
            const deadlineEnd = new Date(`${deadlineEndDate}T23:59:59`).getTime();

            if (now >= deadlineStart && now <= deadlineEnd){
                todayAlert = '-TDY]';
                isToday = true;
            }
        }

        return scheduleType + todayAlert;
    };

    const onTodoFinishEventHandler = () => {
        onToggleComplete(todoItem.id);
    }

    const onTodoPriorityEventHandler = () => {
        onTogglePriority(todoItem.id);
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
        todoId + '=>' + 
        todoItem.scheduleType + '=>' + 
        todoItem.title + ' => ' + 
        todoItem.description + '=>' + 
        (todoItem.subTask.length === 0 ? 'noSubtask' : JSON.stringify(todoItem.subTask)) + '=>' + 
        todoItem.deadlineStartDate + '=>' +
        todoItem.deadlineEndDate + '=>' +
        todoItem.deadlineStartTime + '=>' +
        todoItem.deadlineEndTime + '=>' +
        todoItem.tags;

        navigator.clipboard.writeText(copyText);
        setTodoId(<><FontAwesomeIcon icon={faCopy} /> Copied!</>);
        
        setTimeout(function() {
            setTodoId(todoItem.id);
        }, 1000);
    }

    return (
        <>
        <li className='todo-item'>
            <div className='todo-summary'>
                <button onClick={onTodoFinishEventHandler}> {todoItem.completed ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faCircle} />} </button>
                <button onClick={onTodoPriorityEventHandler} className='priority-indicator'> {todoItem.priority ? <FontAwesomeIcon icon={faCircleExclamation} /> : <FontAwesomeIcon icon={faCircle} />} </button>
                <button onClick={onTodoToggleDetailEventHandler}><p className={`todo-title ${todoItem.completed ? 'completed' : ''}`}><span className='todo-schedule-display'>{ todoItem.schedule ? scheduleAlert(todoItem.scheduleType, todoItem.deadlineStartDate, todoItem.deadlineEndDate) : null }</span> { todoItem.title }</p></button>
                <TodoItemOptionButton 
                    todoItem={todoItem}
                    onEditTodo={onEditTodo}
                    onDeleteTodo={onDeleteTodo} 
                />
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
                        <p className={`todo-description ${todoItem.subTask.length !== 0 ? 'divider' : ''}`}>{todoItem.description}</p> 
                        : null 
                    }
                    { 
                        todoItem.subTask.length !== 0 ? 
                         <TodoTask
                         todoId={todoItem.id}
                         subTasks={todoItem.subTask}
                         onToggleSubTask={onToggleSubTask}
                         />
                        : null 
                    }
                    { 
                        todoItem.description === "no description" && todoItem.subTask.length === 0 ? 
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
                        scheduleType={todoItem.scheduleType}
                        deadlineStartDate={todoItem.deadlineStartDate}
                        deadlineEndDate={todoItem.deadlineEndDate}
                        deadlineStartTime={todoItem.deadlineStartTime}
                        deadlineEndTime={todoItem.deadlineEndTime}
                        isToday={isToday}
                        />:
                        null
                    }
                    <button onClick={onTodoCopyIdEventHandler} className='todo-id'><span className='text-white'>{ todoId }</span></button>
                </div>
            </div>
        </li>
        </>
    );
};