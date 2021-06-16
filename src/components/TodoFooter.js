import React from 'react'

function TodoFooter({ todos, setTodos, filter, setFilter }) {
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const noTodosClass = todos.length === 0 ? 'hidden' : '';
  const itemsLeft = `item${activeTodos !== 1 ? 's' : ''} left`;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const isAnyTodoCompleted = completedTodos > 0 ? 'clear-completed' : 'hidden'

  const getSelectedClass = (filterName) => {
    return filter === filterName ? 'selected' : '';
  };

  const handleFilterClick = (event, filterName) => {
    event.preventDefault();
    setFilter(filterName);
  };

  const handleClearCompleteButton = () => {
    setTodos(todos.filter(el => (el.completed === false)))
  }

  return (
    <footer className={`footer ${noTodosClass}`}>
      <span className='todo-count'>
        <strong>{activeTodos}</strong>
        &nbsp;
        {itemsLeft}
      </span>
      <ul className='filters'>
        <li>
          <a
            href='/'
            className={getSelectedClass('all')}
            onClick={event => handleFilterClick(event, 'all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href='/'
            className={getSelectedClass('active')}
            onClick={event => handleFilterClick(event, 'active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href='/'
            className={getSelectedClass('completed')}
            onClick={event => handleFilterClick(event, 'completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className={`${isAnyTodoCompleted}`}
        onClick={handleClearCompleteButton}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default TodoFooter
