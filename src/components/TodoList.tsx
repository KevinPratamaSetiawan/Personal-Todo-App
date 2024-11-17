import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faFolderClosed, faFolderOpen, faInbox, faBoxArchive, faArchway } from '@fortawesome/free-solid-svg-icons';

import TodoItem from './TodoItem';
import { todoItem, SubTask } from '../utils/props';

type TodoListProps = {
    id: string;
    todoItems: todoItem[];
    listName: string;
    listType: string;
    onToggleComplete: (id: string) => void;
    onTogglePriority: (id: string) => void;
    onDeleteTodo: (id: string) => void;
    onToggleSubTask: (id: string, subtaskId: number) => void;
}

export default function TodoList ({ id, todoItems, listName, listType, onToggleComplete, onTogglePriority, onDeleteTodo, onToggleSubTask}: TodoListProps) {
    function numberToRoman(num: number) {
        const romanNumerals = [
            { value: 1000, numeral: 'M' },
            { value: 900, numeral: 'CM' },
            { value: 500, numeral: 'D' },
            { value: 400, numeral: 'CD' },
            { value: 100, numeral: 'C' },
            { value: 90, numeral: 'XC' },
            { value: 50, numeral: 'L' },
            { value: 40, numeral: 'XL' },
            { value: 10, numeral: 'X' },
            { value: 9, numeral: 'IX' },
            { value: 5, numeral: 'V' },
            { value: 4, numeral: 'IV' },
            { value: 1, numeral: 'I' }
        ];
        
        let result = '∅';
      
        if (num !== 0){
          result = '';
        
          for (const { value, numeral } of romanNumerals) {
            while (num >= value) {
              result += numeral;
              num -= value;
            }
          } 
        }
          return result;
    }

    return (
        <details className='todo-list' id={id}>
            <summary>
                <h6>
                    <FontAwesomeIcon icon={faAnglesRight} />
                    {listType === 'completed' ? 
                        <>
                            <FontAwesomeIcon icon={faInbox} />
                            <FontAwesomeIcon icon={faBoxArchive} />
                        </>:
                        <>
                            <FontAwesomeIcon icon={faFolderClosed} />
                            <FontAwesomeIcon icon={faFolderOpen} />
                        </>
                    }
                    { listName }
                </h6>
                <span>
                    {numberToRoman(
                        todoItems.filter((item) => {
                            if (listType === 'schedule' && !item.completed && item.schedule) {
                                return true;
                            } else if (listType === 'priority' && !item.completed && item.priority && !item.schedule) {
                                return true;
                            } else if (listType === 'task' && !item.completed && !item.priority && !item.schedule) {
                                return true;
                            } else if (listType === 'completed' && item.completed) {
                                return true;
                            }
                            return false;
                        }).length
                    )}
                </span>
            </summary>

            <ul>
                {todoItems.map((item) => {
                    if (listType === 'schedule' && !item.completed && item.schedule) {
                        return <TodoItem 
                                    key={item.id}
                                    todoItem={item}
                                    onToggleComplete={onToggleComplete}
                                    onTogglePriority={onTogglePriority}
                                    onDeleteTodo={onDeleteTodo}
                                    onToggleSubTask={onToggleSubTask}
                                />;
                    } else if (listType === 'priority' && !item.completed && item.priority && !item.schedule) {
                        return <TodoItem 
                                    key={item.id}
                                    todoItem={item}
                                    onToggleComplete={onToggleComplete}
                                    onTogglePriority={onTogglePriority}
                                    onDeleteTodo={onDeleteTodo}
                                    onToggleSubTask={onToggleSubTask}
                                />;
                    } else if (listType === 'task' && !item.completed && !item.priority && !item.schedule) {
                        return <TodoItem 
                                    key={item.id}
                                    todoItem={item}
                                    onToggleComplete={onToggleComplete}
                                    onTogglePriority={onTogglePriority}
                                    onDeleteTodo={onDeleteTodo}
                                    onToggleSubTask={onToggleSubTask}
                                />;
                    } else if (listType === 'completed' && item.completed) {
                        return <TodoItem 
                                    key={item.id}
                                    todoItem={item}
                                    onToggleComplete={onToggleComplete}
                                    onTogglePriority={onTogglePriority}
                                    onDeleteTodo={onDeleteTodo}
                                    onToggleSubTask={onToggleSubTask}
                                />;
                    }
                    return null;
                })}
            </ul>
        </details>
    );
};