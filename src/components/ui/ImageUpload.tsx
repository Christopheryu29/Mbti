import React from "react";
import { useImageUpload } from "../../hooks";

export interface ImageUploadProps {
  onImageSelect?: (file: File, preview: string) => void;
  className?: string;
  placeholder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  className = "",
  placeholder = "UPLOAD IMAGE",
}) => {
  const {
    file,
    preview,
    error,
    fileInputRef,
    handleFileSelect,
    triggerFileInput,
  } = useImageUpload();

  React.useEffect(() => {
    if (file && preview && onImageSelect) {
      onImageSelect(file, preview);
    }
  }, [file, preview, onImageSelect]);

  return (
    <div className={`image-upload-component ${className}`}>
      <div className="upload-box" onClick={triggerFileInput}>
        {preview ? (
          <div className="image-preview">
            <img src={preview} alt="Uploaded" />
            <div className="upload-overlay">
              <div className="upload-text">{placeholder}</div>
              <div className="upload-line"></div>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-text">{placeholder}</div>
            <div className="upload-line"></div>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      {error && <div className="upload-error">{error}</div>}
    </div>
  );
};
