import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";
import NoteDetailAction from "./NoteDetailAction";
import parser from "html-react-parser";
import { Calendar, Tag } from "lucide-react";
import LocaleContext from "../contexts/LocaleContext";

function NoteDetail({
  id,
  title,
  createdAt,
  body,
  archived,
  onDelete,
  onArchive,
  onUnarchive,
}) {
  const { locale } = React.useContext(LocaleContext);
  
  return (
    <article className="bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={archived ? "px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-500/20" : "px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-500/20"}>
            <Tag size={12} className="inline mr-1" />
            {archived ? (locale === "id" ? "Terarsip" : "Archived") : (locale === "id" ? "Aktif" : "Active")}
          </span>
          <span className="flex items-center gap-1.5 text-secondary text-sm font-medium">
            <Calendar size={14} />
            {showFormattedDate(createdAt)}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          {title}
        </h2>
      </header>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-primary/80 leading-relaxed mb-16">
        {parser(body)}
      </div>

      <div className="fixed bottom-10 right-10 z-50">
        <NoteDetailAction
          id={id}
          archived={archived}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
        />
      </div>
    </article>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default NoteDetail;
