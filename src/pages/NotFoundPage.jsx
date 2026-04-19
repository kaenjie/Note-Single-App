import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section style={{ textAlign: "center", paddingTop: "60px" }}>
      <h2 style={{ fontSize: "48px", marginBottom: "16px" }}>404</h2>
      <p style={{ color: "var(--text-2)", marginBottom: "24px" }}>Page not found</p>
      <Link to="/" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: "600" }}>
        Back to home
      </Link>
    </section>
  );
}

export default NotFoundPage;
