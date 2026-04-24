import React from "react";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function AddPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  async function onAddNoteHandler(note) {
    await addNote(note);
    navigate("/");
  }

  return (
    <motion.section 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto"
    >
      <button 
        onClick={() => navigate("/")} 
        className="flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">{locale === "id" ? "Kembali ke Beranda" : "Back to Home"}</span>
      </button>

      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tight mb-2">
          {locale === "id" ? "Buat Catatan Baru" : "Create New Note"}
        </h2>
        <p className="text-secondary font-medium">
          {locale === "id" ? "Tuangkan ide dan pikiran Anda di sini" : "Share your ideas and thoughts here"}
        </p>
      </div>

      <NoteInput addNote={onAddNoteHandler} />
    </motion.section>
  );
}

export default AddPage;
