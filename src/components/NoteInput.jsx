import React from "react";
import PropTypes from "prop-types";
import { Check } from "lucide-react";
import LocaleContext from "../contexts/LocaleContext";

function NoteInput({ addNote }) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const { locale } = React.useContext(LocaleContext);

  const onTitleChangeHandler = (event) => setTitle(event.target.value);
  const onBodyChangeHandler = (event) => setBody(event.target.innerHTML);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() === "") return;
    addNote({ title, body });
  };

  return (
    <form className="space-y-6" onSubmit={onSubmitHandler}>
      <div className="bg-background rounded-3xl border border-border shadow-sm p-2">
        <input
          className="w-full px-6 py-8 bg-transparent border-none text-4xl font-black placeholder:text-secondary/30 focus:ring-0"
          placeholder={locale === "id" ? "Judul Catatan..." : "Note Title..."}
          value={title}
          onChange={onTitleChangeHandler}
          required
        />
        <div
          className="w-full px-6 py-8 min-h-[400px] bg-transparent border-none text-xl leading-relaxed placeholder:before:content-[attr(data-placeholder)] placeholder:before:text-secondary/30 focus:ring-0 outline-none"
          contentEditable
          data-placeholder={locale === "id" ? "Apa yang Anda pikirkan?" : "What is on your mind?"}
          onInput={onBodyChangeHandler}
          role="textbox"
        />
      </div>
      
      <div className="fixed bottom-10 right-10 z-50">
        <button 
          type="submit" 
          className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 group"
          title={locale === "id" ? "Simpan Catatan" : "Save Note"}
        >
          <Check size={32} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </form>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
