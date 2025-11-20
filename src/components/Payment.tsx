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

  // Format order summary
  const getOrderSummary = () => {
    const item = userData.selectedItem;
    if (!item) return "";

    const colorLabels: { [key: string]: string } = {
      nolly: "Nolly",
      wolly: "Wolly",
      tilly: "Tilly",
      velly: "Velly",
      navy: "Navy",
      black: "Black",
      white: "White",
      grey: "Grey",
      beige: "Beige",
    };

    const templateLabels: { [key: string]: string } = {
      middle: "Middle",
      chest: "Chest",
      sleeve: "Sleeve",
    };

    const positionLabels: { [key: string]: string } = {
      left: "Left",
      right: "Right",
      middle: "Middle",
    };

    if (item.type === "shirt") {
      const color = colorLabels[item.color || ""] || item.color || "";
      const size = item.size?.toUpperCase() || "";
      const template = templateLabels[userData.shirtDesign?.template || ""] || "";
      const position = positionLabels[userData.shirtDesign?.position || ""] || "";

      let summary = `T-shirt ${color}`;
      if (size) summary += ` ${size}`;
      if (template && position) {
        // Avoid showing "Middle Middle" - just show "Middle"
        if (template === position && template === "Middle") {
          summary += ` ${template}`;
        } else {
          summary += ` ${template} ${position}`;
        }
      } else if (template) {
        summary += ` ${template}`;
      }
      return summary;
    } else if (item.type === "cap") {
      const color = colorLabels[item.color || ""] || item.color || "";
      return `Cap ${color}`;
    }

    return "";
  };

  const getPrice = () => {
    return userData.selectedItem?.price || 0;
  };

  const handleNext = async () => {
    if (uploadedImage && userData.personalityType) {
      setIsProcessing(true);

      try {
        setProcessingStatus("Preparing order data...");

        // Prepare order data
        // For caps, use "cap" as template, for shirts use the selected template
        const isCap = userData.selectedItem?.type === "cap";
        const template = isCap 
          ? "cap" 
          : (userData.shirtDesign?.template || "middle");
        const position = isCap 
          ? undefined 
          : userData.shirtDesign?.position;

        // Get order summary
        const orderSummary = getOrderSummary();
        const itemPrice = userData.selectedItem?.price || 0;

        const orderData: CompleteOrderData = {
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          personalityType: userData.personalityType || "",
          itemType: userData.selectedItem?.type || "shirt",
          color: userData.selectedItem?.color || "",
          size: userData.selectedItem?.size || undefined,
          template: template,
          position: position,
          price: itemPrice,
          orderSummary: orderSummary,
          paymentImage: uploadedImage,
          selectedPatches: userData.selectedPatches || [],
        };

        setProcessingStatus("Processing order...");

        // Process order (upload to Google Drive and save to Google Sheets)
        const result = await ApiService.processOrder(orderData);

        if (result.success) {
          setProcessingStatus("Order processed successfully!");

          // Update user data with the results
          const itemPrice = userData.selectedItem?.price || 0;
          updateUserData({
            paymentInfo: {
              method: "image_upload",
              amount: itemPrice,
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

      {/* Order Summary */}
      {userData.selectedItem && (
        <div className="order-summary-section">
          <div className="order-summary-title">ORDER SUMMARY</div>
          <div className="order-summary-item">{getOrderSummary()}</div>
          <div className="order-summary-price">{getPrice()}K</div>
        </div>
      )}

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
