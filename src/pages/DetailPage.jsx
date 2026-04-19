import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote } from "../utils/local-data";
import { showFormattedDate } from "../utils";
import parser from "html-react-parser";
import NoteDetailAction from "../components/NoteDetailAction";

function DetailPage({ onDelete, onArchive, onUnarchive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  const handleDelete = (id) => {
    onDelete(id);
    navigate("/");
  };

  const handleArchive = (id) => {
    onArchive(id);
    navigate("/");
  };

  const handleUnarchive = (id) => {
    onUnarchive(id);
    navigate("/archives");
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!note) {
    return <p>Note not found!</p>;
  }

  return (
    <section className="detail-page">
      <button className="detail-page__back" onClick={handleBack}>
        Back
      </button>
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <div className="detail-page__body">{parser(note.body)}</div>
      <NoteDetailAction
        id={id}
        archived={note.archived}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onUnarchive={handleUnarchive}
      />
    </section>
  );
}

export default DetailPage;
