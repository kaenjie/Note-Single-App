import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";

import Header from "./components/Header";

import {
  getActiveNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "./utils/local-data";

function App() {
  const [notes, setNotes] = React.useState([
    ...getActiveNotes(),
    ...getArchivedNotes(),
  ]);
  const [searchValue, setSearchValue] = React.useState("");

  const location = useLocation();

  // Header Actions
  const onAddNoteHandler = ({ title, body }) => {
    const newNote = addNote({ title, body });
    setNotes((prev) => [...prev, newNote]);
  };

  const onDeleteHandler = (id) => {
    deleteNote(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const onArchiveHandler = (id) => {
    archiveNote(id);
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, archived: true } : note
      )
    );
  };

  const onUnarchiveHandler = (id) => {
    unarchiveNote(id);
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, archived: false } : note
      )
    );
  };

  // Filter
  const activeNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  const isDetailPage =
    location.pathname.startsWith("/notes/") &&
    location.pathname !== "/notes/new";

  return (
    <div className="app">
      <Header onSearch={setSearchValue} searchValue={searchValue} />

      <main className={`app-content ${isDetailPage ? "full" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                activeNotes={activeNotes}
                searchValue={searchValue}
              />
            }
          />

          <Route
            path="/archives"
            element={<ArchivePage archivedNotes={archivedNotes} />}
          />

          <Route
            path="/notes/new"
            element={<AddPage onAddNote={onAddNoteHandler} />}
          />

          <Route
            path="/notes/:id"
            element={
              <DetailPage
                onDelete={onDeleteHandler}
                onArchive={onArchiveHandler}
                onUnarchive={onUnarchiveHandler}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;