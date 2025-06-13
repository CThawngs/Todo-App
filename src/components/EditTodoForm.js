import React, { useState } from 'react'
import {validateInput} from './TodoForm.js';

export const EditTodoForm = ({editTodo, task}) => {
  const [value, setValue] = useState(task.task);
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const validationError = validateInput(value);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    editTodo(value, task.id);
    setValue("");
  }

  return (
    <form className='todoForm' onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <input 
        type='text' 
        className='todo-input' 
        value={value} 
        placeholder='Update Task' 
        onChange={(e) => {
          setValue(e.target.value); 
          setError("");
        }}
      />
      <button type='submit' className='todo-btn'>Update Task</button>
    </form>
  )
}