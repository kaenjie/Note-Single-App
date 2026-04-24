import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import NoteSearch from "../components/NoteSearch";
import Loading from "../components/Loading";
import { getArchivedNotes } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import { motion } from "framer-motion";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { locale } = React.useContext(LocaleContext);

  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  React.useEffect(() => {
    async function fetchArchivedNotes() {
      const { data } = await getArchivedNotes();
      setNotes(data || []);
      setLoading(false);
    }
    fetchArchivedNotes();
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) {
    return <Loading message={locale === "id" ? "Memuat arsip..." : "Loading archives..."} />;
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {locale === "id" ? "Catatan Terarsip" : "Archived Notes"}
        </h2>
        <p className="text-secondary mt-1">
          {locale === "id" 
            ? `Daftar catatan yang telah Anda arsipkan` 
            : `List of notes you have archived`}
        </p>
      </div>

      <div className="bg-primary/5 p-1 rounded-2xl">
        <NoteSearch keyword={keyword} keywordChange={onKeywordChangeHandler} />
      </div>

      <NoteList notes={filteredNotes} />
    </motion.section>
  );
}

export default ArchivePage;
