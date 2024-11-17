import React, { useState } from 'react';

type TodoSaveInterfaceProps = {
    methodLink: string;
    interfaceType: string;
    buttonText: string;
    methodUsed: () => void;
    setUpdateData: React.Dispatch<React.SetStateAction<string>>;
}

export default function TodoSaveInterface ({ methodLink, interfaceType, buttonText, methodUsed, setUpdateData }: TodoSaveInterfaceProps) {
    const [updateValue, setUpdateValue] = useState('');

    const onUpdateDataChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateValue(event.target.value);
        setUpdateData(event.target.value);
    };

    return (
        <div className='todo-save-interface'>
            <div>
                <p className="method-link small">{methodLink}</p>
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
                    : JSON.stringify(JSON.parse(localStorage.getItem('todoItems') || '[]'), null, 2)
                }
            </pre>
            <div>                
                <button onClick={methodUsed} className='method-button'>{buttonText}</button>
            </div>
        </div>
    );
};