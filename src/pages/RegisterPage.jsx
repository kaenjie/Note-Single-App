import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import { motion } from "framer-motion";

function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto mt-10 p-8 bg-background border border-border rounded-3xl shadow-xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight mb-2">
          {locale === "id" ? "Daftar Akun" : "Registration"}
        </h2>
        <p className="text-secondary font-medium">
          {locale === "id" ? "Bergabunglah untuk mulai mencatat" : "Join us to start taking notes"}
        </p>
      </div>

      <RegisterInput register={onRegisterHandler} />
      
      <div className="mt-8 text-center text-secondary">
        <p>
          {locale === "id" ? "Sudah punya akun?" : "Already have an account?"} {" "}
          <Link to="/" className="text-blue-500 font-bold hover:underline underline-offset-4">
            {locale === "id" ? "Masuk di sini" : "Login here"}
          </Link>
        </p>
      </div>
    </motion.section>
  );
}

export default RegisterPage;
