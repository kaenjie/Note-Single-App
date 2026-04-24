import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Moon, Sun, Languages, Archive, Home } from "lucide-react";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";
import { cn } from "../utils/cn";

function Header({ logout, name }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { locale, toggleLocale } = React.useContext(LocaleContext);
  const location = useLocation();

  return (
    <header className="flex items-center justify-between py-6 border-b border-border mb-8 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold tracking-tight">
          <Link to="/" className="hover:text-blue-500 transition-colors">
            {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
          </Link>
        </h1>
        {logout && (
          <nav className="hidden md:flex items-center gap-4">
            <Link 
              to="/" 
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                location.pathname === "/" ? "bg-blue-500/10 text-blue-500" : "hover:bg-primary/5"
              )}
            >
              <Home size={18} />
              <span className="font-medium">{locale === "id" ? "Beranda" : "Home"}</span>
            </Link>
            <Link 
              to="/archives" 
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                location.pathname === "/archives" ? "bg-blue-500/10 text-blue-500" : "hover:bg-primary/5"
              )}
            >
              <Archive size={18} />
              <span className="font-medium">{locale === "id" ? "Terarsip" : "Archived"}</span>
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-full hover:bg-primary/5 transition-colors text-primary" 
          onClick={toggleLocale}
          role="button"
          aria-label={locale === "id" ? "Ganti Bahasa" : "Switch Language"}
        >
          <Languages size={20} />
        </button>
        <button 
          className="p-2 rounded-full hover:bg-primary/5 transition-colors text-primary" 
          onClick={toggleTheme}
          role="button"
          aria-label={theme === "light" ? "Mode Gelap" : "Mode Terang"}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        {logout && (
          <div className="flex items-center gap-4 ml-2 pl-4 border-l border-border">
            <span className="hidden sm:inline font-medium text-sm text-secondary">{name}</span>
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm" 
              onClick={logout}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline font-semibold">{locale === "id" ? "Keluar" : "Logout"}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
