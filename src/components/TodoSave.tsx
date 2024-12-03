import React, { useState, useEffect } from 'react';

import TodoNav from './TodoNav';
import TodoSaveInterface from './TodoSaveInterface';

type TodoSaveProps = {
    setTodosData: React.Dispatch<React.SetStateAction<string>>;
    setTab: (tab: string) => void;
    createNotification: (todoId: string, actionType: number) => void;
}

export default function TodoSave ({ setTodosData, setTab, createNotification }: TodoSaveProps) {
    const [currentMethod, setCurrentMethod] = React.useState('get');
    const [updateData, setUpdateData] = React.useState<string>('');

    const openGetMethod = () => { setCurrentMethod('get'); };
    const openPutMethod = () => { setCurrentMethod('put'); };
    const openDelMethod = () => { setCurrentMethod('del'); };

    const getData = () => {
        let saveData = localStorage.getItem('todoItems') || '[]]';
        navigator.clipboard.writeText(saveData);

        createNotification(
            JSON.parse(saveData).length.toString().padStart(3, '0'),
            12
        );
    };

    const putData = () => {
        localStorage.setItem("todoItems", updateData);
        setTodosData(JSON.parse(localStorage.getItem('todoItems') || '[]'));
        // window.location.reload();

        createNotification(
            JSON.parse(localStorage.getItem('todoItems') || '[]').length.toString().padStart(3, '0'),
            13
        );
    };

    const delData = () => {
        createNotification(
            JSON.parse(localStorage.getItem('todoItems') || '[]').length.toString().padStart(3, '0'),
            14
        );

        localStorage.removeItem("todoItems");
        setTodosData(JSON.parse(localStorage.getItem('todoItems') || '[]'));
        // window.location.reload();
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
                        methodLink={'https://💻/getSaveData'}
                        interfaceType={currentMethod}
                        buttonText={'GET Data'}
                        methodUsed={getData}
                        setUpdateData={setUpdateData}
                        />
                    )}
                    {currentMethod === 'put' && (
                        <TodoSaveInterface
                        methodLink={'https://💻/putSaveData'}
                        interfaceType={currentMethod}
                        buttonText={'PUT Data'}
                        methodUsed={putData}
                        setUpdateData={setUpdateData}
                        />
                    )}
                    {currentMethod === 'del' && (
                        <TodoSaveInterface
                        methodLink={'https://💻/delSaveData'}
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