import React from "react";
import Todo from "./Todo";

function TodoList({ todos, toggleTodo, editTodo, deleteTodo }) {
  return (
    <div>
      {todos.map((todo) => {
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

export default TodoList;
