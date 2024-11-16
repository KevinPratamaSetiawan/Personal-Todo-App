import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faToggleOn, faPaste, faSquareCheck, faCircleXmark, faListCheck, faX, faSquareXmark } from '@fortawesome/free-solid-svg-icons';

import TodoNav from './TodoNav';
import { formatDate } from '../utils/script';
import { completedData } from '../utils/script';
import { todoItem, SubTask } from '../utils/props';

type TodoFormProps = {
    onAddTodo: (newTodo: todoItem) => void;
    setTab: (tab: string) => void;
}

const TodoForm = ({ onAddTodo, setTab }: TodoFormProps) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [subTask, setSubTask] = React.useState<SubTask[]>([]);
    const [scheduleType, setScheduleType] = React.useState('');
    const [customScheduleType, setCustomScheduleType] = React.useState('');
    // const [isDisabled, setIsDisabled] = React.useState(true);
    const [deadlineStartDate, setStartDeadlineDate] = React.useState(formatDate(new Date(), 'YY-MM-DD'));
    const [deadlineEndDate, setEndDeadlineDate] = React.useState(formatDate(new Date(), 'YY-MM-DD'));
    const [deadlineStartTimeHour, setStartDeadlineTimeHour] = React.useState(new Date().getHours());
    const [deadlineStartTimeMinute, setStartDeadlineTimeMinute] = React.useState(new Date().getMinutes());
    const [deadlineEndTimeHour, setEndDeadlineTimeHour] = React.useState(new Date().getHours() + 1);
    const [deadlineEndTimeMinute, setEndDeadlineTimeMinute] = React.useState(new Date().getMinutes());
    // const [meridiemType, setMeridiemType] = React.useState(new Date().getHours() > 12 ? 'PM' : 'AM');

    const onTitleChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const onDescriptionChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const addSubTask = () => {
        setSubTask(prevSubTask => [
            ...prevSubTask, 
            { id: prevSubTask.length, content: "", completed: false, listStyle: "" }
        ]);
    };

    const delSubTask = (event: React.MouseEvent, index: number) => {
        const updatedSubTasks = [...subTask];
        updatedSubTasks.splice(index, 1);
        setSubTask(updatedSubTasks);
    };

    const onSubTaskContentChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedSubTasks = [...subTask];
        updatedSubTasks[index].content = event.target.value;
        setSubTask(updatedSubTasks);
    };

    const onSubTaskListStyleChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const updatedSubTasks = [...subTask];
        updatedSubTasks[index].listStyle = event.target.value;
        setSubTask(updatedSubTasks);
    };

    const onScheduleTypeChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setScheduleType(event.target.value);

        if (event.target.value !== 'custom') {
            setCustomScheduleType('');
        }
    };

    const onCustomScheduleTypeChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomScheduleType(event.target.value);
    };

    const onStartDateChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setStartDeadlineDate(event.target.value);
    };

    const onEndDateChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDeadlineDate(event.target.value);
    };

    const onStartTimeHourChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDeadlineTimeHour(parseFloat(event.target.value));
    };

    const onStartTimeMinuteChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDeadlineTimeMinute(parseFloat(event.target.value));
    };

    const onEndTimeHourChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDeadlineTimeHour(parseFloat(event.target.value));
    };

    const onEndTimeMinuteChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDeadlineTimeMinute(parseFloat(event.target.value));
    };

    const onPasteEventHandler = () => {
        const text = title.split('=>').map(str => str.trim());
    
        if (text.length > 0) {
            setTitle(text[1] || '');
            setDescription(text[2] || '');
            setSubTask(text[3] === 'no subtask' ? [] : JSON.parse(text[3]) || []);
            setScheduleType(text[0] === '' ? '' : (text[0] === 'custom' ? 'custom' : text[0]));
            setCustomScheduleType(text[0] !== '' && text[0] !== 'custom' ? '' : text[0]);

            if(text[4] !== 'noDeadlineStartDate'){   
                setStartDeadlineDate(text[4]);
            }

            if(text[5] !== 'noDeadlineEndDate'){   
                setEndDeadlineDate(text[5]);
            }

            if(text[6] !== 'noDeadlineStartTime'){
                const [startHour, startMinute] = text[6].split(':').map(Number);

                setStartDeadlineTimeHour(startHour);
                setStartDeadlineTimeMinute(startMinute);
            }

            if(text[7] !== 'noDeadlineEndTime'){
                const [endHour, endMinute] = text[7].split(':').map(Number);
                
                setEndDeadlineTimeHour(endHour);
                setEndDeadlineTimeMinute(endMinute);
            }
    
            document.getElementById('titleLabel')!.classList.remove('title-empty');
        } else {
            document.getElementById('titleLabel')!.classList.add('title-empty');
        }
    };
    

    const onAddTodoEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        document.getElementById('titleLabel')!.classList.remove('title-empty');
        document.getElementById('scheduleOptionsLabel')!.classList.remove('schedule-type-empty');

        if(scheduleType !== ''){
            document.getElementById('timePickerLabel')!.classList.remove('time-picker-under');
            document.getElementById('timePickerLabel')!.classList.remove('time-picker-over');
        }

        const updatedSubTasks = subTask.filter(task => task.content !== "");

        if(!title.trim()){
            document.getElementById('titleLabel')!.classList.add('title-empty');
        }

        if(scheduleType !== ''){
            if(deadlineStartTimeHour < 1 || deadlineStartTimeMinute < 0 || deadlineEndTimeHour < 1 || deadlineEndTimeMinute < 0){
                document.getElementById('timePickerLabel')!.classList.add('time-picker-under');
            }

            if(deadlineStartTimeHour > 23 || deadlineStartTimeMinute > 60 || deadlineEndTimeHour > 23 || deadlineEndTimeMinute > 60){
                document.getElementById('timePickerLabel')!.classList.add('time-picker-over');
            }
        }

        if(scheduleType === 'custom' && customScheduleType === ''){
            document.getElementById('scheduleOptionsLabel')!.classList.add('schedule-type-empty')
        }else if(title.trim()){
            let todoId
            const storedData = localStorage.getItem("todoItems") || '[]';
            const items = [...JSON.parse(storedData), ...completedData];

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
                deadlineStartDate: scheduleType === '' || scheduleType === '[D]' ? 'noDeadlineStartDate' : deadlineStartDate as string,
                deadlineEndDate: scheduleType !== '[Y]' && scheduleType !== '[S]' && scheduleType !== 'custom' ? 'noDeadlineEndDate' : deadlineEndDate as string,
                deadlineStartTime: scheduleType === '' ? 'noDeadlineStartTime' : deadlineStartTimeHour.toString().padStart(2, '0') + ":" + deadlineStartTimeMinute.toString().padStart(2, '0'),
                deadlineEndTime: scheduleType === '' || scheduleType === '[A]' ? 'noDeadlineEndTime' : deadlineEndTimeHour.toString().padStart(2, '0') + ":" + deadlineEndTimeMinute.toString().padStart(2, '0')
            };
            
            items.push(newTodo);
            localStorage.setItem('todoItems', JSON.stringify(items));
            
            onAddTodo(newTodo);
            
            setTitle('');
            setDescription('');
            setSubTask([]);
            setScheduleType('');
            setCustomScheduleType('');
            setStartDeadlineDate(formatDate(new Date(), 'YY-MM-DD'));
            setEndDeadlineDate(formatDate(new Date(), 'YY-MM-DD'));
            setStartDeadlineTimeHour(new Date().getHours());
            setStartDeadlineTimeMinute(new Date().getMinutes());
            setEndDeadlineTimeHour(new Date().getHours() + 1);
            setEndDeadlineTimeMinute(new Date().getMinutes());
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

                {
                scheduleType !== '' ?
                <div className='todo-time-picker'>
                    <div className='deadline-label-toggle'>
                        {/* <button type='button' onClick={() => setIsDisabled(prev => !prev)}>
                            {
                                isDisabled ? 
                                <FontAwesomeIcon icon={faSquareXmark} /> :
                                <FontAwesomeIcon icon={faSquareCheck} />
                            }
                        </button> */}
                        <label htmlFor="hourTimePicker" id='timePickerLabel'>Deadline Time</label>
                    </div>
                    <div className='time-picker'>
                        <div className='date-time-section'>
                            <label htmlFor="datePicker" id='timePickerLabel'>Start:</label>
                            {
                                scheduleType !== '[D]' && scheduleType !== '[W]' ?
                                <input 
                                id="datePicker" 
                                type="date"
                                value={deadlineStartDate}
                                onChange={onStartDateChangeEventHandler}
                                // disabled={isDisabled}
                                />:
                                (scheduleType === '[W]' ? 
                                <select id="dateOptions" value={deadlineStartDate} onChange={onStartDateChangeEventHandler}>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select> :
                                null
                                )                    
                            }
                            <div>
                                <input 
                                    id="hourTimePicker" 
                                    type="number"
                                    value={deadlineStartTimeHour} 
                                    onChange={onStartTimeHourChangeEventHandler}
                                    // disabled={isDisabled}
                                    />
                                <p>:</p>
                                <input 
                                    id="minuteTimePicker" 
                                    type="number" 
                                    value={deadlineStartTimeMinute}
                                    onChange={onStartTimeMinuteChangeEventHandler}
                                    // disabled={isDisabled}
                                    />
                            </div>
                        </div>
                        
                        {
                        scheduleType !== '[A]' ?
                        <div className='date-time-section'>
                            <label htmlFor="datePicker" id='timePickerLabel'>End:</label>
                            {
                                scheduleType !== '[D]' &&  scheduleType !== '[W]' ?
                            <input 
                                id="datePicker" 
                                type="date"
                                value={deadlineEndDate}
                                onChange={onEndDateChangeEventHandler}
                                // disabled={isDisabled}
                                />:
                                null
                            }
                            <div>
                                <input 
                                    id="hourTimePicker" 
                                    type="number"
                                    value={deadlineEndTimeHour} 
                                    onChange={onEndTimeHourChangeEventHandler}
                                    // disabled={isDisabled}
                                    />
                                <p>:</p>
                                <input 
                                    id="minuteTimePicker" 
                                    type="number" 
                                    value={deadlineEndTimeMinute}
                                    onChange={onEndTimeMinuteChangeEventHandler}
                                    // disabled={isDisabled}
                                    />
                            </div>
                        </div>:
                        null
                        }
                    </div>
                </div>:
                null
                }

                <div className='todo-buttons'>                        
                    <button type='button' onClick={onPasteEventHandler}><FontAwesomeIcon icon={faPaste} /></button>
                    <button type='submit'><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;