import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { debounce } from "lodash";

function Todo({ todo, toggleTodo, editTodo, deleteTodo }) {
  const [editting, setEditting] = useState(false);
  const [hoveringDelete, setHoveringDelete] = useState(false);
  //   const [tempName, setTempName] = useState();

  const inputRef = useRef(null);
  const inputRefFake = useRef(null);

  //use effect to actually set the main state name?

  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleEditTodo(e) {
    inputRef.current.style.height = "0px";
    adjustTextAreaSize();
    editTodo(todo.id, e);
  }

  function handleDelete() {
    window.confirm("Are you sure you want to delete this?") &&
      deleteTodo(todo.id);
  }

  function adjustTextAreaSize() {
    inputRefFake.current.style.width = inputRef.current.offsetWidth + "px";
    inputRef.current.style.height = inputRefFake.current.scrollHeight + "px";
  }

  function toggleInputMode() {
    console.log(inputRef.current.rows);
    adjustTextAreaSize();
    setEditting(!editting);
  }

  function cancelEdit() {
    setEditting(!editting);
  }

  useEffect(() => {
    window.addEventListener("resize", debounce(adjustTextAreaSize, 200));
    adjustTextAreaSize();
    return () => {
      window.removeEventListener("resize", debounce(adjustTextAreaSize, 100));
    };
  }, []);

  // add cancel/ revert button
  // double click to edit

  //12:41 100%
  //2:41 41% (no yt videos, not much action on the screen)
  //3:41 9%

  return (
    <label className="todo-item">
      <span className="complete-btn-span">
        <input
          type="checkbox"
          className="complete-btn"
          title="Complete Task"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
      </span>
      <span className="todo-name">
        <textarea
          className="main-name"
          key={todo.id}
          ref={inputRef}
          type="text"
          value={todo.name}
          onKeyDown={(e) =>
            e.key === "Enter"
              ? toggleInputMode()
              : e.key === "Escape" && cancelEdit(e)
          }
          onChange={handleEditTodo}
          onSubmit={() => setEditting(!editting)}
          readOnly={!editting}
          max-rows={-1}
        />
        <textarea
          key={todo.id + 1}
          ref={inputRefFake}
          value={todo.name}
          className="height-adjuster"
          rows={1}
          readOnly
        />
      </span>
      <div className="btn-container">
        <button
          className="edit-btn"
          type="button"
          onClick={toggleInputMode}
          title="Edit"
        >
          <i
            className={
              editting ? "fa-solid fa-pen" : "fa-solid fa-pen-to-square"
            }
          />
        </button>
        <button
          className="delete-btn"
          type="button"
          title="Delete"
          onClick={handleDelete}
          onMouseOver={() => setHoveringDelete(true)}
          onMouseOut={() => setHoveringDelete(false)}
        >
          <i
            className={
              hoveringDelete
                ? "fa-solid fa-trash-arrow-up"
                : "fa-solid fa-trash"
            }
          />
        </button>
      </div>
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
