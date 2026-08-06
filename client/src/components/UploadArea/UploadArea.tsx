import "./UploadArea.css";

type Props = {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
};

export default function UploadArea({ onFileSelect, isUploading }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && !isUploading) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    if (isUploading) {
      return;
    }

    const file = event.dataTransfer.files?.[0];

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <label
      className={
        isUploading ? "upload-area upload-area_disabled" : "upload-area"
      }
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        className="upload-area__input"
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        disabled={isUploading}
      />
      <span className="upload-area__icon">↥</span>
      <span className="upload-area__text">
        {isUploading ? (
          "Uploading..."
        ) : (
          <>
            Drag and drop a PDF, or{" "}
            <span className="upload-area__link">Upload</span>
          </>
        )}
      </span>
    </label>
  );
}
