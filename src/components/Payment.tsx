import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";
import { ApiService } from "../services/apiService";
import type { CompleteOrderData } from "../types";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = async () => {
    if (uploadedImage && userData.personalityType) {
      setIsProcessing(true);

      try {
        setProcessingStatus("Preparing order data...");

        // Prepare order data
        const orderData: CompleteOrderData = {
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          personalityType: userData.personalityType,
          template: userData.shirtDesign?.template || "middle", // Default to middle if not set
          position: userData.shirtDesign?.position || undefined,
          paymentImage: uploadedImage,
        };

        setProcessingStatus("Processing order...");

        // Process order (upload to Google Drive and save to Google Sheets)
        const result = await ApiService.processOrder(orderData);

        if (result.success) {
          setProcessingStatus("Order processed successfully!");

          // Update user data with the results
          updateUserData({
            paymentInfo: {
              method: "image_upload",
              amount: 29.99,
              image: uploadedImage,
              imageUrl: result.paymentImageUrl,
            },
          });

          // Navigate to 48.jpg page after a short delay
          setTimeout(() => {
            navigate("/48.jpg");
          }, 1000);
        } else {
          setProcessingStatus(`Error: ${result.error}`);
          alert(`Error processing order: ${result.error}`);
        }
      } catch (error) {
        console.error("Error processing order:", error);
        setProcessingStatus("Error occurred during processing");
        alert(
          "An error occurred while processing your order. Please try again."
        );
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="payment-template">
      {/* Header */}
      <div className="payment-header">
        <div className="payment-subtitle">PLEASE SUBMIT</div>
        <div className="payment-title">PAYMENT HERE</div>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <div className="upload-box" onClick={handleUploadClick}>
          {imagePreview ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Uploaded payment" />
              <div className="upload-overlay">
                <div className="upload-text">UPLOAD IMAGE</div>
                <div className="upload-line"></div>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="upload-text">UPLOAD IMAGE</div>
              <div className="upload-line"></div>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Processing Status */}
      {processingStatus && (
        <div className="processing-status">{processingStatus}</div>
      )}

      {/* NEXT Button */}
      <button
        className="payment-next-button"
        onClick={handleNext}
        disabled={!uploadedImage || isProcessing}
      >
        {isProcessing ? "PROCESSING..." : "NEXT"}
      </button>
    </div>
  );
};

export default Payment;
