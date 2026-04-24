import React from "react";
import PropTypes from "prop-types";
import { Archive, Trash2, ArchiveRestore } from "lucide-react";
import { motion } from "framer-motion";

function NoteDetailAction({ id, archived, onDelete, onArchive, onUnarchive }) {
  return (
    <div className="flex flex-col gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-shadow hover:shadow-blue-500/50"
        type="button"
        title={archived ? "Aktifkan" : "Arsipkan"}
        onClick={() => archived ? onUnarchive(id) : onArchive(id)}
      >
        {archived ? <ArchiveRestore size={24} /> : <Archive size={24} />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 transition-shadow hover:shadow-red-500/50"
        type="button"
        title="Hapus"
        onClick={() => onDelete(id)}
      >
        <Trash2 size={24} />
      </motion.button>
    </div>
  );
}

NoteDetailAction.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default NoteDetailAction;
