import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { debounce } from "lodash";

export type TodoItem = {
  id: string;
  name: string;
  complete: boolean;
  initDate: Date;
};

export interface TodoPropsT {
  toggleTodo: (id: string) => void;
  editTodo: (
    id: string,
    e: string | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  deleteTodo: (id: string) => void;
}

function Todo({
  todo,
  toggleTodo,
  editTodo,
  deleteTodo,
}: TodoPropsT & { todo: TodoItem }) {
  const [editting, setEditting] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputRefFake = useRef<HTMLTextAreaElement>(null);

  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleEditTodo(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!inputRef.current) return;
    inputRef.current.style.height = "0px";
    adjustTextAreaSize();
    editTodo(todo.id, e);
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (e.shiftKey) deleteTodo(todo.id);
    else
      window.confirm("Are you sure you want to delete this?") &&
        deleteTodo(todo.id);
  }

  function adjustTextAreaSize() {
    if (inputRef.current && inputRefFake.current) {
      // inputRefFake.current.style.width = inputRef.current.offsetWidth + "px";
      inputRef.current.style.height = inputRefFake.current.scrollHeight + "px";
    }
  }

  /** Toggles edit mode and saves the current todo name incase user wants to cancel the edit. */
  function toggleInputMode() {
    if (inputRef.current) {
      adjustTextAreaSize();
      setEditting(!editting);
      inputRef.current.focus();
      setTempName(todo.name);
      inputRef.current.value = "";
      inputRef.current.value = tempName;
    }
  }

  useEffect(() => {
    if (!editting) {
      if (todo.name !== todo.name.trim()) editTodo(todo.id, todo.name.trim());
      if (todo.name === "") deleteTodo(todo.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editting]);

  /** Cancels edit mode and sets the todo name back to its original state when the edit was initiated */
  function cancelEdit() {
    setEditting(false);
    editTodo(todo.id, tempName);
  }

  useEffect(() => {
    window.addEventListener("resize", adjustTextAreaSize);
    window.addEventListener("resize", debounce(adjustTextAreaSize, 250));
    adjustTextAreaSize();
    return () => {
      window.removeEventListener("resize", adjustTextAreaSize);
      window.removeEventListener("resize", debounce(adjustTextAreaSize, 200));
    };
  }, []);

  return (
    <label className="todo-item">
      <span className="complete-btn-span">
        <input
          className="complete-btn"
          type="checkbox"
          title="Complete Task"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
      </span>
      <span className="todo-name">
        <textarea
          className="main-name"
          ref={inputRef}
          key={todo.id}
          value={todo.name}
          onKeyDown={(e) =>
            e.key === "Enter"
              ? toggleInputMode()
              : e.key === "Escape" && cancelEdit()
          }
          onChange={(e) => handleEditTodo(e)}
          onSubmit={() => setEditting(!editting)}
          onDoubleClick={toggleInputMode}
          onBlur={() => {
            document.hasFocus() && setEditting(false);
          }}
          readOnly={!editting}
          max-rows={-1}
        />
        <textarea
          className="height-adjuster"
          key={todo.id + 1}
          ref={inputRefFake}
          value={todo.name}
          rows={1}
          readOnly
        />
      </span>
      <div className="btn-container">
        <button
          className="edit-btn"
          type="button"
          onMouseDown={(e) => e.preventDefault()}
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
          title={editting ? "Cancel Edit" + <kbd>Escape</kbd> : "Delete"}
          onClick={(e) => (editting ? cancelEdit : handleDelete(e))}
          // Pevents blur event so onclick can register before text content's onblur goes off, which could cause conflict (https://stackoverflow.com/a/57630197)
          onMouseDown={(e) => e.preventDefault()}
        >
          <i className={editting ? "fa-solid fa-xmark" : "fa-solid fa-trash"} />
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
