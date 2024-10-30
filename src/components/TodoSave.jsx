import React, { useState, useEffect } from 'react';

import TodoNav from './TodoNav';
import TodoSaveInterface from './TodoSaveInterface';

const TodoSave = ({ setTodosData, setTab }) => {
    const [currentMethod, setCurrentMethod] = React.useState('get');
    const [updateData, setUpdateData] = React.useState('');

    const openGetMethod = () => { setCurrentMethod('get'); };
    const openPutMethod = () => { setCurrentMethod('put'); };
    const openDelMethod = () => { setCurrentMethod('del'); };

    const getData = () => {
        let saveData = localStorage.getItem('todoItems') || [];
        navigator.clipboard.writeText(saveData);
    };

    const putData = () => {
        localStorage.setItem("todoItems", updateData);
        setTodosData(JSON.parse(localStorage.getItem('todoItems')) || []);
    };

    const delData = () => {
        localStorage.removeItem("todoItems");
        setTodosData(JSON.parse(localStorage.getItem('todoItems')) || []);
    };

    return (
        <div className='todo-save'>
            <div>
                <p className='nav-title'>Local Storage</p>
                <TodoNav 
                    currentTab={'save'}
                    setTab={setTab}
                />
            </div>
            <div>
                <div className='method-list'>
                    <button onClick={openGetMethod}>GET</button>
                    <button onClick={openPutMethod}>PUT</button>
                    <button onClick={openDelMethod}>DEL</button>
                </div>
                <div className='interface-display'>
                    {currentMethod === 'get' && (
                        <TodoSaveInterface
                        methodLink={'https://kevinpratamasetiawan.github.io/💻/getSaveData'}
                        interfaceType={currentMethod}
                        buttonText={'GET Data'}
                        methodUsed={getData}
                        setUpdateData={setUpdateData}
                        />
                    )}
                    {currentMethod === 'put' && (
                        <TodoSaveInterface
                        methodLink={'https://kevinpratamasetiawan.github.io/💻/putSaveData'}
                        interfaceType={currentMethod}
                        buttonText={'PUT Data'}
                        methodUsed={putData}
                        setUpdateData={setUpdateData}
                        />
                    )}
                    {currentMethod === 'del' && (
                        <TodoSaveInterface
                        methodLink={'https://kevinpratamasetiawan.github.io/💻/delSaveData'}
                        interfaceType={currentMethod}
                        buttonText={'DEL Data'}
                        methodUsed={delData}
                        setUpdateData={setUpdateData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoSave;