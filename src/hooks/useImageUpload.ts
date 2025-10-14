import { useState, useRef, useCallback } from "react";

interface UseImageUploadReturn {
  file: File | null;
  preview: string | null;
  isUploading: boolean;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
  clearImage: () => void;
  uploadImage: (uploadFn: (file: File) => Promise<void>) => Promise<void>;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        // Validate file type
        if (!selectedFile.type.startsWith("image/")) {
          setError("Please select a valid image file");
          return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (selectedFile.size > maxSize) {
          setError("File size must be less than 10MB");
          return;
        }

        setFile(selectedFile);
        setError(null);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.onerror = () => {
          setError("Failed to read file");
        };
        reader.readAsDataURL(selectedFile);
      }
    },
    []
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const clearImage = useCallback(() => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const uploadImage = useCallback(
    async (uploadFn: (file: File) => Promise<void>) => {
      if (!file) {
        setError("No file selected");
        return;
      }

      setIsUploading(true);
      setError(null);

      try {
        await uploadFn(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [file]
  );

  return {
    file,
    preview,
    isUploading,
    error,
    fileInputRef,
    handleFileSelect,
    triggerFileInput,
    clearImage,
    uploadImage,
  };
};
