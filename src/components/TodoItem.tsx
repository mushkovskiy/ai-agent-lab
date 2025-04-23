import { memo } from 'react';
import { Todo } from '../App'

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div 
        className="todo-text"
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </div>
      <button 
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
      >
        Удалить
      </button>
    </div>
  )
});

export default TodoItem 