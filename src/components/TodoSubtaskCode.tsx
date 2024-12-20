import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { SubTask } from '../utils/props';
import TodoCopyButton from './TodoCopyButton';

import { faCompress, faCopy, faExpand, faMoon, faSun, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TodoSubTaskCodeProps = {
    task: SubTask;
}

export default function SubtaskCode({ task }: TodoSubTaskCodeProps) {
    const [codeExpand, setCodeExpand] = useState(1);
    const [codeDark, setCodeDark] = useState(true);

    return (
        <div>
            <div
                className={`rounded-top ${codeExpand % 3 === 0 ? 'rounded-bottom' : ''} d-flex align-items-center justify-content-between px-3 py-2`}
                style={{
                    backgroundColor: '#3A404D',
                }}
            >
                <span style={{fontSize: '0.8rem'}}>{'</>'}</span>
                <div className='d-flex gap-3'>
                    <TodoCopyButton
                        buttonText={<><FontAwesomeIcon icon={faCopy} /></>}
                        copyText={task.content}
                    />

                    <button type='button' onClick={() => setCodeDark(!codeDark)} style={{width: '16px'}}>
                        <FontAwesomeIcon icon={codeDark ? faSun : faMoon} />
                    </button>

                    <button type='button' onClick={() => setCodeExpand(codeExpand + 1)}>
                        <FontAwesomeIcon icon={codeExpand % 3 === 1 ? faExpand : codeExpand % 3 === 2 ? faWindowMinimize : faWindowMaximize} />
                    </button>
                </div>
            </div>

            <SyntaxHighlighter
                style={codeDark ? dracula : atomOneLight}
                showLineNumbers={true}
                className='m-0 px-0 rounded-bottom'
                customStyle={{
                    maxHeight: `${codeExpand % 3 === 1 ? "170px" : codeExpand % 3 === 2 ? "none" : "0"}`,
                    padding: `${codeExpand % 3 === 0 ? '0' : '12px 0'}`,
                    width: '100%',
                    minWidth: 'none'
                }}
            >
                {task.content}
            </SyntaxHighlighter>
        </div>
    );
};