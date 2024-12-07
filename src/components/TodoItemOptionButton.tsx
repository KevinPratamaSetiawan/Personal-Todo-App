import React, { useState, ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import Badge from 'react-bootstrap/Badge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faEllipsisVertical, faPlus, faListCheck, faX, faAnglesRight, faTags, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { formatDate } from '../utils/script';
import { todoItem, SubTask } from '../utils/props';

type TodoItemProps = {
    todoItem: todoItem;
    onEditTodo: (id: string, edittedObject: todoItem) => void;
    onDeleteTodo: (id: string) => void;
}

export default function TodoItemOptionButton ({todoItem, onEditTodo, onDeleteTodo}: TodoItemProps) {
    const [todoId, setTodoId] = React.useState<string | ReactNode>(todoItem.id);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditModalToggle = () => { 
        setTitle(todoItem.title);
        setDescription(todoItem.description);
        setSubTask(todoItem.subTask);
        setScheduleType(todoItem.scheduleType === '' ? '' : (todoItem.scheduleType === 'custom' ? 'custom' : todoItem.scheduleType));
        setCustomScheduleType(todoItem.scheduleType !== '' && todoItem.scheduleType !== 'custom' ? '' : todoItem.scheduleType);

        if(todoItem.deadlineStartDate !== 'noDeadlineStartDate'){   
            setStartDeadlineDate(todoItem.deadlineStartDate);
        }

        if(todoItem.deadlineEndDate !== 'noDeadlineEndDate'){   
            setEndDeadlineDate(todoItem.deadlineEndDate);
        }

        if(todoItem.deadlineStartTime !== 'noDeadlineStartTime'){
            const [startHour, startMinute] = todoItem.deadlineStartTime.split(':').map(Number);

            setStartDeadlineTimeHour(startHour);
            setStartDeadlineTimeMinute(startMinute);
        }

        if(todoItem.deadlineEndTime !== 'noDeadlineEndTime'){
            const [endHour, endMinute] = todoItem.deadlineEndTime.split(':').map(Number);
            
            setEndDeadlineTimeHour(endHour);
            setEndDeadlineTimeMinute(endMinute);
        }

        setTag('');
        setTagsList(todoItem.tags);

        setShowEditModal(!showEditModal); 
    };

    const onTodoEditEventHandler = () => { 
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
            const edittedTodo = {
                id: todoItem.id,
                title: title, 
                description: description.trim() ? description : 'no description',
                subTask: updatedSubTasks.length !== 0 ? updatedSubTasks : [],
                completed: todoItem.completed, 
                priority: todoItem.priority,
                schedule: scheduleType !== "",
                scheduleType: scheduleType === 'custom' ? customScheduleType : scheduleType,
                deadlineStartDate: scheduleType === '' || scheduleType === '[D]' ? 'noDeadlineStartDate' : deadlineStartDate as string,
                deadlineEndDate: scheduleType !== '[Y]' && scheduleType !== '[S]' && scheduleType !== 'custom' ? 'noDeadlineEndDate' : deadlineEndDate as string,
                deadlineStartTime: scheduleType === '' ? 'noDeadlineStartTime' : deadlineStartTimeHour.toString().padStart(2, '0') + ":" + deadlineStartTimeMinute.toString().padStart(2, '0'),
                deadlineEndTime: scheduleType === '' || scheduleType === '[A]' ? 'noDeadlineEndTime' : deadlineEndTimeHour.toString().padStart(2, '0') + ":" + deadlineEndTimeMinute.toString().padStart(2, '0'),
                tags: tagsList
            };
            
            onEditTodo(todoItem.id, edittedTodo); 
            handleEditModalToggle();
        }

    };

    const handleDeleteModalToggle = () => { setShowDeleteModal(!showDeleteModal); };
    const onTodoDeleteEventHandler = () => { 
        onDeleteTodo(todoItem.id);
    };

    // Handle Title
    const [title, setTitle] = React.useState(todoItem.title);
    const onTitleChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setTitle(event.target.value); };

    // Handle Description
    const [description, setDescription] = React.useState(todoItem.description);
    const onDescriptionChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(event.target.value); };

    // Handle Subtask
    const [subTask, setSubTask] = React.useState<SubTask[]>(todoItem.subTask);
    const addSubTask = () => {
        setSubTask(prevSubTask => [
            ...prevSubTask, 
            { id: prevSubTask.length, content: "", completed: false, listStyle: "text", indent: 0 }
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

    const onSubTaskListIndentChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const updatedSubTasks = [...subTask];
        updatedSubTasks[index].indent = parseInt(event.target.value, 10);
        setSubTask(updatedSubTasks);
    };

    const orderSubTask = (id: number, method: string) => {
        const updatedSubtask = [...subTask];
        const currentIndex = updatedSubtask.findIndex(item => item.id === id);

        if(method === 'up'){
            [updatedSubtask[currentIndex - 1], updatedSubtask[currentIndex]] = [updatedSubtask[currentIndex], updatedSubtask[currentIndex - 1]];
        }else if(method === 'add'){
            updatedSubtask.splice(currentIndex + 1, 0, 
                { id: updatedSubtask.length, content: "", completed: false, listStyle: "text", indent: 0 }
            )
        }else if(method === 'down'){
            [updatedSubtask[currentIndex + 1], updatedSubtask[currentIndex]] = [updatedSubtask[currentIndex], updatedSubtask[currentIndex + 1]];
        }

        setSubTask(updatedSubtask);
    };

    // Handle Schedule Type
    const [scheduleType, setScheduleType] = React.useState(todoItem.scheduleType);
    const [customScheduleType, setCustomScheduleType] = React.useState(todoItem.scheduleType);

    const onScheduleTypeChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setScheduleType(event.target.value);

        if (event.target.value !== 'custom') {
            setCustomScheduleType('');
        }
    };

    const onCustomScheduleTypeChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomScheduleType(event.target.value);
    };

    // Handle Deadline Time
    const [deadlineStartDate, setStartDeadlineDate] = React.useState(formatDate(new Date(todoItem.deadlineStartDate), 'YY-MM-DD'));
    const [deadlineEndDate, setEndDeadlineDate] = React.useState(formatDate(new Date(todoItem.deadlineEndDate), 'YY-MM-DD'));

    const [startHour, startMinute] = todoItem.deadlineStartTime.split(':').map(Number);
    const [endHour, endMinute] = todoItem.deadlineEndTime.split(':').map(Number);

    const [deadlineStartTimeHour, setStartDeadlineTimeHour] = React.useState(startHour);
    const [deadlineStartTimeMinute, setStartDeadlineTimeMinute] = React.useState(startMinute);
    const [deadlineEndTimeHour, setEndDeadlineTimeHour] = React.useState(endHour);
    const [deadlineEndTimeMinute, setEndDeadlineTimeMinute] = React.useState(endMinute);

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

    // Handle Tag
    const [tag, setTag] = React.useState('');
    const [tagsList, setTagsList] = React.useState<string[]>(todoItem.tags);

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

    return (
        <>
        <Modal
            show={showEditModal}
            onHide={handleEditModalToggle}
            backdrop="static"
            centered
            keyboard={false}
            dialogClassName="custom-modal"
            size='lg'
            data-bs-theme="dark"
        >
            <Modal.Header>
                <Modal.Title>{todoItem.id}</Modal.Title>
            </Modal.Header>

            <Modal.Body >
                <InputGroup className="mb-3">
                    <InputGroup.Text className="">Title</InputGroup.Text>
                    <Form.Control
                        id="title"
                        type="text"
                        value={title}
                        onChange={onTitleChangeEventHandler}
                        placeholder='Title here..'
                        aria-label="Title"
                        aria-describedby="title-input"
                        
                    />
                    <InputGroup.Text id='titleLabel' className=""></InputGroup.Text>
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text className=" align-items-start">Desc</InputGroup.Text>
                    <TextareaAutosize
                        id="description"
                        value={description}
                        onChange={onDescriptionChangeEventHandler}
                        placeholder="Description here.."
                        className="form-control  "
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
                        <InputGroup.Text className=" text-center w-100 d-flex justify-content-center align-items-center">Sub-Task</InputGroup.Text>
                    </InputGroup> : null
                }

                {subTask.map((task, index) => (
                    <InputGroup className="mb-3" key={task.id}>
                        <Form.Select 
                            id="listIndentOptions" 
                            value={task.indent} 
                            onChange={(e) => onSubTaskListIndentChangeEventHandler(e, index)}
                            aria-label="Subtask Indent Select"
                            className="bg-dark text-white"
                            style={{width: '12%', padding: '0', backgroundImage: 'none'}}
                        >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Form.Select>
                        <Form.Select 
                            id="listStyleOptions" 
                            value={task.listStyle} 
                            onChange={(e) => onSubTaskListStyleChangeEventHandler(e, index)}
                            aria-label="Subtask Style Select"
                            className="bg-dark text-white"
                            style={{width: '12%', padding: '0', backgroundImage: 'none'}}
                        >
                            <option value="text">Str</option>
                            <option value="checkbox">=</option>
                            <option value="xcircle">*</option>
                            <option value="plus">-</option>
                            <option value="link">#</option>
                        </Form.Select>
                        <Form.Control 
                            value={task.content}
                            onChange={(e) => onSubTaskContentChangeEventHandler(e, index)}
                            placeholder={`Subtask ${index + 1}`}
                            aria-label="Text input for subtask content"
                            
                        />
                        <Button 
                            variant="outline-light" 
                            id="del-subtask-btn"
                            onClick={(e) => delSubTask(e, index)}
                        >
                            <FontAwesomeIcon icon={faX} size="xs" />
                        </Button>

                        <Dropdown data-bs-theme="dark" className='ms-auto'>
                            <Dropdown.Toggle variant="outline-light" className=''><FontAwesomeIcon icon={faEllipsisVertical} /></Dropdown.Toggle>

                            <Dropdown.Menu data-bs-theme="dark" className="shadow rounded" align="end" style={{width: '195px'}}>
                                {index !== 0 ? <>
                                    <Dropdown.Item 
                                    as="button" 
                                    onClick={() => orderSubTask(task.id, 'up')} 
                                    className='d-flex align-items-center'
                                    >
                                        <FontAwesomeIcon icon={faCaretUp} className="me-2" size='lg' />
                                        Move Up
                                    </Dropdown.Item> 
                                    <Dropdown.Divider /> 
                                </> : null}
                                <Dropdown.Item 
                                as="button" 
                                onClick={() => orderSubTask(task.id, 'add')} 
                                className='d-flex align-items-center'
                                >
                                    <FontAwesomeIcon icon={faPlus} className="me-2" style={{markerStart: '-2px'}} />
                                    Add Below
                                </Dropdown.Item>
                                {index !== subTask.length-1 ? <>
                                    <Dropdown.Divider />
                                    <Dropdown.Item 
                                    as="button" 
                                    onClick={() => orderSubTask(task.id, 'down')}
                                    className='d-flex align-items-center'
                                    >
                                        <FontAwesomeIcon icon={faCaretDown} className="me-2" size='lg' />
                                        Move Down
                                    </Dropdown.Item>
                                </> : null}
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>                    
                ))}

                <InputGroup className="mb-3 ">
                    <InputGroup.Text className="">Schedule</InputGroup.Text>
                    <Form.Select 
                        id="scheduleOptions" 
                        value={scheduleType} 
                        onChange={onScheduleTypeChangeEventHandler}
                        aria-label="Schedule Type Select"
                        
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
                        className="  text-center"
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
                        
                    />
                    )}
                    <InputGroup.Text id='scheduleOptionsLabel' className=""></InputGroup.Text>
                </InputGroup>

                {scheduleType !== '' ?
                    <InputGroup className="mb-3 w-100">
                        <InputGroup.Text id='timePickerLabel' className=" text-center w-100 d-flex justify-content-center align-items-center">Time Picker</InputGroup.Text>
                    </InputGroup> : null
                }

                {scheduleType !== '' && scheduleType !== '[D]' ?
                    <InputGroup className="mb-3 ">
                        {scheduleType !== '[D]' && scheduleType !== '[W]' ?
                            <>
                                <input 
                                    id="datePicker" 
                                    type="date"
                                    value={deadlineStartDate}
                                    onChange={onStartDateChangeEventHandler}
                                    className='form-control  text-light text-center form-datepicker'
                                />

                                {scheduleType !== '[A]' ? <>
                                    <InputGroup.Text className=""><FontAwesomeIcon icon={faAnglesRight} /></InputGroup.Text>
                                    <input 
                                        id="datePicker" 
                                        type="date"
                                        value={deadlineEndDate}
                                        onChange={onEndDateChangeEventHandler}
                                        className='form-control  text-light text-center form-datepicker'
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
                    <InputGroup className="mb-3 ">
                        <Form.Control 
                            id="hourTimePicker" 
                            type="number"
                            value={deadlineStartTimeHour} 
                            onChange={onStartTimeHourChangeEventHandler}
                            className="  text-center"
                        />
                        <InputGroup.Text className="">:</InputGroup.Text>
                        <Form.Control 
                            id="minuteTimePicker" 
                            type="number" 
                            value={deadlineStartTimeMinute}
                            onChange={onStartTimeMinuteChangeEventHandler}
                            className="  text-center"
                        /> 
                        {scheduleType !== '[A]' ? <>
                            <InputGroup.Text className=""><FontAwesomeIcon icon={faAnglesRight} /></InputGroup.Text>
                            <Form.Control 
                                id="hourTimePicker" 
                                type="number"
                                value={deadlineEndTimeHour} 
                                onChange={onEndTimeHourChangeEventHandler}
                                className="  text-center"
                            />
                            <InputGroup.Text className="">:</InputGroup.Text>
                            <Form.Control 
                                id="minuteTimePicker" 
                                type="number" 
                                value={deadlineEndTimeMinute}
                                onChange={onEndTimeMinuteChangeEventHandler}
                                className="  text-center"
                            />
                        </> : null }
                    </InputGroup> : null
                }

                <InputGroup className="mb-3 d-flex">
                    <InputGroup.Text className="align-items-center">Tags</InputGroup.Text>
                    <ul className='d-flex align-items-center gap-2 form-control m-0 p-3' style={{overflowX: 'auto', flexWrap: 'wrap'}}>
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
                            className="w-auto flex-grow-1 border-0 p-0 rounded-0"
                        />
                    </ul>
                    <Button type='button' onClick={removeAllTag} variant="outline-light"><FontAwesomeIcon icon={faTrashCan} /></Button>
                </InputGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleEditModalToggle}>Cancel</Button>
                <Button variant="success" onClick={onTodoEditEventHandler}>Edit</Button>
            </Modal.Footer>
        </Modal>

        <Modal
            show={showDeleteModal}
            onHide={handleDeleteModalToggle}
            backdrop="static"
            centered
            keyboard={false}
            dialogClassName="custom-modal"
            data-bs-theme="dark"
        >
            <Modal.Header>
            <Modal.Title>{todoId} · {todoItem.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Are you sure you want to delete this item ?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteModalToggle}>
                Cancel
            </Button>
            <Button variant="danger" onClick={onTodoDeleteEventHandler}>Yes</Button>
            </Modal.Footer>
        </Modal>

        <Dropdown data-bs-theme="dark" className='ms-auto'>
            <Dropdown.Toggle variant="secondary" className='todo-item-option-button bg-dark text-white'><FontAwesomeIcon icon={faEllipsisVertical} /></Dropdown.Toggle>

            <Dropdown.Menu className="shadow rounded" align="end" style={{width: '195px'}}>
                {todoItem.tags.length !== 0 ? <>
                    <Dropdown.ItemText className='py-0'>
                        <p className='mb-2 d-flex align-items-center'>
                            <FontAwesomeIcon icon={faTags} className="me-1" size='sm' />
                            Tags 
                            <Badge bg='success' className='ms-auto'>{todoItem.tags.length}</Badge>
                        </p>
                        <ul className='d-flex flex-row align-items-center gap-2 m-0 p-0 w-100' style={{overflowX: 'scroll'}}>
                            {todoItem.tags.map((tag: string, index: number) => (
                                <li key={index} className='px-2 py-1 border rounded-1 text-nowrap'>{tag}</li>
                            ))}                        
                        </ul>
                    </Dropdown.ItemText>
                    <Dropdown.Divider />
                </> : null}
                <Dropdown.Item as="button" onClick={handleEditModalToggle}><FontAwesomeIcon icon={faPen} className="me-2" />Edit</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={handleDeleteModalToggle}><FontAwesomeIcon icon={faTrashCan} className="me-2" />Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </>
    );
};