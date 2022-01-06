import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoListApp.todos";

function TodoListApp() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  // filter white space
  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (!name) return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), name: name.trim(), complete: false },
      ];
    });
    todoNameRef.current.value = null;
  }

  //   function handleClearTodos() {
  //     const newTodos = todos.filter((todo) => !todo.complete);
  //     setTodos(newTodos);
  //   }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function editTodo(id, e) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.name = e.target.value.trim();
    setTodos(newTodos);
  }

  return (
    <>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Item</button>
      {/* <button>Clear Completed</button> */}
      <span>{todos.filter((todo) => !todo.complete).length} left to do</span>
      <TodoList
        todos={todos}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default TodoListApp;
