import { useState } from 'react';

import { SubTask } from '../utils/props';
import TodoCopyButton from './TodoCopyButton';
import SubtaskCode from './TodoSubtaskCode';

import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCaretRight, faCheck, faCircleXmark, faCropSimple, faLink, faMinus, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TodoTaskProps = {
    todoId: string;
    subTasks: SubTask[];
    onToggleSubTask: (id: string, subtaskId: number) => void;
}

export default function TodoTask({ todoId, subTasks, onToggleSubTask }: TodoTaskProps) {
    const currentTheme = localStorage.getItem('currentTheme') || 'mono';

    const getListIcon = (listStyle: string, status: boolean) => {
        let icon;

        switch (listStyle) {
            case "plus":
                icon = <FontAwesomeIcon icon={status ? faCheck : faMinus} />;
                break;

            case "checkbox":
                icon = <FontAwesomeIcon icon={status ? faSquareCheck : faSquare} />;
                break;

            case "xcircle":
                icon = <FontAwesomeIcon icon={status ? faCircleXmark : faCircle} />;
                break;

            case "link":
                icon = <FontAwesomeIcon icon={faLink} size='xs' />;
                break;

            case "caret":
                icon = <FontAwesomeIcon icon={faCaretRight} />;
                break;

            case "square":
                icon = <FontAwesomeIcon icon={faCropSimple} />;
                break;

            case "dot":
                icon = '•';
                break;

            default:
                icon = null;
        }

        return icon;
    };

    let totalSubtask = 0, completedSubtask = 0;

    subTasks.map((task: SubTask) => (
        task.completed ? completedSubtask++ : null
    ));

    subTasks.map((task: SubTask) => (
        task.listStyle !== 'text' &&
            task.listStyle !== 'link' &&
            task.listStyle !== 'caret' &&
            task.listStyle !== 'dot' &&
            task.listStyle !== 'square' &&
            task.listStyle !== 'code' ?
            totalSubtask++ : null
    ));

    return (
        <ul className='todo-subtask'>
            {totalSubtask !== 0 ?
                <li className='subtask-counter'>
                    <p>Sub-Tasks</p>
                    <p>
                        <sup>{completedSubtask}</sup>/<sub>{totalSubtask}</sub> - {((completedSubtask / totalSubtask) * 100).toString().slice(0, 4)}%
                        {
                            currentTheme === 'mono' ? null : completedSubtask !== totalSubtask ? '🔥' : '👏🎉'
                        }
                    </p>
                </li> : null
            }
            {Array.isArray(subTasks) && subTasks.map((task: SubTask, index) => (
                <li
                    key={index}
                    className={`subtask-item ${currentTheme === 'mono' ? 'mono-theme' : 'color-theme'}`}
                    style={{
                        paddingLeft: `${task.indent * 21}px`
                    }}>
                    {
                        task.listStyle === 'link' ||
                            task.listStyle === 'caret' ||
                            task.listStyle === 'dot' ||
                            task.listStyle === 'square' ?
                            <button
                                style={{
                                    marginRight: '5px',
                                    minWidth: '16px'
                                }}
                            >
                                {getListIcon(task.listStyle, task.completed)}
                            </button>
                            : task.listStyle !== 'text' && task.listStyle !== 'code' ?
                                <button
                                    onClick={() => onToggleSubTask(todoId, task.id)}
                                    style={{
                                        marginRight: '5px',
                                        minWidth: '16px'
                                    }}
                                >
                                    {getListIcon(task.listStyle, task.completed)}
                                </button>
                                : null
                    }

                    {
                        task.listStyle === 'code' ?
                            <SubtaskCode task={task} /> :
                            task.listStyle !== 'link' ? task.content :
                                <TodoCopyButton
                                    buttonText={task.content.replace(/^https?:\/\/|\/.*$/g, '')}
                                    copyText={task.content}
                                />
                    }
                </li>
            ))}
        </ul>
    );
};