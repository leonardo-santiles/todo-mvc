import React, { useState, useRef, useEffect } from 'react';
import { enterCode, escCode } from '../helpers/keycodes'

function Todo({ todo, todos, setTodos, isEditing, setEditingId }) {
  const [editingText, setEditingText] = useState(todo.text);
  const editInputEl = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputEl.current.focus();
    }
  });

  const editingClass = isEditing ? 'editing' : '';
  const completedClass = todo.completed ? 'completed' : '';


  const handletoggleInputChange = () => {
    setTodos(todos.map(el => {
      if (el.id === todo.id) {
        return {
          ...el,
          completed: !el.completed
        };
      }
      return el
    }));
  };

  const handleLabelDoubleClick = () => {
    setEditingId(todo.id);
  }

  const handleDestroyButton = () => {
    setTodos(todos.filter(el => (el.id !== todo.id)));
  };

  const handleEditingInputChange = event => {
    setEditingText(event.target.value)
  };

  const handleEditingInputKeyDown = event => {
    if (event.keyCode === enterCode) {
      setTodos(todos.map(el => {
        if (el.id === todo.id) {
          return {
            ...el,
            text: event.target.value
          };
        }
        return el
      }));

      setEditingId(null);
    };

    if (event.keyCode === escCode) {
      setEditingText(todo.text);
      setEditingId(null);
    };
  }

  return (
    <li className={`${editingClass} ${completedClass}`}>
      <div className='view'>
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handletoggleInputChange}
        />
        <label onDoubleClick={handleLabelDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleDestroyButton}></button>
      </div>
      {isEditing && (
        <input
          className="edit"
          ref={editInputEl}
          value={editingText}
          onChange={handleEditingInputChange}
          onKeyDown={handleEditingInputKeyDown}
        />
      )}
    </li>
  )
}

export default Todo
