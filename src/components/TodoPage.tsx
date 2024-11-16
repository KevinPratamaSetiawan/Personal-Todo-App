import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn, faChessRook } from '@fortawesome/free-solid-svg-icons';

import TodoTime from './TodoTime';
import TodoForm from './TodoForm';
import TodoStats from './TodoStats';
import TodoSave from './TodoSave';
import TodoDisplay from './TodoDisplay';
import { completedData } from '../utils/script';
import { todoItem, SubTask } from '../utils/props';

export default function TodoPage () {
    const today = new Date();
    const [currentTab, setCurrentTab] = React.useState('time');
    const [currentTheme, setCurrentTheme] = React.useState(localStorage.getItem('currentTheme') || 'mono');

    const [todosData, setTodosData] = React.useState(
        () => {
            const storedData = localStorage.getItem("todoItems");
            return storedData ? JSON.parse(storedData) : [];
        }
    );

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

    const onTabChangeEventHandler = (tab: string) => {
        setCurrentTab(tab);
    };

    const thisYear = new Date().getFullYear();

    const addTodo = (newTodo: todoItem) => {
        // const updatedTodos = [...todosData, newTodo];
        const updatedTodos = [newTodo, ...todosData];
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    };

    const toggleComplete = (todoId: string) => {
        const updatedTodos = todosData.map((todo: todoItem) =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    };

    const togglePriority = (todoId: string) => {
        const updatedTodos = todosData.map((todo: todoItem) =>
            todo.id === todoId ? { ...todo, priority: !todo.priority } : todo
        );
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    };

    const deleteTodo = (todoId: string) => {
        const updatedTodos = todosData.filter((todo: todoItem) => todo.id !== todoId);
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    };

    const toggleSubTaskComplete = (todoId: string, subtaskId: number) => {
        const updatedTodos = todosData.map((todo: todoItem) => {
            if (todo.id === todoId) {
                if (Array.isArray(todo.subTask)) {
                    const updatedSubTasks = todo.subTask.map((subtask: SubTask) => 
                        subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
                    );
                    return { ...todo, subTask: updatedSubTasks };
                }
            }
            return todo;
        });
    
        setTodosData(updatedTodos);
        localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    };

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
        }, 143);

        // Cleanup function
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        onThemeChangeEventHandler(currentTheme);
    }, []);

    return (
        <div className='todo-page'>
            <div className='todo-header'>
                <h3 className='app-title'><FontAwesomeIcon icon={faChessRook} size='lg' /> KPS {thisYear}</h3>
                    {currentTheme === 'mono' && (
                        <div className='theme-toggle'>
                            <div className='monochrome-theme'>
                                <span></span>
                                <span></span>
                            </div>
                            <button onClick={() => onThemeChangeEventHandler('color')}><FontAwesomeIcon icon={faToggleOff} size="2xl"/></button>
                        </div>
                    )}
                    {currentTheme === 'color' && (
                        <div className='theme-toggle'>
                            <div className='color-theme'>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <button onClick={() => onThemeChangeEventHandler('mono')}><FontAwesomeIcon icon={faToggleOn} size="2xl"/></button>
                        </div>
                    )}
            </div>
            {currentTab === 'time' && (
                <TodoTime 
                today={today}
                currentTime={currentTime}
                setTab={onTabChangeEventHandler}
                />
            )}
            {currentTab === 'add' && (
                <TodoForm 
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
                />
            )}
            <TodoDisplay
                todoItems={[...todosData, ...completedData]}
                onToggleComplete={toggleComplete}
                onTogglePriority={togglePriority}
                onDeleteTodo={deleteTodo}
                onToggleSubTask={toggleSubTaskComplete}
            />
        </div>
    );
};