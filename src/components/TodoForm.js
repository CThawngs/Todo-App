import React, { useState } from 'react'

// Function to validate input
export const validateInput = (input) => {
  // Regex to check for special characters
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  
  // Check for empty input
  if (!input.trim()) {
    return "Task cannot be empty";
  }
  
  // Check for special characters
  if (specialCharRegex.test(input)) {
    return "Special characters are not allowed";
  }

  return "";
}

export const TodoForm = ({addTodo}) => {
  // State to store input value
  const [value, setValue] = useState("");
  // State to store error message
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    
    // Validate input
    const validationError = validateInput(value);
    if (validationError) {
      setError(validationError);
      return;
    }

    // If input is valid, add new todo and reset form
    setError("");
    addTodo(value);
    setValue("");
  }

  return (
    <form className='todoForm' onSubmit={handleSubmit}>
      {/* Display error message if there is one */}
      {error && <div className="error-message">{error}</div>}
      {/* Input field for new todo */}
      <input 
        type='text' 
        className='todo-input' 
        value={value} 
        placeholder='What is the task today?' 
        onChange={(e) => {
          setValue(e.target.value);
          setError("");
        }}
      />
      {/* Add todo button */}
      <button type='submit' className='todo-btn'>Add Task</button>
    </form>
  )
}