import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import { motion } from "framer-motion";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  async function onDeleteHandler(id) {
    const result = await Swal.fire({
      title: locale === "id" ? "Apakah Anda yakin?" : "Are you sure?",
      text: locale === "id" ? "Catatan ini akan dihapus secara permanen!" : "This note will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: locale === "id" ? "Ya, hapus!" : "Yes, delete it!",
      cancelButtonText: locale === "id" ? "Batal" : "Cancel",
      background: "var(--background)",
      color: "var(--font-primary)",
    });

    if (result.isConfirmed) {
      await deleteNote(id);
      Swal.fire({
        title: locale === "id" ? "Terhapus!" : "Deleted!",
        text: locale === "id" ? "Catatan Anda telah dihapus." : "Your note has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "var(--background)",
        color: "var(--font-primary)",
      });
      navigate("/");
    }
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);
    navigate("/");
  }

  async function onUnarchiveHandler(id) {
    await unarchiveNote(id);
    navigate("/");
  }

  if (loading) {
    return <Loading message={locale === "id" ? "Memuat detail..." : "Loading detail..."} />;
  }

  if (note === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
         <p className="text-xl font-bold text-secondary">{locale === "id" ? "Catatan tidak ditemukan!" : "Note not found!"}</p>
         <button onClick={() => navigate("/")} className="mt-4 text-blue-500 font-medium">← {locale === "id" ? "Kembali ke Beranda" : "Back to Home"}</button>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto"
    >
      <NoteDetail
        {...note}
        onDelete={onDeleteHandler}
        onArchive={onArchiveHandler}
        onUnarchive={onUnarchiveHandler}
      />
    </motion.section>
  );
}

export default DetailPage;
