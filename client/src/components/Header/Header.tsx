import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

type Props = {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  isMobileMenuOpen: boolean;
};

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "header__link header__link_active" : "header__link";
}

export default function Header({
  onMenuOpen,
  onMenuClose,
  isMobileMenuOpen,
}: Props) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setIsAccountMenuOpen(false);
    onMenuClose();
    navigate("/login");
  }

  return (
    <header className={isMobileMenuOpen ? "header header_mobile" : "header"}>
      <button
        type="button"
        className="header__menu-btn"
        aria-label="Open menu"
        onClick={onMenuOpen}
      />

      <p className="header__logo">Mesh AI</p>

      {isAuthenticated && (
        <nav
          className={
            isMobileMenuOpen
              ? "header__nav header__nav_mobile"
              : "header__nav"
          }
        >
          <NavLink
            to="/knowledge"
            className={getNavLinkClass}
            onClick={onMenuClose}
          >
            Knowledge Base
          </NavLink>

          <NavLink to="/chat" className={getNavLinkClass} onClick={onMenuClose}>
            Chat
          </NavLink>

          <div className="header__account">
            <button
              type="button"
              className="header__dropdown-btn"
              aria-haspopup="menu"
              aria-expanded={isAccountMenuOpen}
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              <span>{currentUser?.name}'s Account</span>
              <span className="header__dropdown-arrow" aria-hidden="true">
                ▾
              </span>
            </button>

            {isAccountMenuOpen && (
              <ul className="header__menu" role="menu">
                <li role="none">
                  <button
                    type="button"
                    className="header__logout-btn"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
