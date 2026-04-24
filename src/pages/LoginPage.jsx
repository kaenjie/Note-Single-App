import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import { motion } from "framer-motion";

function LoginPage({ loginSuccess }) {
  const { locale } = React.useContext(LocaleContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-10 p-8 bg-background border border-border rounded-3xl shadow-xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight mb-2">
           {locale === "id" ? "Selamat Datang" : "Welcome Back"}
        </h2>
        <p className="text-secondary font-medium">
          {locale === "id" ? "Silakan masuk untuk melanjutkan" : "Please login to continue"}
        </p>
      </div>
      
      <LoginInput login={onLogin} />
      
      <div className="mt-8 text-center text-secondary">
        <p>
          {locale === "id" ? "Belum punya akun?" : "Don\u0027t have an account?"} {" "}
          <Link to="/register" className="text-blue-500 font-bold hover:underline underline-offset-4">
            {locale === "id" ? "Daftar di sini" : "Register here"}
          </Link>
        </p>
      </div>
    </motion.section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
