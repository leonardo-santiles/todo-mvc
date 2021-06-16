import React from 'react';
import Todo from './Todo';

function TodoList({ todos, setTodos, editingText, setEditingText, editingId, setEditingId, filteredTodos }) {
  const noSectionClass = todos.length === 0 ? "hidden" : "";
  const isAllTodosCompleted = todos.every((todo) => todo.completed === true);

  const handleInputChange = event => {
    setTodos(todos.map(el => ({
      ...el,
      completed: event.target.checked
    })));
  }
  return (
    <section className={`main ${noSectionClass}`}>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={isAllTodosCompleted}
        onChange={handleInputChange}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className='todo-list'>
        {filteredTodos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
          />))}
      </ul>
    </section>
  )
};

export default TodoList
