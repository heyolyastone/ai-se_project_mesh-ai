import { useNavigate } from "react-router-dom";
import "./Intro.css";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <section className="intro">
      <div className="intro__content">
        <h1 className="intro__title">Welcome to Mesh AI</h1>

        <p className="intro__subtitle">
          Upload your documents, organize your knowledge base, and chat with AI
          using your saved information.
        </p>

        <div className="intro__cards">
          <article className="intro__card">
            <h2 className="intro__card-title">Upload documents</h2>
            <p className="intro__card-text">
              Add files to your knowledge base so Mesh AI can work with your
              information.
            </p>
          </article>

          <article className="intro__card">
            <h2 className="intro__card-title">Manage knowledge</h2>
            <p className="intro__card-text">
              View uploaded documents and keep your workspace organized.
            </p>
          </article>

          <article className="intro__card">
            <h2 className="intro__card-title">Chat with AI</h2>
            <p className="intro__card-text">
              Ask questions and get helpful answers based on your saved content.
            </p>
          </article>
        </div>

        <button
          className="intro__button"
          type="button"
          onClick={() => navigate("/knowledge")}
        >
          Get started
        </button>
      </div>
    </section>
  );
}
