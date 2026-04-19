import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
  if (!notes.length) {
    return <p className="notes-list__empty-message">No notes</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem key={note.id} id={note.id} title={note.title} createdAt={note.createdAt} body={note.body} />
      ))}
    </div>
  );
}

export default NoteList;
