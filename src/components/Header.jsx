import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ onSearch, searchValue }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          Notes
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`header-link ${isActive("/") ? "active" : ""}`}
          >
            Active
          </Link>
          <Link
            to="/archives"
            className={`header-link ${
              isActive("/archives") ? "active" : ""
            }`}
          >
            Archived
          </Link>
        </nav>
      </div>

      <div className="header-right">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          className="header-search__input"
        />
        <Link to="/notes/new" className="header-create-btn">
          New Note
        </Link>
      </div>
    </header>
  );
}

export default Header;