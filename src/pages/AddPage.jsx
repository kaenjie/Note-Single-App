import React from "react";
import { useNavigate } from "react-router-dom";

function AddPage({ onAddNote }) {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  function onTitleChangeEventHandler(event) {
    setTitle(event.target.value);
  }

  function onInputHandler(event) {
    setBody(event.currentTarget.innerText);
  }

  function onSubmitEventHandler(event) {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Title and note cannot be empty");
      return;
    }

    onAddNote({ title, body });
    navigate("/");
  }

  return (
    <form className="add-new-page__input" onSubmit={onSubmitEventHandler}>
      <input
        className="add-new-page__input__title"
        placeholder="Note title"
        value={title}
        onChange={onTitleChangeEventHandler}
      />
      <div
        className="add-new-page__input__body"
        data-placeholder="Write your note here..."
        contentEditable
        onInput={onInputHandler}
        suppressContentEditableWarning
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default AddPage;
