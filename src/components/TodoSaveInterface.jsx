import React, { useState } from 'react';

const TodoSaveInterface = ({ methodLink, interfaceType, buttonText, methodUsed, setUpdateData }) => {
    const [updateValue, setUpdateValue] = useState('');

    const onUpdateDataChangeEventHandler = (event) => {
        setUpdateValue(event.target.value);
        setUpdateData(event.target.value);
    };

    return (
        <div className='todo-save-interface'>
            <div>
                <p className="method-link">{methodLink}</p>
            </div>
            {interfaceType === 'put' && (
                <form>
                    <input
                        id="update"
                        className='input-box'
                        type="text"
                        value={updateValue}
                        onChange={onUpdateDataChangeEventHandler}
                        placeholder='Paste Your Save Data Here...'
                    />
                </form>
            )}
            <pre id="save-display" className="save-display">
                {interfaceType === 'put' 
                    ? updateValue || '' 
                    : JSON.stringify(JSON.parse(localStorage.getItem('todoItems')) || [], null, 2)}
            </pre>
            <div>                
                <button onClick={methodUsed} className='method-button'>{buttonText}</button>
            </div>
        </div>
    );
};

export default TodoSaveInterface;