import { todoItem } from '../utils/props';
import TodoList from './TodoList';

type TodoDisplayProps = {
    todoItems: todoItem[];
    onToggleComplete: (id: string) => void;
    onTogglePriority: (id: string) => void;
    onEditTodo: (id: string, edittedObject: todoItem) => void;
    onDeleteTodo: (id: string) => void;
    onToggleSubTask: (id: string, subtaskId: number) => void;
}

export default function TodoDisplay  ({todoItems, onToggleComplete, onTogglePriority, onEditTodo, onDeleteTodo, onToggleSubTask}: TodoDisplayProps) {
    return (
        <div className='todo-display'>
            <TodoList 
                id={'todo-schedule'}
                todoItems={todoItems}
                listName={'Schedule'}
                listType={'schedule'}
                onToggleComplete={onToggleComplete}
                onTogglePriority={onTogglePriority}
                onEditTodo={onEditTodo}
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
                onEditTodo={onEditTodo}
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
                onEditTodo={onEditTodo}
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
                onEditTodo={onEditTodo}
                onDeleteTodo={onDeleteTodo}
                onToggleSubTask={onToggleSubTask}
            />
            <TodoList 
                id={'todo-instruction'}
                todoItems={todoItems}
                listName={'Instructions'}
                listType={'instruction'}
                onToggleComplete={onToggleComplete}
                onTogglePriority={onTogglePriority}
                onEditTodo={onEditTodo}
                onDeleteTodo={onDeleteTodo}
                onToggleSubTask={onToggleSubTask}
            />
        </div>
    );
};