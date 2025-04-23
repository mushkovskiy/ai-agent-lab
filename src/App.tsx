import { useState } from 'react'  
import './App.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text, completed: false }
      ])
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

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
  )
}

export default App
