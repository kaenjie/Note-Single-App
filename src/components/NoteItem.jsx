import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { motion } from "framer-motion";
import parser from "html-react-parser";

function NoteItem({ id, title, createdAt, body }) {
  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
      
      <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">
        <Link to={`/notes/${id}`} className="hover:text-blue-500 transition-colors">
          {title}
        </Link>
      </h3>
      <time className="text-xs font-medium text-secondary mb-4 block uppercase tracking-wider">
        {showFormattedDate(createdAt)}
      </time>
      <div className="text-secondary leading-relaxed line-clamp-4 prose prose-sm dark:prose-invert">
        {parser(body)}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <Link 
          to={`/notes/${id}`} 
          className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1"
        >
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItem;
