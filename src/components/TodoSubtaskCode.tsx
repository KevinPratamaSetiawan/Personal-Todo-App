import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { SubTask } from '../utils/props';
import TodoCopyButton from './TodoCopyButton';

import { faCompress, faCopy, faExpand, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TodoSubTaskCodeProps = {
    task: SubTask;
}

export default function SubtaskCode({ task }: TodoSubTaskCodeProps) {
    const [codeExpand, setCodeExpand] = useState(false);
    const [codeDark, setCodeDark] = useState(true);

    return (
        <div
            style={{
                position: 'relative',
                margin: '10px 0'
            }}
        >
            {task.content.split('\n').length > 5 ?
                <div
                    className='rounded-top rounded-bottom d-flex align-items-center justify-content-between px-3 py-2'
                    style={{
                        backgroundColor: '#3A404D',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 100,
                    }}
                >
                    <div className='d-flex gap-3'>
                        <TodoCopyButton
                            buttonText={<><FontAwesomeIcon icon={faCopy} /></>}
                            copyText={task.content}
                        />

                        <button type='button' onClick={() => setCodeDark(!codeDark)} style={{ width: '16px' }}>
                            <FontAwesomeIcon icon={codeDark ? faSun : faMoon} />
                        </button>

                        <button type='button' onClick={() => setCodeExpand(!codeExpand)}>
                            <FontAwesomeIcon icon={codeExpand ? faCompress : faExpand} />
                        </button>
                    </div>
                </div> :
                <TodoCopyButton
                    buttonText={<><FontAwesomeIcon icon={faCopy} /></>}
                    copyText={task.content}
                    floating={true}
                />
            }


            <SyntaxHighlighter
                style={codeDark ? dracula : atomOneLight}
                showLineNumbers={true}
                className='m-0 py-2 rounded'
                customStyle={{
                    maxHeight: `${codeExpand ? "none" : "95px"}`,
                    width: '100%',
                    minWidth: 'none'
                }}
            >
                {task.content}
            </SyntaxHighlighter>
        </div>
    );
};