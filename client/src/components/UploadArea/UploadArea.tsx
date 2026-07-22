import "./UploadArea.css";

type Props = {
  onFileSelect: (file: File) => void;
};

export default function UploadArea({ onFileSelect }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <label
      className="upload-area"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        className="upload-area__input"
        type="file"
        accept="application/pdf"
        onChange={handleChange}
      />
      <span className="upload-area__icon">↥</span>
      <span className="upload-area__text">
        Drag and drop a PDF, or <span className="upload-area__link">Upload</span>
      </span>
    </label>
  );
}
