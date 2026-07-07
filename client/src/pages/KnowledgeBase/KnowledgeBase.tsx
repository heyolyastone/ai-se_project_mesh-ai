import { useEffect, useState } from "react";
import UploadArea from "../../components/UploadArea/UploadArea";
import { getDocuments, type KnowledgeDoc } from "../../utils/api";
import deleteIcon from "../../assets/delete.svg";
import "./KnowledgeBase.css";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDocuments();

        if (res.success && res.data) {
          setDocuments(res.data);
        } else {
          setDocuments([]);
        }
      } catch {
        setError("Failed to load documents.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleFileSelect = (file: File) => {
    const newDoc: KnowledgeDoc = {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: "local",
      createdAt: new Date().toISOString(),
    };

    setDocuments([newDoc, ...documents]);
  };

  return (
    <div className="knowledge-base">
      <h1 className="knowledge-base__title">Manage Your Knowledge Base</h1>

      <section className="knowledge-base__content">
        <p className="knowledge-base__label">Upload documents (PDF)</p>

        <UploadArea onFileSelect={handleFileSelect} />

        <div className="knowledge-base__library">
          {isLoading && (
            <p className="knowledge-base__status">Loading documents...</p>
          )}

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
              {documents.map((doc) => (
                <li className="knowledge-base__item" key={doc._id}>
                  <span className="knowledge-base__file-name">{doc.fileName}</span>
                  <button
                    className="knowledge-base__delete-button"
                    type="button"
                    aria-label={`Delete ${doc.fileName}`}
                  >
                    <img src={deleteIcon} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="knowledge-base__save-button" type="button">
          Save
        </button>
      </section>
    </div>
  );
}
