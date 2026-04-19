import React from "react";

function NoteDetailAction({ id, archived, onDelete, onArchive, onUnarchive }) {
  return (
    <div className="detail-page__action">
      {archived ? (
        <button
          className="action"
          type="button"
          onClick={() => onUnarchive(id)}
        >
          Unarchive
        </button>
      ) : (
        <button className="action" type="button" onClick={() => onArchive(id)}>
          Archive
        </button>
      )}
      <button
        className="action secondary"
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteDetailAction;
