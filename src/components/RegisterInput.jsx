import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import LocaleContext from "../contexts/LocaleContext";
import Swal from "sweetalert2";

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const { locale } = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: locale === "id" ? "Oops..." : "Error",
        text: locale === "id" ? "Password dan konfirmasi password harus sama!" : "Password and confirm password must match!",
        background: "var(--background)",
        color: "var(--font-primary)",
      });
      return;
    }

    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
      <div className="relative group">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-blue-500 transition-colors" size={20} />
        <input
          className="w-full pl-12 pr-4 py-3.5 bg-primary/5 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
          type="text"
          placeholder={locale === "id" ? "Nama Lengkap" : "Full Name"}
          value={name}
          onChange={onNameChange}
          required
        />
      </div>
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-blue-500 transition-colors" size={20} />
        <input
          className="w-full pl-12 pr-4 py-3.5 bg-primary/5 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>
      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-blue-500 transition-colors" size={20} />
        <input
          className="w-full pl-12 pr-4 py-3.5 bg-primary/5 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-blue-500 transition-colors" size={20} />
        <input
          className="w-full pl-12 pr-4 py-3.5 bg-primary/5 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
          type="password"
          placeholder={locale === "id" ? "Konfirmasi Password" : "Confirm Password"}
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          required
        />
      </div>
      <button className="flex items-center justify-center gap-2 mt-4 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
        <UserPlus size={20} />
        {locale === "id" ? "Daftar" : "Register"}
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
