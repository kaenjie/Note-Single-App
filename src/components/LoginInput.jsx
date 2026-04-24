import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { Mail, Lock, LogIn } from "lucide-react";
import LocaleContext from "../contexts/LocaleContext";

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const { locale } = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
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
      <button className="flex items-center justify-center gap-2 mt-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
        <LogIn size={20} />
        {locale === "id" ? "Masuk" : "Login"}
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
