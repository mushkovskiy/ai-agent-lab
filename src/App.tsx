import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { useTodos } from './hooks/useTodos';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="app">
      <h1>Список задач</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList 
        todos={todos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo} 
      />
    </div>
  );
}

export default App;
