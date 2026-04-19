/* This component is not currently used in the application.
   Search functionality is implemented directly in the Header component.
   Keeping this file for reference purposes. */

import React from "react";

function NoteSearch({ keyword, keywordChange }) {
  return (
    <div className="note-search">
      <input
        type="text"
        placeholder="Search notes..."
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

export default NoteSearch;
