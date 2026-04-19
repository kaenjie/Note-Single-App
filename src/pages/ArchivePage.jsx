import React from "react";
import NoteList from "../components/NoteList";

function ArchivePage({ archivedNotes }) {
  return (
    <section className="notes-section">
      {archivedNotes.length === 0 ? (
        <p className="notes-list__empty-message">No archived notes</p>
      ) : (
        <NoteList notes={archivedNotes} />
      )}
    </section>
  );
}

export default ArchivePage;
