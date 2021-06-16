import React from 'react';
import { enterCode } from '../helpers/keycodes'

function TodoHeader({ inputText, setInputText, todos, setTodos }) {

  const handleChange = event => {
    setInputText(event.target.value);
  };

  const handleKeyDown = event => {
    const isEnter = event.keyCode === enterCode;
    const newText = inputText.trim();
    const isTextPresent = newText.length > 0;

    if (isEnter && isTextPresent) {
      const newTodo = {
        id: Date.now(),
        text: newText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  }

  return (
    <header className='header'>
      <h1>todos</h1>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </header>
  )
}

export default TodoHeader
