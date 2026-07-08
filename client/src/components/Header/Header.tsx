import { NavLink } from "react-router-dom";
import "./Header.css";

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "header__link header__link_active" : "header__link";
}

export default function Header() {
  return (
    <header className="header">
      <p className="header__logo">Mesh AI</p>

      <nav className="header__nav">
        <NavLink to="/knowledge" className={getNavLinkClass}>
          Knowledge Base
        </NavLink>
        <NavLink to="/chat" className={getNavLinkClass}>
          Chat
        </NavLink>
      </nav>
    </header>
  );
}
