import { useEffect, useState } from "react";
import UploadArea from "../../components/UploadArea/UploadArea";
import { getDocuments, type Document } from "../../utils/api";
import "./KnowledgeBase.css";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDocuments()
      .then((documentsFromApi) => {
        setDocuments(documentsFromApi);
      })
      .catch(() => {
        setError("Failed to load documents.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="knowledge-base">
      <h1 className="knowledge-base__title">Knowledge Base</h1>
      <UploadArea />

      {isLoading && <p className="knowledge-base__status">Loading documents...</p>}

      {!isLoading && error && (
        <p className="knowledge-base__status knowledge-base__status_type_error">
          {error}
        </p>
      )}

      {!isLoading && !error && documents.length === 0 && (
        <p className="knowledge-base__status">No documents yet.</p>
      )}

      {!isLoading && !error && documents.length > 0 && (
        <ul className="knowledge-base__list">
          {documents.map((document) => (
            <li className="knowledge-base__item" key={document.id}>
              <p className="knowledge-base__name">{document.name}</p>
              <p className="knowledge-base__date">{document.uploadedAt}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
