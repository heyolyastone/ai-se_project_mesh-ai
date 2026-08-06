import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";

import logo from "../../assets/logo.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { registerUser } from "../../utils/api";

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "form__nav-link form__nav-link_active" : "form__nav-link";
}

export default function Register() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");

    try {
      await registerUser(values.name, values.email, values.password);
      navigate("/login");
    } catch (err) {
      setStatusMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  }

  return (
    <main className="auth-page">
      <header className="auth-page__header">
        <img className="auth-page__logo" src={logo} alt="MeshAI logo" />
      </header>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <h1 className="form__title">Create an account</h1>
        <p className="form__text">Register to upload documents and chat with MeshAI.</p>

        <nav className="form__nav">
          <NavLink to="/login" className={getNavLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={getNavLinkClass}>
            Register
          </NavLink>
        </nav>

        <label className="form__label">
          Name
          <input
            className="form__input"
            type="text"
            name="name"
            value={values.name ?? ""}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={40}
          />
          <span className="form__error">{errors.name}</span>
        </label>

        <label className="form__label">
          Email
          <input
            className="form__input"
            type="email"
            name="email"
            value={values.email ?? ""}
            onChange={handleChange}
            required
          />
          <span className="form__error">{errors.email}</span>
        </label>

        <label className="form__label">
          Password
          <input
            className="form__input"
            type="password"
            name="password"
            value={values.password ?? ""}
            onChange={handleChange}
            required
            minLength={8}
          />
          <span className="form__error">{errors.password}</span>
        </label>

        <p className="form__status" aria-live="polite">
          {statusMessage}
        </p>

        <button className="form__submit" type="submit" disabled={!isValid}>
          Create account
        </button>
      </form>
    </main>
  );
}
