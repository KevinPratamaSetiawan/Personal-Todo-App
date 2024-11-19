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
    let [preferredId, setPreferredId] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [subTask, setSubTask] = React.useState<SubTask[]>([]);
    const [scheduleType, setScheduleType] = React.useState('');
    const [customScheduleType, setCustomScheduleType] = React.useState('');
    const [deadlineStartDate, setStartDeadlineDate] = React.useState(formatDate(new Date(), 'YY-MM-DD'));
    const [deadlineEndDate, setEndDeadlineDate] = React.useState(formatDate(new Date(), 'YY-MM-DD'));
    const [deadlineStartTimeHour, setStartDeadlineTimeHour] = React.useState(new Date().getHours());
    const [deadlineStartTimeMinute, setStartDeadlineTimeMinute] = React.useState(new Date().getMinutes());
    const [deadlineEndTimeHour, setEndDeadlineTimeHour] = React.useState(new Date().getHours() + 1);
    const [deadlineEndTimeMinute, setEndDeadlineTimeMinute] = React.useState(new Date().getMinutes());

    const onTitleChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const onPreferredIdChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreferredId(event.target.value);
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
            setPreferredId(text[0])
            setTitle(text[2] || '');
            setDescription(text[3] || '');
            setSubTask(text[4] === 'noSubtask' ? [] : JSON.parse(text[4]) || []);
            setScheduleType(text[1] === '' ? '' : (text[1] === 'custom' ? 'custom' : text[1]));
            setCustomScheduleType(text[1] !== '' && text[1] !== 'custom' ? '' : text[1]);

            if(text[5] !== 'noDeadlineStartDate'){   
                setStartDeadlineDate(text[5]);
            }

            if(text[6] !== 'noDeadlineEndDate'){   
                setEndDeadlineDate(text[6]);
            }

            if(text[7] !== 'noDeadlineStartTime'){
                const [startHour, startMinute] = text[7].split(':').map(Number);

                setStartDeadlineTimeHour(startHour);
                setStartDeadlineTimeMinute(startMinute);
            }

            if(text[8] !== 'noDeadlineEndTime'){
                const [endHour, endMinute] = text[8].split(':').map(Number);
                
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

            if(preferredId !== ''){
                items.forEach((todo: todoItem) => {
                    if (todo.id === preferredId) {
                        preferredId = '';
                    }
                });
            }

            if(preferredId === ''){
                if(items.length === 0){
                    todoId = 'N-' + (items.length + 1).toString().padStart(4, '0');
                }else{
                    todoId = 'N-' + (parseInt(items[0].id.slice(2), 10) + 1).toString().padStart(4, '0');
                }
            }else {
                todoId = preferredId;
            }

            const newTodo = {
                id: todoId,
                title: title, 
                description: description.trim() ? description : 'no description',
                subTask: updatedSubTasks.length !== 0 ? updatedSubTasks : [],
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
            
            setPreferredId('');
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
                    <div>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={onTitleChangeEventHandler}
                        placeholder='Title here..'
                        />
                    {preferredId !== '' ?
                        <input
                            id="preferredId"
                            type="text"
                            value={preferredId}
                            onChange={onPreferredIdChangeEventHandler}
                            placeholder='ID here..'
                            /> : null
                    }
                    </div>
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
                                <option value="checkboxIndentOne">=.</option>
                                <option value="checkboxIndentTwo">=‥</option>
                                <option value="checkboxIndentThree">=…</option>
                                <option value="xcircleIndentOne">*.</option>
                                <option value="xcircleIndentTwo">*‥</option>
                                <option value="xcircleIndentThree">*…</option>
                                <option value="plusIndentOne">-.</option>
                                <option value="plusIndentTwo">-‥</option>
                                <option value="plusIndentThree">-…</option>
                                <option value="linkIndentZero">#</option>
                                <option value="linkIndentOne">#.</option>
                                <option value="linkIndentTwo">#‥</option>
                                <option value="linkIndentThree">#…</option>
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
                                />:
                                (scheduleType === '[W]' ? 
                                <select id="dateOptions" value={deadlineStartDate} onChange={onStartDateChangeEventHandler}>
                                    <option value="">None</option>
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
                                    />
                                <p>:</p>
                                <input 
                                    id="minuteTimePicker" 
                                    type="number" 
                                    value={deadlineStartTimeMinute}
                                    onChange={onStartTimeMinuteChangeEventHandler}
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
                                />:
                                null
                            }
                            <div>
                                <input 
                                    id="hourTimePicker" 
                                    type="number"
                                    value={deadlineEndTimeHour} 
                                    onChange={onEndTimeHourChangeEventHandler}
                                    />
                                <p>:</p>
                                <input 
                                    id="minuteTimePicker" 
                                    type="number" 
                                    value={deadlineEndTimeMinute}
                                    onChange={onEndTimeMinuteChangeEventHandler}
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