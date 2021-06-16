import React, { useState, useEffect } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const getLocalTodos = () => {
      if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify([]));
      } else {
        setTodos(JSON.parse(localStorage.getItem('todos')))
      }
    };

    getLocalTodos();
  }, [])

  useEffect(() => {
    const handleFilterChange = () => {
      switch (filter) {
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case 'active':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };

    const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    handleFilterChange();
    saveLocalTodos();
  }, [todos, filter]);

  return (
    <div className="todoapp">
      <TodoHeader
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        editingId={editingId}
        setEditingId={setEditingId}
        filteredTodos={filteredTodos}
      />
      <TodoFooter
        todos={todos}
        setTodos={setTodos}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;
