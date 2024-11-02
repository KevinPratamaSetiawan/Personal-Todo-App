import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faToggleOn, faPaste, faSquareCheck, faCircleXmark, faListCheck, faX, faSquareXmark } from '@fortawesome/free-solid-svg-icons';

import TodoNav from './TodoNav';

const TodoForm = ({ onAddTodo, setTab }) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [subTask, setSubTask] = React.useState([]);
    const [scheduleType, setScheduleType] = React.useState('');
    const [customScheduleType, setCustomScheduleType] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [deadlineTimeHour, setDeadlineTimeHour] = React.useState(new Date().getHours() % 12 || 12);
    const [deadlineTimeMinute, setDeadlineTimeMinute] = React.useState(new Date().getMinutes());
    const [meridiemType, setMeridiemType] = React.useState(new Date().getHours() > 12 ? 'PM' : 'PM');

    const onTitleChangeEventHandler = (event) => {
        setTitle(event.target.value);
    };

    const onDescriptionChangeEventHandler = (event) => {
        setDescription(event.target.value);
    };

    const addSubTask = () => {
        setSubTask(prevSubTask => [
            ...prevSubTask, 
            { id: prevSubTask.length, content: "", completed: false, listStyle: "" }
        ]);
    };

    const delSubTask = (event, index) => {
        const updatedSubTasks = [...subTask];
        updatedSubTasks.splice(index, 1);
        setSubTask(updatedSubTasks);
    };

    const onSubTaskContentChangeEventHandler = (event, index) => {
        const updatedSubTasks = [...subTask];
        updatedSubTasks[index].content = event.target.value;
        setSubTask(updatedSubTasks);
    };

    const onSubTaskListStyleChangeEventHandler = (event, index) => {
        const updatedSubTasks = [...subTask];
        updatedSubTasks[index].listStyle = event.target.value;
        setSubTask(updatedSubTasks);
    };

    const onScheduleTypeChangeEventHandler = (event) => {
        setScheduleType(event.target.value);

        if (event.target.value !== 'custom') {
            setCustomScheduleType('');
        }
    };

    const onCustomScheduleTypeChangeEventHandler = (event) => {
        setCustomScheduleType(event.target.value);
    };

    const onTimeHourChangeEventHandler = (event) => {
        setDeadlineTimeHour(event.target.value);
    };

    const onTimeMinuteChangeEventHandler = (event) => {
        setDeadlineTimeMinute(event.target.value);
    };

    const onMeridiemTypeChangeEventHandler = (event) => {
        setMeridiemType(event.target.value);
    };

    const onPasteEventHandler = () => {
        const text = title.split('=>').map(str => str.trim());
    
        if (text.length > 0) {
            setTitle(text[1] || '');
            setDescription(text[2] || '');
            setSubTask(text[3] === 'no subtask' ? [] : JSON.parse(text[3]) || []);
            setScheduleType(text[0] === '' ? '' : 'custom');
            setCustomScheduleType(text[0] === '' ? '' : text[0]);

            if(text[4] !== 'no deadline'){
                const [timePart, meridiem] = text[4].split(' ');
                const [hour, minute] = timePart.split(':').map(Number);
                
                setIsDisabled(false);
                setDeadlineTimeHour(hour);
                setDeadlineTimeMinute(minute);
                setMeridiemType(meridiem);
            }
    
            document.getElementById('titleLabel').classList.remove('title-empty');
        } else {
            document.getElementById('titleLabel').classList.add('title-empty');
        }
    };
    

    const onAddTodoEventHandler = (event) => {
        event.preventDefault();
        document.getElementById('titleLabel').classList.remove('title-empty');
        document.getElementById('scheduleOptionsLabel').classList.remove('schedule-type-empty');
        document.getElementById('timePickerLabel').classList.remove('time-picker-under');
        document.getElementById('timePickerLabel').classList.remove('time-picker-over');

        const updatedSubTasks = subTask.filter(task => task.content !== "");

        if(!title.trim()){
            document.getElementById('titleLabel').classList.add('title-empty');
        }

        if(deadlineTimeHour < 1 || deadlineTimeMinute < 0){
            document.getElementById('timePickerLabel').classList.add('time-picker-under');
        }

        if(deadlineTimeHour > 12 || deadlineTimeMinute > 60){
            document.getElementById('timePickerLabel').classList.add('time-picker-over');
        }

        if(scheduleType === 'custom' && customScheduleType === ''){
            document.getElementById('scheduleOptionsLabel').classList.add('schedule-type-empty')
        }else if(title.trim()){
            let todoId
            const items = JSON.parse(localStorage.getItem('todoItems')) || [];

            if(items.length === 0){
                todoId = 'N-' + (items.length + 1).toString().padStart(4, '0');
            }else{
                todoId = 'N-' + (parseInt(items[0].id.slice(2), 10) + 1).toString().padStart(4, '0');
            }

            const newTodo = {
                id: todoId,
                title: title, 
                description: description.trim() ? description : 'no description',
                subTask: updatedSubTasks.length !== 0 ? updatedSubTasks : 'no subtask',
                completed: false, 
                priority: false,
                schedule: scheduleType !== "",
                scheduleType: scheduleType === 'custom' ? customScheduleType : scheduleType,
                deadlineTime: isDisabled ? 'no deadline' : deadlineTimeHour.toString().padStart(2, '0') + ":" + deadlineTimeMinute.toString().padStart(2, '0') + " " + meridiemType
            };
            
            items.push(newTodo);
            localStorage.setItem('todoItems', JSON.stringify(items));
            
            onAddTodo(newTodo);
            
            setTitle('');
            setDescription('');
            setSubTask([]);
            setScheduleType('');
            setCustomScheduleType('');
        }
    };

    return (
        <div className='todo-form'>
            <div>
                <p className='nav-title'>To-do</p>
                <TodoNav 
                    currentTab={'add'}
                    setTab={setTab}
                />
            </div>
            <form onSubmit={onAddTodoEventHandler}>
                <div className='todo-title'>
                    <label htmlFor="title" id='titleLabel'>Title<span>*</span></label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={onTitleChangeEventHandler}
                        placeholder='Title here..'
                        />
                </div>

                <div className='todo-description'>
                    <label htmlFor="description" id='descriptionLabel'>Description</label>
                    <div>
                        <input
                        id="description"
                        type='text'
                        value={description}
                        onChange={onDescriptionChangeEventHandler}
                        placeholder='Description here..'
                        />
                        <button type='button' onClick={addSubTask}><FontAwesomeIcon icon={faPlus} /><FontAwesomeIcon icon={faListCheck} /></button>
                    </div>
                    {subTask.map((task, index) => (
                        <div key={task.id} className='subtask-form'>
                            <select 
                                id="listStyleOptions" 
                                value={task.listStyle} 
                                onChange={(e) => onSubTaskListStyleChangeEventHandler(e, index)}
                            >
                                <option value="">None</option>
                                <option value="textIndentOne">Str.</option>
                                <option value="textIndentTwo">Str‥</option>
                                <option value="textIndentThree">Str…</option>
                                <option value="plusIndentOne">-.</option>
                                <option value="plusIndentTwo">-‥</option>
                                <option value="plusIndentThree">-…</option>
                                <option value="checkboxIndentOne">=.</option>
                                <option value="checkboxIndentTwo">=‥</option>
                                <option value="checkboxIndentThree">=…</option>
                                <option value="xcircleIndentOne">*.</option>
                                <option value="xcircleIndentTwo">*‥</option>
                                <option value="xcircleIndentThree">*…</option>
                            </select>
                            <input 
                                type="text"
                                value={task.content}
                                onChange={(e) => onSubTaskContentChangeEventHandler(e, index)}
                                placeholder={`Subtask ${index + 1}`}
                            />
                            <button type='button' onClick={(e) => delSubTask(e, index)}><FontAwesomeIcon icon={faX} size="xs" /></button>
                        </div>
                    ))}
                </div>

                <div className='todo-schedule-type'>
                    <label htmlFor="scheduleOptions" id='scheduleOptionsLabel'>Schedule Type</label>
                    <div>
                        <select id="scheduleOptions" value={scheduleType} onChange={onScheduleTypeChangeEventHandler}>
                            <option value="">None</option>
                            <option value="[D]">Daily</option>
                            <option value="[W]">Weekly</option>
                            <option value="[Y]">Yearly</option>
                            <option value="[S]">Scheduled</option>
                            <option value="[A]">Assignment</option>
                            <option value="custom">Custom</option>
                        </select>

                        {scheduleType !== 'custom' && (
                            <input
                                id='scheduleTypeDisplay'
                                type="text"
                                value={scheduleType}
                                placeholder="None"
                                disabled
                                />
                            )}

                        {scheduleType === 'custom' && (
                            <input
                                id='customScheduleType'
                                type="text"
                                value={customScheduleType}
                                onChange={onCustomScheduleTypeChangeEventHandler}
                                placeholder="Custom type.."
                                />
                            )}
                    </div>
                </div>

                <div className='todo-time-picker'>
                    <div className='deadline-label-toggle'>
                        <button type='button' onClick={() => setIsDisabled(prev => !prev)}>
                            {
                                isDisabled ? 
                                <FontAwesomeIcon icon={faSquareXmark} /> :
                                <FontAwesomeIcon icon={faSquareCheck} />
                            }
                        </button>
                        <label htmlFor="hourTimePicker" id='timePickerLabel'>Deadline Time</label>
                    </div>
                    <div>
                        <div className='time-picker'>
                            <input 
                                id="hourTimePicker" 
                                type="number"
                                value={deadlineTimeHour} 
                                onChange={onTimeHourChangeEventHandler}
                                disabled={isDisabled}
                                />
                            <p>:</p>
                            <input 
                                id="minuteTimePicker" 
                                type="number" 
                                value={deadlineTimeMinute}
                                onChange={onTimeMinuteChangeEventHandler}
                                disabled={isDisabled}
                                />
                            <select 
                            id="meridiemOptions" 
                            value={meridiemType} 
                            onChange={onMeridiemTypeChangeEventHandler}
                            disabled={isDisabled}
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>

                        <div className='todo-buttons'>                        
                            <button type='button' onClick={onPasteEventHandler}><FontAwesomeIcon icon={faPaste} /></button>
                            <button type='submit'><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;