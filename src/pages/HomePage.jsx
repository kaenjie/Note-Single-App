import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import NoteList from "../components/NoteList";
import NoteSearch from "../components/NoteSearch";
import Loading from "../components/Loading";
import { getActiveNotes } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { locale } = React.useContext(LocaleContext);

  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  React.useEffect(() => {
    async function fetchNotes() {
      const { data } = await getActiveNotes();
      setNotes(data || []);
      setLoading(false);
    }
    fetchNotes();
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) {
    return <Loading message={locale === "id" ? "Memuat catatan..." : "Loading notes..."} />;
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {locale === "id" ? "Catatan Aktif" : "Active Notes"}
          </h2>
          <p className="text-secondary mt-1">
            {locale === "id" 
              ? `Anda memiliki ${filteredNotes.length} catatan aktif` 
              : `You have ${filteredNotes.length} active notes`}
          </p>
        </div>
        
        <Link 
          to="/notes/new" 
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          <span>{locale === "id" ? "Catatan Baru" : "New Note"}</span>
        </Link>
      </div>

      <div className="bg-primary/5 p-1 rounded-2xl">
        <NoteSearch keyword={keyword} keywordChange={onKeywordChangeHandler} />
      </div>

      <NoteList notes={filteredNotes} />
    </motion.section>
  );
}

export default HomePage;
