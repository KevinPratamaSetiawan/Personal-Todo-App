import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaste, faSquareCheck, faCircleXmark, faListCheck, faX, faSquareXmark, faAnglesRight, faTrashCan, faCaretDown, faCaretUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import TodoNav from './TodoNav';
import TodoForm from './TodoForm';
import { formatDate } from '../utils/script';
import { completedData } from '../utils/script';
import { todoItem, SubTask, TagProp } from '../utils/props';

type TodoAddFormProps = {
    onAddTodo: (newTodo: todoItem) => void;
    setTab: (tab: string) => void;
}

export default function TodoAddForm({ onAddTodo, setTab }: TodoAddFormProps) {
    // Handle Preferred Id
    let [preferredId, setPreferredId] = React.useState('');

    // Handle Title
    const [title, setTitle] = React.useState('');

    // Handle Description
    const [description, setDescription] = React.useState('');

    // Handle Subtask
    const [subTask, setSubTask] = React.useState<SubTask[]>([]);

    // Handle Schedule Type
    const [scheduleType, setScheduleType] = React.useState('');
    const [customScheduleType, setCustomScheduleType] = React.useState('');

    // Handle Deadline Time
    const [deadlineStartDate, setStartDeadlineDate] = React.useState(formatDate(new Date(), 'YY-MM-DD') || '');
    const [deadlineEndDate, setEndDeadlineDate] = React.useState(formatDate(new Date(), 'YY-MM-DD') || '');
    const [deadlineStartTimeHour, setStartDeadlineTimeHour] = React.useState(new Date().getHours());
    const [deadlineStartTimeMinute, setStartDeadlineTimeMinute] = React.useState(new Date().getMinutes());
    const [deadlineEndTimeHour, setEndDeadlineTimeHour] = React.useState(new Date().getHours() + 1);
    const [deadlineEndTimeMinute, setEndDeadlineTimeMinute] = React.useState(new Date().getMinutes());

    // Handle Tag
    const [tag, setTag] = React.useState('');
    const [tagsList, setTagsList] = React.useState<TagProp[]>([]);

    const onPasteEventHandler = () => {
        const text = title.split('=>').map(str => str.trim());

        if (text.length > 0) {
            setPreferredId(text[0])
            setTitle(text[2] || '');
            setDescription(text[3] || '');
            setSubTask(text[4] === 'noSubtask' ? [] : JSON.parse(text[4]) || []);
            setScheduleType(text[1] === '' ? '' : (text[1] === 'custom' ? 'custom' : text[1]));
            setCustomScheduleType(text[1] !== '' && text[1] !== 'custom' ? '' : text[1]);

            if (text[5] !== 'noDeadlineStartDate') {
                setStartDeadlineDate(text[5]);
            }

            if (text[6] !== 'noDeadlineEndDate') {
                setEndDeadlineDate(text[6]);
            }

            if (text[7] !== 'noDeadlineStartTime') {
                const [startHour, startMinute] = text[7].split(':').map(Number);

                setStartDeadlineTimeHour(startHour);
                setStartDeadlineTimeMinute(startMinute);
            }

            if (text[8] !== 'noDeadlineEndTime') {
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

        if (scheduleType !== '') {
            document.getElementById('timePickerLabel')!.classList.remove('time-picker-under');
            document.getElementById('timePickerLabel')!.classList.remove('time-picker-over');
        }

        const updatedSubTasks = subTask.filter(task => task.content !== "");

        if (!title.trim()) {
            document.getElementById('titleLabel')!.classList.add('title-empty');
        }

        if (scheduleType !== '') {
            if (deadlineStartTimeHour < 1 || deadlineStartTimeMinute < 0 || deadlineEndTimeHour < 1 || deadlineEndTimeMinute < 0) {
                document.getElementById('timePickerLabel')!.classList.add('time-picker-under');
            }

            if (deadlineStartTimeHour > 23 || deadlineStartTimeMinute > 60 || deadlineEndTimeHour > 23 || deadlineEndTimeMinute > 60) {
                document.getElementById('timePickerLabel')!.classList.add('time-picker-over');
            }
        }

        if (scheduleType === 'custom' && customScheduleType === '') {
            document.getElementById('scheduleOptionsLabel')!.classList.add('schedule-type-empty')
        } else if (title.trim()) {
            let todoId
            const storedData = localStorage.getItem("todoItems") || '[]';
            const items = [...JSON.parse(storedData), ...completedData];

            if (preferredId !== '') {
                items.forEach((todo: todoItem) => {
                    if (todo.id === preferredId) {
                        preferredId = '';
                    }
                });
            }

            if (preferredId === '') {
                if (items.length === 0) {
                    todoId = 'N-' + (items.length + 1).toString().padStart(4, '0');
                } else {
                    todoId = 'N-' + (parseInt(items[0].id.slice(2), 10) + 1).toString().padStart(4, '0');
                }
            } else {
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
            setStartDeadlineDate(formatDate(new Date(), 'YY-MM-DD') || '');
            setEndDeadlineDate(formatDate(new Date(), 'YY-MM-DD') || '');
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

            <div className='mt-3 w-100' data-bs-theme="dark">
                <TodoForm
                    key={1}
                    preferredId={preferredId}
                    setPreferredId={setPreferredId}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    subTask={subTask}
                    setSubTask={setSubTask}
                    scheduleType={scheduleType}
                    setScheduleType={setScheduleType}
                    customScheduleType={customScheduleType}
                    setCustomScheduleType={setCustomScheduleType}
                    deadlineStartDate={deadlineStartDate}
                    setStartDeadlineDate={setStartDeadlineDate}
                    deadlineEndDate={deadlineEndDate}
                    setEndDeadlineDate={setEndDeadlineDate}
                    deadlineStartTimeHour={deadlineStartTimeHour}
                    setStartDeadlineTimeHour={setStartDeadlineTimeHour}
                    deadlineStartTimeMinute={deadlineStartTimeMinute}
                    setStartDeadlineTimeMinute={setStartDeadlineTimeMinute}
                    deadlineEndTimeHour={deadlineEndTimeHour}
                    setEndDeadlineTimeHour={setEndDeadlineTimeHour}
                    deadlineEndTimeMinute={deadlineEndTimeMinute}
                    setEndDeadlineTimeMinute={setEndDeadlineTimeMinute}
                    tag={tag}
                    setTag={setTag}
                    tagsList={tagsList}
                    setTagsList={setTagsList}
                />
            </div>

            <InputGroup className='w-100 d-flex align-items-center justify-content-end gap-2'>
                <Button type='button' onClick={onPasteEventHandler} variant="outline-light" className='' style={{ width: '20%', borderRadius: '5px' }}><FontAwesomeIcon icon={faPaste} /></Button>
                <Button type='button' onClick={onAddTodoEventHandler} variant="outline-light" className='' style={{ width: '20%', borderRadius: '5px' }}><FontAwesomeIcon icon={faPlus} /></Button>
            </InputGroup>
        </div>
    );
};