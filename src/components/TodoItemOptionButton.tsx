import React, { ReactNode, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

import { faEllipsisVertical, faPen, faTags, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubTask, TagProp, todoItem } from '../utils/props';
import { formatDate } from '../utils/script';
import TodoForm from './TodoForm';

type TodoItemProps = {
    todoItem: todoItem;
    onEditTodo: (id: string, edittedObject: todoItem) => void;
    onDeleteTodo: (id: string) => void;
}

export default function TodoItemOptionButton({ todoItem, onEditTodo, onDeleteTodo }: TodoItemProps) {
    const [todoId, setTodoId] = React.useState<string | ReactNode>(todoItem.id);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditModalToggle = () => {
        setTitle(todoItem.title);
        setDescription(todoItem.description);
        setSubTask(todoItem.subTask);
        setScheduleType(todoItem.scheduleType === '' ? '' : (todoItem.scheduleType === 'custom' ? 'custom' : todoItem.scheduleType));
        setCustomScheduleType(todoItem.scheduleType !== '' && todoItem.scheduleType !== 'custom' ? '' : todoItem.scheduleType);

        if (todoItem.deadlineStartDate !== 'noDeadlineStartDate') {
            setStartDeadlineDate(todoItem.deadlineStartDate);
        }

        if (todoItem.deadlineEndDate !== 'noDeadlineEndDate') {
            setEndDeadlineDate(todoItem.deadlineEndDate);
        }

        if (todoItem.deadlineStartTime !== 'noDeadlineStartTime') {
            const [startHour, startMinute] = todoItem.deadlineStartTime.split(':').map(Number);

            setStartDeadlineTimeHour(startHour);
            setStartDeadlineTimeMinute(startMinute);
        }

        if (todoItem.deadlineEndTime !== 'noDeadlineEndTime') {
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

    // Handle Preferred Id
    let [preferredId, setPreferredId] = React.useState(todoItem.id);

    // Handle Title
    const [title, setTitle] = React.useState(todoItem.title);

    // Handle Description
    const [description, setDescription] = React.useState(todoItem.description);

    // Handle Subtask
    const [subTask, setSubTask] = React.useState<SubTask[]>(todoItem.subTask);

    // Handle Schedule Type
    const [scheduleType, setScheduleType] = React.useState(todoItem.scheduleType);
    const [customScheduleType, setCustomScheduleType] = React.useState(todoItem.scheduleType);

    // Handle Deadline Time
    const [deadlineStartDate, setStartDeadlineDate] = React.useState(todoItem.deadlineStartDate !== 'noDeadlineStartDate' ? formatDate(new Date(todoItem.deadlineStartDate), 'YY-MM-DD') || '' : formatDate(new Date(), 'YY-MM-DD') || '');
    const [deadlineEndDate, setEndDeadlineDate] = React.useState(todoItem.deadlineEndDate !== 'noDeadlineEndDate' ? formatDate(new Date(todoItem.deadlineEndDate), 'YY-MM-DD') || '' : formatDate(new Date(), 'YY-MM-DD') || '');

    const [startHour, startMinute] = todoItem.deadlineStartTime !== 'noDeadlineStartTime' ? todoItem.deadlineStartTime.split(':').map(Number) : `${new Date().getHours()}:${new Date().getMinutes()}`.split(':').map(Number);
    const [endHour, endMinute] = todoItem.deadlineEndTime !== 'noDeadlineEndTime' ? todoItem.deadlineEndTime.split(':').map(Number) : `${new Date().getHours() + 1}:${new Date().getMinutes()}`.split(':').map(Number);

    const [deadlineStartTimeHour, setStartDeadlineTimeHour] = React.useState(startHour);
    const [deadlineStartTimeMinute, setStartDeadlineTimeMinute] = React.useState(startMinute);
    const [deadlineEndTimeHour, setEndDeadlineTimeHour] = React.useState(endHour);
    const [deadlineEndTimeMinute, setEndDeadlineTimeMinute] = React.useState(endMinute);

    // Handle Tag
    const [tag, setTag] = React.useState('');
    const [tagsList, setTagsList] = React.useState<TagProp[]>(todoItem.tags);

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
                    <TodoForm
                        key={2}
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

                <Dropdown.Menu className="shadow rounded" align="end" style={{ width: '195px' }}>
                    {todoItem.tags.length !== 0 ? <>
                        <Dropdown.ItemText className='py-0'>
                            <p className='mb-2 d-flex align-items-center'>
                                <FontAwesomeIcon icon={faTags} className="me-1" size='sm' />
                                Tags
                                <Badge bg='success' className='ms-auto'>{todoItem.tags.length}</Badge>
                            </p>
                            <ul className='d-flex flex-row align-items-center gap-2 m-0 p-0 w-100' style={{ overflowX: 'scroll' }}>
                                {todoItem.tags.map((tag: TagProp, index: number) => (
                                    <li
                                        key={index}
                                        className='px-2 py-1 border rounded-1 text-nowrap d-flex align-items-center gap-2'
                                        style={{
                                            border: `2px solid ${tag.labelColor}83`
                                        }}
                                    >
                                        <span
                                            className='rounded-circle'
                                            style={{
                                                backgroundColor: tag.labelColor,
                                                width: '10px',
                                                height: '10px'
                                            }}
                                        ></span>
                                        {tag.content}
                                    </li>
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