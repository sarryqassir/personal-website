import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import "./TodoListApp.css";

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
        {
          id: uuidv4(),
          name: name.trim(),
          complete: false,
          initDate: new Date(),
        },
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

  // trim whitespace after edit
  function editTodo(id, e) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.name = e.target.value;
    setTodos(newTodos);
  }

  return (
    <div className="todo-container-container">
      <div className="todo-container">
        <div className="todo-header">
          <h1>To Do List</h1>
          <span className="remaining-todo">
            <mark className="red">
              {todos.filter((todo) => !todo.complete).length}
            </mark>
            {" left to do"}
          </span>
          <span className="add-todo">
            <input
              className="todo-input"
              placeholder="Add an item"
              ref={todoNameRef}
              type="text"
            />
            <button
              className="fa-solid fa-plus"
              title="Add item"
              onClick={handleAddTodo}
            >
              {/* <i className="fa-solid fa-plus"></i> */}
            </button>
            {/* <button>Clear Completed</button> */}
          </span>
        </div>
        <TodoList
          todos={todos}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default TodoListApp;
