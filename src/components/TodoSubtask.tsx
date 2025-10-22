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
            task.listStyle !== 'code' &&
            task.listStyle !== 'border' ?
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
                        // paddingLeft: `${task.listStyle === 'code' || task.listStyle === 'link' ? task.indent * 21 : null}px` 
                    }}>
                    {/* {
                        task.indent > 0 && task.listStyle !== 'code' && task.listStyle !== 'link' ?
                            <aside
                                style={{
                                    marginLeft: `${(task.indent - 1) * 21}px`,
                                    marginRight: '5px',
                                    width: '16px',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    textWrap: 'nowrap',
                                }}>
                                {
                                    subTasks[index+1]?.indent === task.indent ? 
                                    '┣━' : '┗━'
                                }
                            </aside>
                        : null
                    } */}

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
                            </button> :

                            task.listStyle !== 'text' && task.listStyle !== 'code' && task.listStyle !== 'border' ?
                                <button
                                    onClick={() => onToggleSubTask(todoId, task.id)}
                                    style={{
                                        marginRight: '5px',
                                        minWidth: '16px'
                                    }}
                                >
                                    {getListIcon(task.listStyle, task.completed)}
                                </button> : null
                    }

                    {
                        task.listStyle === 'code' ?
                            <SubtaskCode task={task} /> :

                            task.listStyle === 'link' ?
                                <TodoCopyButton
                                    buttonText={task.content.replace(/^https?:\/\/|\/.*$/g, '')}
                                    copyText={task.content}
                                /> :

                                task.listStyle === 'border' ?
                                    // <div
                                    //     className='w-100'
                                    //     style={{
                                    //         height: '4px',
                                    //         backgroundColor: '#4b4b4b',
                                    //         // borderTop: '1px solid white',
                                    //         // borderBottom: '1px solid white'
                                    //     }}
                                    // ></div>
                                    <div className={`w-100 d-flex align-items-center gap-1`}>
                                        <div style={{ flex: '1', minHeight: '2px', backgroundColor: '#e0e0e0' }}></div>
                                        {/* <p style={{ fontSize: '12px', color: '#6b6b6b', }}>{task.content !== 'Section Divider' ? task.content : 'Section Divider'}</p> */}
                                        {/* {task.content !== 'Section Divider' && <p style={{ fontSize: '16px', color: '#ffffff', }}>{task.content}</p>} */}
                                        <p
                                            style={{
                                                fontSize: `${task.content !== 'Section Divider' ? '16px' : '12px'}`,
                                                color: `${task.content !== 'Section Divider' ? '#ffffff' : '#6b6b6b'}`
                                            }}
                                        >
                                            {task.content}
                                        </p>
                                        <div style={{ flex: '1', minHeight: '2px', backgroundColor: '#e0e0e0' }}></div>
                                    </div>
                                    :

                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: task.content.replace(/`([^`]*)`/g, (_, code) => `<span class='shortcut-highlight'>${code}</span>`)
                                        }}
                                    ></div>
                    }
                </li>
            ))}
        </ul>
    );
};