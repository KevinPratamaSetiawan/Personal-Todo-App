import { faAnglesRight, faCaretDown, faCaretUp, faEllipsisVertical, faListCheck, faPlus, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextareaAutosize from "react-textarea-autosize";

import { SubTask, TagProp } from '../utils/props';

type TodoFormProps = {
    preferredId: string;
    setPreferredId: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    subTask: SubTask[];
    setSubTask: React.Dispatch<React.SetStateAction<SubTask[]>>;
    scheduleType: string;
    setScheduleType: React.Dispatch<React.SetStateAction<string>>;
    customScheduleType: string;
    setCustomScheduleType: React.Dispatch<React.SetStateAction<string>>;
    deadlineStartDate: string;
    setStartDeadlineDate: React.Dispatch<React.SetStateAction<string>>;
    deadlineEndDate: string;
    setEndDeadlineDate: React.Dispatch<React.SetStateAction<string>>;
    deadlineStartTimeHour: number;
    setStartDeadlineTimeHour: React.Dispatch<React.SetStateAction<number>>;
    deadlineStartTimeMinute: number;
    setStartDeadlineTimeMinute: React.Dispatch<React.SetStateAction<number>>;
    deadlineEndTimeHour: number;
    setEndDeadlineTimeHour: React.Dispatch<React.SetStateAction<number>>;
    deadlineEndTimeMinute: number;
    setEndDeadlineTimeMinute: React.Dispatch<React.SetStateAction<number>>;
    tag: string;
    setTag: React.Dispatch<React.SetStateAction<string>>;
    tagsList: TagProp[];
    setTagsList: React.Dispatch<React.SetStateAction<TagProp[]>>;
};

export default function TodoForm({ preferredId, setPreferredId, title, setTitle, description, setDescription, subTask, setSubTask, scheduleType, setScheduleType, customScheduleType, setCustomScheduleType, deadlineStartDate, setStartDeadlineDate, deadlineEndDate, setEndDeadlineDate, deadlineStartTimeHour, setStartDeadlineTimeHour, deadlineStartTimeMinute, setStartDeadlineTimeMinute, deadlineEndTimeHour, setEndDeadlineTimeHour, deadlineEndTimeMinute, setEndDeadlineTimeMinute, tag, setTag, tagsList, setTagsList }: TodoFormProps) {
    // Handle Preferred Id
    const onPreferredIdChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setPreferredId(event.target.value); };

    // Handle Title
    const onTitleChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setTitle(event.target.value); };

    // Handle Description
    const onDescriptionChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(event.target.value); };

    // Handle Subtask
    const addSubTask = () => {
        setSubTask(prevSubTask => [
            ...prevSubTask,
            { id: new Date().getTime() , content: "", completed: false, listStyle: "text", indent: 0 }
        ]);
    };

    const delSubTask = (event: React.MouseEvent, index: number) => {
        const updatedSubTasks = [...subTask];
        updatedSubTasks.splice(index, 1);
        setSubTask(updatedSubTasks);
    };

    const onSubTaskContentChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
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

        if (method === 'up') {
            [updatedSubtask[currentIndex - 1], updatedSubtask[currentIndex]] = [updatedSubtask[currentIndex], updatedSubtask[currentIndex - 1]];
        } else if (method === 'add') {
            updatedSubtask.splice(currentIndex + 1, 0,
                { id: new Date().getTime(), content: "", completed: false, listStyle: updatedSubtask[currentIndex].listStyle, indent: updatedSubtask[currentIndex].indent }
            )
        } else if (method === 'down') {
            [updatedSubtask[currentIndex + 1], updatedSubtask[currentIndex]] = [updatedSubtask[currentIndex], updatedSubtask[currentIndex + 1]];
        }

        setSubTask(updatedSubtask);
    };

    // Handle Schedule Type
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
    const onStartDateChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setStartDeadlineDate(event.target.value);
    };

    const onEndDateChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDeadlineDate(event.target.value);
    };

    const onStartTimeHourChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStartDeadlineTimeHour(parseFloat(event.target.value));
    };

    const onStartTimeMinuteChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStartDeadlineTimeMinute(parseFloat(event.target.value));
    };

    const onEndTimeHourChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEndDeadlineTimeHour(parseFloat(event.target.value));
    };

    const onEndTimeMinuteChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEndDeadlineTimeMinute(parseFloat(event.target.value));
    };

    // Handle Tag
    const onTagChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value);
    };

    const onAddTagEventHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (tag.trim()) {
                const newTags = tag
                    .split(',')
                    .map(tag => tag.trim())
                    .filter(tag => tag !== "")
                    .map(tag => ({ "content": tag, "labelColor": '#23272d' }));

                let updatedTagsList = [...tagsList, ...newTags];
                updatedTagsList = Array.from(new Map(updatedTagsList.map(tag => [tag.content, tag])).values());

                setTagsList(updatedTagsList);
                setTag('');
            }
        }
    };

    const onTagColorChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedTagsList = [...tagsList];
        updatedTagsList[index].labelColor = event.target.value;
        setTagsList(updatedTagsList);
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
                {/* {preferredId !== '' ? <>
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
                } */}
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
                    style={{ resize: 'none' }}
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
                <InputGroup className="mb-3" key={index + "-subtask"}>
                    <Form.Select
                        id="listIndentOptions"
                        value={task.indent}
                        onChange={(e) => onSubTaskListIndentChangeEventHandler(e, index)}
                        aria-label="Subtask Indent Select"
                        className="bg-dark text-white"
                        style={{ width: '12%', padding: '0', backgroundImage: 'none' }}
                    >
                        {Array.from({ length: 6 }, (_, i) => i).map(indent => (
                            <option key={indent} value={indent}>{indent.toString().padStart(2, '0')}</option>
                        ))}
                    </Form.Select>
                    <Form.Select
                        id="listStyleOptions"
                        value={task.listStyle}
                        onChange={(e) => onSubTaskListStyleChangeEventHandler(e, index)}
                        aria-label="Subtask Style Select"
                        className="bg-dark text-white"
                        style={{ width: '12%', padding: '0', backgroundImage: 'none' }}
                    >
                        <option disabled className='text-start'>Text</option>
                            <option value="text">Str</option>
                            <option value="link">#</option>
                            <option value="demureCode">{"<>"}</option>
                            <option value="code">{"</>"}</option>
                        <option disabled className='text-start'>Checklist</option>
                            <option value="checkbox">=</option>
                            <option value="xcircle">*</option>
                            <option value="plus">-</option>
                        <option disabled className='text-start'>Bulleted</option>
                            <option value="caret">{">"}</option>
                            <option value="dot">•</option>
                            <option value="square">□</option>
                    </Form.Select>
                    <TextareaAutosize
                        value={task.content}
                        onChange={(e) => onSubTaskContentChangeEventHandler(e, index)}
                        placeholder={`Subtask ${index + 1}`}
                        aria-label="Text input for subtask content"
                        className="form-control"
                        minRows={1}
                        maxRows={5}
                        style={{ resize: 'none' }}
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

                        <Dropdown.Menu data-bs-theme="dark" className="shadow rounded" align="end" style={{ width: '195px' }}>
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
                                <FontAwesomeIcon icon={faPlus} className="me-2" style={{ markerStart: '-2px' }} />
                                Add Below
                            </Dropdown.Item>
                            {index !== subTask.length - 1 ? <>
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

                    style={{ width: '30%' }}
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
                                style={{ width: '100%' }}
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
                    <Form.Select
                        id="hourTimePicker"
                        value={deadlineStartTimeHour}
                        onChange={onStartTimeHourChangeEventHandler}
                        className="bg-dark text-white text-center flex-grow-1 no-icon"
                    >
                        {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                            <option key={hour} value={hour}>
                                {hour.toString().padStart(2, '0')}
                            </option>
                        ))}
                    </Form.Select>
                    <InputGroup.Text className="text-white">:</InputGroup.Text>
                    <Form.Select
                        id="minuteTimePicker"
                        value={deadlineStartTimeMinute}
                        onChange={onStartTimeMinuteChangeEventHandler}
                        className="bg-dark text-white text-center flex-grow-1 no-icon"
                    >
                        {Array.from({ length: 60 }, (_, i) => i).map(hour => (
                            <option key={hour} value={hour}>
                                {hour.toString().padStart(2, '0')}
                            </option>
                        ))}
                    </Form.Select>
                    {scheduleType !== '[A]' ? <>
                        <InputGroup.Text className=""><FontAwesomeIcon icon={faAnglesRight} /></InputGroup.Text>
                        <Form.Select
                            id="hourTimePicker"
                            value={deadlineEndTimeHour}
                            onChange={onEndTimeHourChangeEventHandler}
                            className="bg-dark text-white text-center flex-grow-1 no-icon"
                        >
                            {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                                <option key={hour} value={hour}>
                                    {hour.toString().padStart(2, '0')}
                                </option>
                            ))}
                        </Form.Select>
                        <InputGroup.Text className="text-white">:</InputGroup.Text>
                        <Form.Select
                            id="minuteTimePicker"
                            value={deadlineEndTimeMinute}
                            onChange={onEndTimeMinuteChangeEventHandler}
                            className="bg-dark text-white text-center flex-grow-1 no-icon"
                        >
                            {Array.from({ length: 60 }, (_, i) => i).map(hour => (
                                <option key={hour} value={hour}>
                                    {hour.toString().padStart(2, '0')}
                                </option>
                            ))}
                        </Form.Select>
                    </> : null}
                </InputGroup> : null
            }

            <InputGroup className="mb-3 d-flex">
                <InputGroup.Text className="align-items-center">Tags</InputGroup.Text>
                <ul className='d-flex align-items-center gap-2 form-control m-0 p-3' style={{ overflowX: 'auto', flexWrap: 'wrap' }}>
                    {tagsList.map((tag: TagProp, index: number) => (
                        <li
                            key={index}
                            className='px-2 py-1 border rounded-1 d-flex align-items-center gap-2'
                        >
                            <input
                                value={tag.labelColor}
                                onChange={(e) => onTagColorChangeEventHandler(e, index)}
                                type="color"
                                className=''
                                style={{ width: '30px', height: '20px' }}
                            />
                            <datalist>
                                <option value=""></option>
                            </datalist>
                            {tag.content}
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
        </>
    );
};