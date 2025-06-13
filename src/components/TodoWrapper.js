import React, {useState, useEffect} from 'react';
import { TodoForm } from './TodoForm';
import { EditTodoForm } from './EditTodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';

export const TodoWrapper = () => {
  // State to store the list of todos
  // Initialize from localStorage if available, otherwise empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Effect to save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = todo => {
    setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}]);
  }

  const toggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo));
  }

  const editTask = (task, id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo));
  }

  return (
    <div className='todoWrapper'>
      <h1>Todo App</h1>
      <p>Stay organized and get things done</p>
      {/* Form to add new todo */}
      <TodoForm addTodo={addTodo}/>
      {/* Render list of todos */}
      {todos.map((todo) => (
        todo.isEditing ? (
          // Display edit form if todo is in edit mode
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          // Display normal todo item
          <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
        )
      ))}
    </div>
  )
}