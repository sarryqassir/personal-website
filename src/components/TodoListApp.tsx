import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import "./TodoListApp.css";

const LOCAL_STORAGE_KEY = "todoListApp.todos";

type Todos = {
  id: string;
  name: string;
  complete: boolean;
  initDate: Date;
};

function TodoListApp() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const todoNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id: string) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (!todo) return;
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  // filter white space
  function handleAddTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!todoNameRef.current?.value) return;
    const name = todoNameRef.current.value;
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
    todoNameRef.current.value = "";
  }

  //   function handleMoveTodos() {
  //     const newTodos = todos.filter((todo) => !todo.complete);
  //     setTodos(newTodos);
  //   }

  function deleteTodo(id: string) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  // trim whitespace after edit
  function editTodo<
    T extends string | React.KeyboardEvent<HTMLTextAreaElement>
  >(id: string, e: T, cancel = false) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (!todo) return;
    T: string ? (todo.name = e) : (todo.name = e.target.value);
    setTodos(newTodos);
  }

  function cancelAdd() {
    if (todoNameRef.current) {
      todoNameRef.current.value = "";
    }
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
              onKeyDown={(e) =>
                e.key === "Enter"
                  ? handleAddTodo(e)
                  : e.key === "Escape" && cancelAdd(e)
              }
            />
            <button
              className="fa-solid fa-plus"
              title="Add item"
              onClick={handleAddTodo}
            ></button>
            {/* <button>Move Completed</button> */}
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
