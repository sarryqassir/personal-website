import React, { useState, useRef, useEffect } from "react";
import Todo, { TodoPropsT, TodoItem } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import "./TodoListApp.css";

const LOCAL_STORAGE_KEY = "todoListApp.todos";

function TodoListApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const todoNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTodos: TodoItem[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)!
    );
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id: string) {
    const newTodos = [...todos];
    // non-null assetion operator (!) could be used, but edge cases haven't been tested
    // such as if the conditions for the deletion are met/ object is deleted before this function
    const todo = newTodos.find((todo) => todo.id === id);
    if (!todo) return;
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo() {
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

  function editTodo(
    id: string,
    e: string | React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (!todo) return;
    typeof e === "string"
      ? (todo.name = e)
      : (todo.name = e.currentTarget.value);
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
                  ? handleAddTodo()
                  : e.key === "Escape" && cancelAdd()
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

// probably going to be integrated to compontent above/ something to merge with skills
export function TodoList({
  todos,
  toggleTodo,
  editTodo,
  deleteTodo,
}: TodoPropsT & { todos: TodoItem[] }) {
  return (
    <div className="todo-list">
      {todos.map((todo: TodoItem) => {
        return (
          <Todo
            key={todo.id}
            editTodo={editTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            todo={todo}
          />
        );
      })}
    </div>
  );
}

export default TodoListApp;
