import React from 'react';
import TodoList from './TodoList';

const TodoDisplay = ({todoItems, onToggleComplete, onTogglePriority, onDeleteTodo, onToggleSubTask}) => {
    return (
        <div className='todo-display'>
            <TodoList 
                id={'todo-schedule'}
                todoItems={todoItems}
                listName={'Schedule'}
                listType={'schedule'}
                onToggleComplete={onToggleComplete}
                onTogglePriority={onTogglePriority}
                onDeleteTodo={onDeleteTodo}
                onToggleSubTask={onToggleSubTask}
            />
            <TodoList 
                id={'todo-priority'}
                todoItems={todoItems}
                listName={'Priority'}
                listType={'priority'}
                onToggleComplete={onToggleComplete}
                onTogglePriority={onTogglePriority}
                onDeleteTodo={onDeleteTodo}
                onToggleSubTask={onToggleSubTask}
            />
            <TodoList 
                id={'todo-items'}
                todoItems={todoItems}
                listName={'Task'}
                listType={'task'}
                onToggleComplete={onToggleComplete}
                onTogglePriority={onTogglePriority}
                onDeleteTodo={onDeleteTodo}
                onToggleSubTask={onToggleSubTask}
            />
            <TodoList 
                id={'todo-finish'}
                todoItems={todoItems}
                listName={'Completed'}
                listType={'completed'}
                onToggleComplete={onToggleComplete}
                onTogglePriority={onTogglePriority}
                onDeleteTodo={onDeleteTodo}
                onToggleSubTask={onToggleSubTask}
            />
        </div>
    );
};

export default TodoDisplay;