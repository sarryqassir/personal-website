import React from "react";
import Todo, { TodoItem } from "./Todo";

export function TodoList(todos: TodoItem[]) {
  return (
    <div className="todo-list">
      {/* {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            editTodo={editTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            todo={todo}
          />
        );
      })} */}
    </div>
  );
}
