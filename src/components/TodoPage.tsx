import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn, faChessRook } from '@fortawesome/free-solid-svg-icons';

import TodoTime from './TodoTime';
import TodoAddForm from './TodoAddForm';
import TodoStats from './TodoStats';
import TodoSave from './TodoSave';
import TodoDisplay from './TodoDisplay';
import TodoNotification from './TodoNotification';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { completedData } from '../utils/script';
import { todoItem, SubTask, NotificationProp } from '../utils/props';

export default function TodoPage () {
    // Handle Tab
    const [currentTab, setCurrentTab] = React.useState('time');

    // Handle ToDo Item
    const [todosData, setTodosData] = React.useState(
        () => {
            const storedData = localStorage.getItem("todoItems");
            return storedData ? JSON.parse(storedData) : [];
        }
    );

    const onTabChangeEventHandler = (tab: string) => {
        setCurrentTab(tab);
    };

    const addTodo = (newTodo: todoItem) => {
        // const updatedTodos = [...todosData, newTodo];
        const updatedTodos = [newTodo, ...todosData];

        updatedTodos.sort((a, b) => {
            const numA = parseInt(a.id.slice(2), 10);
            const numB = parseInt(b.id.slice(2), 10);
            return numB - numA;
        });

        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));

        createNotification(
            newTodo.id,
            1
        );
    };

    const toggleComplete = (todoId: string) => {
        const updatedTodos = todosData.map((todo: todoItem) => {
            if (todo.id === todoId) {
                const newCompleted = !todo.completed;

                todo.schedule ?
                createNotification(
                    todoId,
                    newCompleted ? 4 : 5,
                ) : 
                createNotification(
                    todoId,
                    newCompleted ? 8 : 9,
                );

                return { ...todo, completed: newCompleted };
            }
            return todo;
        });
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    };

    const togglePriority = (todoId: string) => {
        const updatedTodos = todosData.map((todo: todoItem) => {
            if (todo.id === todoId) {
                const newPriority = !todo.priority;

                createNotification(
                    todoId,
                    newPriority ? 6 : 7,
                );

                return { ...todo, priority: newPriority };
            }
            return todo;
        });

        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    };

    const toggleSubTaskComplete = (todoId: string, subtaskId: number) => {
        const updatedTodos = todosData.map((todo: todoItem) => {
            if (todo.id === todoId) {
                if (Array.isArray(todo.subTask)) {
                    const updatedSubTasks = todo.subTask.map((subtask: SubTask) => {
                        if (subtask.id === subtaskId) { 
                            const newCompletedStatus = !subtask.completed;

                            createNotification(
                                todoId,
                                newCompletedStatus ? 10 : 11,
                            );

                            return {...subtask, completed: newCompletedStatus};
                        }

                        return subtask;
                    });
                    return { ...todo, subTask: updatedSubTasks };
                }
            }
            return todo;
        });
    
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    };

    const editTodo = (todoId: string, edittedTodo: todoItem) => {
        const updatedTodos = todosData.map((todo: todoItem) =>
            todo.id === todoId ? edittedTodo : todo
        );
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));

        createNotification(
            edittedTodo.id,
            2
        );
    };

    const deleteTodo = (todoId: string) => {
        const updatedTodos = todosData.filter((todo: todoItem) => todo.id !== todoId);
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));

        createNotification(
            todoId,
            3
        );
    };

    // Handle Clock
    const today = new Date();
    const thisYear = new Date().getFullYear();

    const [currentTime, setCurrentTime] = useState(
        today.getHours().toString().padStart(2, '0') + ':' + 
        today.getMinutes().toString().padStart(2, '0') + ':' + 
        today.getSeconds().toString().padStart(2, '0')
    );

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(
                now.getHours().toString().padStart(2, '0') + ':' + 
                now.getMinutes().toString().padStart(2, '0') + ':' + 
                now.getSeconds().toString().padStart(2, '0') 
            );
        }, 1000);

        // Cleanup function
        return () => clearInterval(timer);
    }, []);

    // Handle Theme
    const [currentTheme, setCurrentTheme] = React.useState(localStorage.getItem('currentTheme') || 'mono');

    const onThemeChangeEventHandler = (chosenTheme: string) => {
        if(chosenTheme === 'color'){
            setCurrentTheme('color');
            localStorage.setItem('currentTheme', 'color');
            document.documentElement.style.setProperty('--schedule-color', '#a97bff');
            document.documentElement.style.setProperty('--schedule-half', '#d3bcfe');
            document.documentElement.style.setProperty('--priority-color', '#f85149');
            document.documentElement.style.setProperty('--priority-half', '#faa7a3');
            document.documentElement.style.setProperty('--task-color', '#f1e05a');
            document.documentElement.style.setProperty('--task-half', '#f7eeab');
            document.documentElement.style.setProperty('--complete-color', '#6bdd9a');
            document.documentElement.style.setProperty('--complete-half', '#b4edcb');
        }else if(chosenTheme === 'mono'){
            setCurrentTheme('mono');
            localStorage.setItem('currentTheme', 'mono');
            document.documentElement.style.setProperty('--schedule-color', '#fdfdfd');
            document.documentElement.style.setProperty('--schedule-half', '#fdfdfd');
            document.documentElement.style.setProperty('--priority-color', '#fdfdfd');
            document.documentElement.style.setProperty('--priority-half', '#fdfdfd');
            document.documentElement.style.setProperty('--task-color', '#fdfdfd');
            document.documentElement.style.setProperty('--task-half', '#fdfdfd');
            document.documentElement.style.setProperty('--complete-color', '#fdfdfd');
            document.documentElement.style.setProperty('--complete-half', '#fdfdfd');
        }
    };

    useEffect(() => {
        onThemeChangeEventHandler(currentTheme);
    }, []);

    // Handle Log Notification
    const [notifList, setNotifList] = React.useState<NotificationProp[]>([]);

    const createNotification = (todoId: string, actionType: number) => {
        const id = new Date().getTime();

        const newNotif = {
            todoId: todoId,
            id: id,
            actionType: actionType
        }

        const updatedNotifList = [...notifList, newNotif];
        setNotifList(updatedNotifList);
    };

    const closeNotification = (notifId: number) => {
        const updatedNotifList = notifList.filter((notif: NotificationProp) => notif.id !== notifId);
        setNotifList(updatedNotifList);
    };

    useEffect(() => {
        if (notifList.length === 0) return;

        const timer = setTimeout(() => {
            setNotifList((prev) => prev.slice(1));
        }, 30000);

        return () => clearTimeout(timer);
    }, [notifList])

    return (
        <div className='todo-page'>
            <div className='todo-header'>
                <div className='d-flex align-items-center gap-2'>
                    {/* <FontAwesomeIcon icon={faChessRook} size='lg' /> */}
                    {
                        currentTheme === 'mono' ?
                        <img src="./blue-profile.jpg" alt="Blue Profile Picture" className='rounded border border-white' style={{width: '45px', height: '45px'}} /> :
                        <img src="./red-profile.jpg" alt="Red Profile Picture" className='rounded border border-white' style={{width: '45px', height: '45px'}}/>
                    }
                    <div>
                        <p className='d-flex flex-column align-items-start fw-lighter fs-6 m-0'>Welcome back,
                            <span className='fw-bold fs-5 mb-0' style={{marginTop: '-10px'}}>KPS {thisYear}</span>
                        </p>
                    </div>
                </div>
                <div className='theme-toggle'>
                    {currentTheme === 'mono' ? <>
                        <div className='monochrome-theme'>
                            <span></span>
                            <span></span>
                        </div>
                        <button onClick={() => onThemeChangeEventHandler('color')}><FontAwesomeIcon icon={faToggleOff} size="2xl"/></button>                    
                    </> : 
                    <>
                        <div className='color-theme'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <button onClick={() => onThemeChangeEventHandler('mono')}><FontAwesomeIcon icon={faToggleOn} size="2xl"/></button>
                    </>
                    }
                </div>
            </div>
            
            {currentTab === 'time' && (
                <TodoTime 
                today={today}
                currentTime={currentTime}
                setTab={onTabChangeEventHandler}
                />
            )}
            {currentTab === 'add' && (
                <TodoAddForm 
                onAddTodo={addTodo}
                setTab={onTabChangeEventHandler}
                />
            )}
            {currentTab === 'stats' && (
                <TodoStats 
                todosData={[...todosData, ...completedData]}
                setTab={onTabChangeEventHandler}
                />
            )}
            {currentTab === 'save' && (
                <TodoSave 
                setTodosData={setTodosData}
                setTab={onTabChangeEventHandler}
                createNotification={createNotification}
                />
            )}
            <TodoDisplay
                todoItems={[...todosData, ...completedData]}
                onToggleComplete={toggleComplete}
                onTogglePriority={togglePriority}
                onEditTodo={editTodo}
                onDeleteTodo={deleteTodo}
                onToggleSubTask={toggleSubTaskComplete}
            />

            <ToastContainer className="position-fixed bottom-0 end-0 me-2 mb-4" style={{ zIndex: 1 }}>
                {notifList.map((notif, index) => (
                    <TodoNotification
                        key={index}
                        closeNotification={closeNotification}
                        todoId={notif.todoId}
                        notifId={notif.id}
                        actionType={notif.actionType}
                    />
                ))}
            </ToastContainer>
        </div>
    );
};