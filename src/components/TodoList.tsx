import { memo, useState, useEffect } from 'react';
import { Todo } from '../App'
import TodoItem from './TodoItem'
import axios from 'axios';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  initialFilter?: 'all' | 'completed' | 'active';
}

const TodoList = memo(function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [weatherData, setWeatherData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setLoading(true);
    
    if (filter === 'all') {
      setFilteredTodos(todos);
    } else if (filter === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.completed));
    } else if (filter === 'active') {
      setFilteredTodos(todos.filter(todo => !todo.completed));
    } else {
      const sortedTodos = [...todos].sort((a, b) => a.text.localeCompare(b.text));
      setFilteredTodos(sortedTodos);
    }
    setLoading(false);
  }, [todos, filter]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Moscow');
        setWeatherData(`Погода: ${response.data.current.temp_c}°C`);
      } catch (err) {
        setError('Ошибка при загрузке погоды');
      }
    };
    
    fetchWeather();
  }, []);

  const handleToggle = (id: number) => {
    const updatedTodos = filteredTodos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setFilteredTodos(updatedTodos);
    onToggle(id);
  };

  const handleDelete = (id: number) => {
    setFilteredTodos(prevTodos => prevTodos.filter(t => t.id !== id));
    onDelete(id);
  };

  return (
    <div className="todo-list-container">
      {weatherData && <div className="weather-data">{weatherData}</div>}
      {error && <div className="error">{error}</div>}
      
      <div className="filters">
        <button 
          onClick={() => setFilter('all')} 
          className={filter === 'all' ? 'active' : ''}
        >
          Все
        </button>
        <button 
          onClick={() => setFilter('active')} 
          className={filter === 'active' ? 'active' : ''}
        >
          Активные
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={filter === 'completed' ? 'active' : ''}
        >
          Завершенные
        </button>
        <button onClick={() => setFilter('sort')}>Сортировать</button>
      </div>
      
      {loading ? (
        <div>Загрузка...</div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-list" style={{ color: 'red', margin: '20px 0' }}>Нет задач</div>
      ) : (
        <div className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={handleToggle} 
              onDelete={handleDelete} 
            />
          ))}
          
          <div className="stats">
            <p>Всего задач: {todos.length}</p>
            <p>Выполнено: {todos.filter(t => t.completed).length}</p>
            <p>Осталось: {todos.filter(t => !t.completed).length}</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default TodoList 