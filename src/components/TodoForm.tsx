import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faToggleOn, faPaste, faSquareCheck, faCircleXmark, faListCheck, faX, faSquareXmark, faAnglesRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
    const [tag, setTag] = React.useState('');
    const [tagsList, setTagsList] = React.useState<string[]>([]);

    const onTitleChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setTitle(event.target.value); };
    const onPreferredIdChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setPreferredId(event.target.value); };
    const onDescriptionChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(event.target.value); };

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

    const onSubTaskContentChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
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

    const onCustomScheduleTypeChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setCustomScheduleType(event.target.value); };
    const onStartDateChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => { setStartDeadlineDate(event.target.value); };
    const onEndDateChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setEndDeadlineDate(event.target.value); };
    const onStartTimeHourChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setStartDeadlineTimeHour(parseFloat(event.target.value)); };
    const onStartTimeMinuteChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setStartDeadlineTimeMinute(parseFloat(event.target.value)); };
    const onEndTimeHourChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setEndDeadlineTimeHour(parseFloat(event.target.value)); };
    const onEndTimeMinuteChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setEndDeadlineTimeMinute(parseFloat(event.target.value)); };

    const onTagChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value);
    };

    const onAddTagEventHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            if(tag.trim()){
                const newTag = tag.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
                setTagsList([...new Set([...tagsList, ...newTag])]);
                setTag('');
            }
        }
    };

    const removeTag = (index: number) => {
        const updatedTagsList = [...tagsList];
        updatedTagsList.splice(index, 1);
        setTagsList(updatedTagsList);
    };

    const removeAllTag = () => {
        setTagsList([]);
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

            setTagsList(text[9] === '[]' ? [] : JSON.parse(text[9]) || []);
    
            document.getElementById('titleLabel')!.classList.remove('title-empty');
        } else {
            document.getElementById('titleLabel')!.classList.add('title-empty');
        }
    };
    

    const onAddTodoEventHandler = () => {
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
                deadlineEndTime: scheduleType === '' || scheduleType === '[A]' ? 'noDeadlineEndTime' : deadlineEndTimeHour.toString().padStart(2, '0') + ":" + deadlineEndTimeMinute.toString().padStart(2, '0'),
                tags: tagsList
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
            setTag('');
            setTagsList([]);
        }
    };

    return (
        <div className='w-100 d-flex flex-column align-items-center justify-content-start'>
            <div className='w-100 d-flex align-items-center justify-content-between'>
                <p className='nav-title'>To-do</p>
                <TodoNav 
                    currentTab={'add'}
                    setTab={setTab}
                />
            </div>

            <div className='mt-3 w-100'>
                <InputGroup className="mb-3">
                        <InputGroup.Text className="text-white">Title</InputGroup.Text>
                        <Form.Control
                            id="title"
                            type="text"
                            value={title}
                            onChange={onTitleChangeEventHandler}
                            placeholder='Title here..'
                            aria-label="Title"
                            aria-describedby="title-input"
                            className="bg-dark text-white"
                        />
                        <InputGroup.Text id='titleLabel' className="text-white"></InputGroup.Text>
                        {preferredId !== '' ? <>
                            <InputGroup.Text id='preferredIdLabel' className="text-white">ID</InputGroup.Text>
                            <Form.Control
                                id="preferredId"
                                type="text"
                                value={preferredId}
                                onChange={onPreferredIdChangeEventHandler}
                                placeholder='ID here..'
                                aria-label="Preferred Id"
                                aria-describedby="preferred-id-input"
                                className="bg-dark text-white"
                            />
                            </> : null
                        }
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text className="text-white align-items-start">Desc</InputGroup.Text>
                        <TextareaAutosize
                            id="description"
                            value={description}
                            onChange={onDescriptionChangeEventHandler}
                            placeholder="Description here.."
                            className="form-control bg-dark text-white"
                            minRows={1}
                            maxRows={5}
                            style={{resize: 'none'}}
                        />
                        <Button 
                            variant="outline-light" 
                            id="add-subtask-btn"
                            onClick={addSubTask}
                        >
                            <FontAwesomeIcon icon={faPlus} /><FontAwesomeIcon icon={faListCheck} />
                        </Button>
                    </InputGroup>

                    {subTask.length !== 0 ?
                        <InputGroup className="mb-3 w-100">
                            <InputGroup.Text className="text-white text-center w-100 d-flex justify-content-center align-items-center">Sub-Task</InputGroup.Text>
                        </InputGroup> : null
                    }

                    {subTask.map((task, index) => (
                        <InputGroup className="mb-3" key={task.id}>
                            <Form.Select 
                                id="listStyleOptions" 
                                value={task.listStyle} 
                                onChange={(e) => onSubTaskListStyleChangeEventHandler(e, index)}
                                aria-label="Subtask Style Select"
                                className="bg-dark text-white"
                                style={{width: '15%', padding: '0', backgroundImage: 'none'}}
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
                            </Form.Select>
                            <Form.Control 
                                value={task.content}
                                onChange={(e) => onSubTaskContentChangeEventHandler(e, index)}
                                placeholder={`Subtask ${index + 1}`}
                                aria-label="Text input for subtask content"
                                className="bg-dark text-white"
                            />
                            <Button 
                                variant="outline-light" 
                                id="del-subtask-btn"
                                onClick={(e) => delSubTask(e, index)}
                            >
                                <FontAwesomeIcon icon={faX} size="xs" />
                            </Button>
                        </InputGroup>                    
                    ))}

                    <InputGroup className="mb-3 bg-dark">
                        <InputGroup.Text className="text-white">Schedule</InputGroup.Text>
                        <Form.Select 
                            id="scheduleOptions" 
                            value={scheduleType} 
                            onChange={onScheduleTypeChangeEventHandler}
                            aria-label="Schedule Type Select"
                            className="bg-dark text-white"
                            style={{width: '30%'}}
                        >
                            <option value="">None</option>
                            <option value="[D]">Daily</option>
                            <option value="[W]">Weekly</option>
                            <option value="[Y]">Yearly</option>
                            <option value="[S]">Scheduled</option>
                            <option value="[A]">Assignment</option>
                            <option value="custom">Custom</option>
                        </Form.Select>
                        
                        {scheduleType !== 'custom' && (
                        <Form.Control 
                            id='scheduleTypeDisplay'
                            type="text"
                            value={scheduleType}
                            placeholder="None"
                            disabled
                            aria-label="Text input for subtask content"
                            className="bg-dark text-white text-center"
                        />
                        )}

                        {scheduleType === 'custom' && (
                        <Form.Control 
                            id='customScheduleType'
                            type="text"
                            value={customScheduleType}
                            onChange={onCustomScheduleTypeChangeEventHandler}
                            placeholder="Custom type.."
                            aria-label="Text input for subtask content"
                            className="bg-dark text-white"
                        />
                        )}
                        <InputGroup.Text id='scheduleOptionsLabel' className="text-white"></InputGroup.Text>
                    </InputGroup>

                    {scheduleType !== '' ?
                        <InputGroup className="mb-3 w-100">
                            <InputGroup.Text id='timePickerLabel' className="text-white text-center w-100 d-flex justify-content-center align-items-center">Time Picker</InputGroup.Text>
                        </InputGroup> : null
                    }

                    {scheduleType !== '' && scheduleType !== '[D]' ?
                        <InputGroup className="mb-3 bg-dark">
                            {scheduleType !== '[D]' && scheduleType !== '[W]' ?
                                <>
                                    <input 
                                        id="datePicker" 
                                        type="date"
                                        value={deadlineStartDate}
                                        onChange={onStartDateChangeEventHandler}
                                        className='form-control bg-dark text-light text-center form-datepicker'
                                    />

                                    {scheduleType !== '[A]' ? <>
                                        <InputGroup.Text className="text-white"><FontAwesomeIcon icon={faAnglesRight} /></InputGroup.Text>
                                        <input 
                                            id="datePicker" 
                                            type="date"
                                            value={deadlineEndDate}
                                            onChange={onEndDateChangeEventHandler}
                                            className='form-control bg-dark text-light text-center form-datepicker'
                                        />
                                        </> : null
                                    }
                                </> :
                                (scheduleType === '[W]' ?
                                    <Form.Select 
                                        id="dateOptions" 
                                        value={deadlineStartDate} 
                                        onChange={onStartDateChangeEventHandler}
                                        aria-label="Deadline Day Select"
                                        className="bg-dark text-white"
                                        style={{width: '100%'}}
                                    >
                                        <option value="">None</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </Form.Select> : null
                                )                    
                            }
                        </InputGroup> : null
                    }

                    {scheduleType !== '' ?
                        <InputGroup className="mb-3 bg-dark">
                            <Form.Control 
                                id="hourTimePicker" 
                                type="number"
                                value={deadlineStartTimeHour} 
                                onChange={onStartTimeHourChangeEventHandler}
                                className="bg-dark text-white text-center"
                            />
                            <InputGroup.Text className="text-white">:</InputGroup.Text>
                            <Form.Control 
                                id="minuteTimePicker" 
                                type="number" 
                                value={deadlineStartTimeMinute}
                                onChange={onStartTimeMinuteChangeEventHandler}
                                className="bg-dark text-white text-center"
                            /> 
                            {scheduleType !== '[A]' ? <>
                                <InputGroup.Text className="text-white"><FontAwesomeIcon icon={faAnglesRight} /></InputGroup.Text>
                                <Form.Control 
                                    id="hourTimePicker" 
                                    type="number"
                                    value={deadlineEndTimeHour} 
                                    onChange={onEndTimeHourChangeEventHandler}
                                    className="bg-dark text-white text-center"
                                />
                                <InputGroup.Text className="text-white">:</InputGroup.Text>
                                <Form.Control 
                                    id="minuteTimePicker" 
                                    type="number" 
                                    value={deadlineEndTimeMinute}
                                    onChange={onEndTimeMinuteChangeEventHandler}
                                    className="bg-dark text-white text-center"
                                />
                            </> : null }
                        </InputGroup> : null
                    }

                    <InputGroup className="mb-3 bg-dark d-flex">
                        <InputGroup.Text className="text-white align-items-center">Tags</InputGroup.Text>
                        <ul className='d-flex align-items-center gap-2 form-control bg-dark text-white m-0 p-3' style={{overflowX: 'auto', flexWrap: 'wrap'}}>
                            {tagsList.map((tag: string, index: number) => (
                                <li 
                                    key={index}
                                    className='px-2 py-1 border rounded-1 d-flex align-items-center gap-2'
                                >
                                    {tag}
                                    <button 
                                    type='button' 
                                    onClick={() => removeTag(index)} 
                                    className='p-0 border-0 rounded-circle d-flex align-items-center justify-content-center bg-secondary' 
                                    style={{ borderRadius: '5px', width: '20px', height: '20px' }}
                                    >
                                        <FontAwesomeIcon icon={faX} size='2xs' className='m-0' />
                                    </button>
                                </li>
                            ))}
                            <Form.Control
                                id="tag"
                                type="text"
                                value={tag}
                                onChange={onTagChangeEventHandler}
                                onKeyDown={onAddTagEventHandler}
                                placeholder='Add tag here..'
                                aria-label="Tag"
                                aria-describedby="tag-input"
                                className="bg-dark text-white w-auto flex-grow-1 border-0 p-0 rounded-0"
                            />
                        </ul>
                        <Button type='button' onClick={removeAllTag} variant="outline-light"><FontAwesomeIcon icon={faTrashCan} /></Button>
                    </InputGroup>
                </div>

                <InputGroup className='w-100 d-flex align-items-center justify-content-end gap-2'>                        
                    <Button type='button' onClick={onPasteEventHandler} variant="outline-light" className='' style={{ width: '20%', borderRadius: '5px' }}><FontAwesomeIcon icon={faPaste} /></Button>
                    <Button type='button' onClick={onAddTodoEventHandler} variant="outline-light" className='' style={{ width: '20%', borderRadius: '5px' }}><FontAwesomeIcon icon={faPlus} /></Button>
                </InputGroup>
        </div>
    );
};

export default TodoForm;