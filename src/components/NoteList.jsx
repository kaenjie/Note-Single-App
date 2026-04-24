import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen } from "lucide-react";
import LocaleContext from "../contexts/LocaleContext";

function NoteList({ notes }) {
  const { locale } = React.useContext(LocaleContext);

  if (!notes.length) {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center"
      >
        <div className="bg-primary/5 p-6 rounded-full mb-4">
          <FolderOpen size={48} className="text-secondary" />
        </div>
        <p className="text-xl font-semibold text-secondary">
          {locale === "id" ? "Tidak ada catatan" : "No notes found"}
        </p>
        <p className="text-secondary/70 mt-2">
          {locale === "id" ? "Mulailah membuat catatan baru Anda!" : "Start by creating a new note!"}
        </p>
      </motion.section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {notes.map((note) => (
          <NoteItem key={note.id} {...note} />
        ))}
      </AnimatePresence>
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
