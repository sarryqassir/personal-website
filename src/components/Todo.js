import React, { useState } from "react";

function Todo({ todo, toggleTodo, editTodo, deleteTodo }) {
  const [editting, setEditting] = useState(false);
  const [hoveringDelete, setHoveringDelete] = useState(false);
  //   const [tempName, setTempName] = useState();

  //use effect to actually set the main state name?

  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleEditTodo(e) {
    editTodo(todo.id, e);
  }

  function handleDelete() {
    window.confirm("Are you sure you want to delete this?") &&
      deleteTodo(todo.id);
  }

  function toggleInputMode() {
    setEditting(!editting);
  }

  function cancelEdit() {
    setEditting(!editting);
  }

  // add cancel/ revert button
  const inputField = (
    <input
      key={todo.id}
      type="text"
      value={todo.name}
      onKeyDown={(e) =>
        e.key === "Enter"
          ? toggleInputMode()
          : e.key === "Escape" && cancelEdit(e)
      }
      onChange={handleEditTodo}
      onSubmit={toggleInputMode}
    />
  );
  //12:41 100%
  //2:41 41% (no yt videos, not much action on the screen)
  //3:41 9%
  const staticField = <span>{todo.name}</span>;

  return (
    <label>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={handleTodoClick}
      />
      {editting ? inputField : staticField}
      <button className="edit-btn" type="button" onClick={toggleInputMode}>
        <i className="fa-solid fa-pen-to-square" />
      </button>
      <button
        className="delete-btn"
        type="button"
        onClick={handleDelete}
        onMouseOver={() => setHoveringDelete(true)}
        onMouseOut={() => setHoveringDelete(false)}
      >
        <i
          className={
            hoveringDelete ? "fa-solid fa-trash-arrow-up" : "fa-solid fa-trash"
          }
        />
      </button>
    </label>
  );
}

export default Todo;

/* 
- input field for item name/ item name
- edit button ^ triggers that
- read-only option to disable editing
- parameter to pass name if readonly
- delete button
- creation date
*/
