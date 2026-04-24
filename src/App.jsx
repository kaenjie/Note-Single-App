import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import Header from "./components/Header";
import Loading from "./components/Loading";

import ThemeContext from "./contexts/ThemeContext";
import LocaleContext from "./contexts/LocaleContext";

import { getUserLogged, putAccessToken } from "./utils/network-data";

function App() {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );
  const [locale, setLocale] = React.useState(
    localStorage.getItem("locale") || "id"
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const themeContextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

  const localeContextValue = React.useMemo(() => ({
    locale,
    toggleLocale,
  }), [locale]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  React.useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    fetchUser();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken("");
    navigate("/");
  }

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loading message="Initializing..." />
      </div>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="min-h-screen bg-background text-primary transition-colors duration-300">
          <div className="app-container">
            <Header logout={authedUser ? onLogout : null} name={authedUser?.name} />
            <main>
              <AnimatePresence mode="wait">
                <Routes>
                  {authedUser === null ? (
                    <>
                      <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                      <Route path="/register" element={<RegisterPage />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/archives" element={<ArchivePage />} />
                      <Route path="/notes/new" element={<AddPage />} />
                      <Route path="/notes/:id" element={<DetailPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </>
                  )}
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
