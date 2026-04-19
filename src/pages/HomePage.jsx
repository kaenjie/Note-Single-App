import React from "react";
import NoteList from "../components/NoteList";

function HomePage({ activeNotes, searchValue }) {
  const filteredNotes = activeNotes.filter((note) => {
    return note.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <section className="notes-section">
      <NoteList notes={filteredNotes} />
    </section>
  );
}

export default HomePage;
