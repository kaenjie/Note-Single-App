import React from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";
import LocaleContext from "../contexts/LocaleContext";

function NoteSearch({ keyword, keywordChange }) {
  const { locale } = React.useContext(LocaleContext);
  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-blue-500 transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-3.5 bg-background border-none rounded-2xl text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg shadow-sm"
        placeholder={
          locale === "id" ? "Cari berdasarkan judul ..." : "Search by title ..."
        }
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

NoteSearch.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default NoteSearch;
