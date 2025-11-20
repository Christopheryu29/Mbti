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

  // Pricing constants
  const PRICES = {
    tshirt: 129,
    ringtee: 139,
    bucketHat: 80,
    cap: 75,
    patch: 12,
    bundlingDiscount: 10,
  };

  // Determine shirt type based on color
  // Premium colors (nolly, wolly, tilly, velly) = Ringer Tee
  // Regular colors (navy, black, white, grey) = T-shirt
  const getShirtType = (color: string): "tshirt" | "ringtee" => {
    const premiumColors = ["nolly", "wolly", "tilly", "velly"];
    return premiumColors.includes(color) ? "ringtee" : "tshirt";
  };

  // Calculate item details and prices
  const getOrderDetails = () => {
    const details: Array<{ name: string; price: number }> = [];
    const item = userData.selectedItem; // Shirt (or cap if only cap selected)
    const hat = userData.selectedHat; // Hat (only in bundle mode)

    // Add shirt if selected (in bundle or single shirt)
    if (item?.type === "shirt") {
      const shirtType = getShirtType(item.color || "");
      const shirtName = shirtType === "ringtee" ? "RINGER TEE" : "T-SHIRT";
      const shirtPrice = shirtType === "ringtee" ? PRICES.ringtee : PRICES.tshirt;
      details.push({ name: shirtName, price: shirtPrice });
    }

    // Add hat if selected (in bundle mode, hat is in selectedHat; in single cap mode, cap is in selectedItem)
    if (hat?.type === "cap") {
      // Bundle mode: hat is in selectedHat
      const hatName = hat.hatType === "bucket_hat" ? "BUCKET HAT" : "CAP";
      const hatPrice = hat.hatType === "bucket_hat" ? PRICES.bucketHat : PRICES.cap;
      details.push({ name: hatName, price: hatPrice });
    } else if (item?.type === "cap") {
      // Single cap mode: cap is in selectedItem
      const hatName = item.hatType === "bucket_hat" ? "BUCKET HAT" : "CAP";
      const hatPrice = item.hatType === "bucket_hat" ? PRICES.bucketHat : PRICES.cap;
      details.push({ name: hatName, price: hatPrice });
    }

    // Add patches
    if (userData.selectedPatches && userData.selectedPatches.length > 0) {
      const totalPatches = userData.selectedPatches.reduce(
        (sum, patch) => sum + patch.quantity,
        0
      );
      if (totalPatches > 0) {
        const patchPrice = totalPatches * PRICES.patch;
        details.push({ name: "ADD ON PATCH", price: patchPrice });
      }
    }

    return details;
  };

  // Check if bundling discount applies (shirt + hat)
  const hasBundlingDiscount = () => {
    // Bundle discount applies when user selected both shirt and cap
    return userData.isBundle === true;
  };

  // Calculate total price
  const calculateTotal = () => {
    const details = getOrderDetails();
    const subtotal = details.reduce((sum, item) => sum + item.price, 0);
    const discount = hasBundlingDiscount() ? PRICES.bundlingDiscount : 0;
    return subtotal - discount;
  };

  // Format order summary (for API)
  const getOrderSummary = () => {
    const item = userData.selectedItem; // Shirt (or cap if only cap selected)
    const hat = userData.selectedHat; // Hat (only in bundle mode)
    const summaries: string[] = [];

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

    // Add shirt summary
    if (item?.type === "shirt") {
      const color = colorLabels[item.color || ""] || item.color || "";
      const size = item.size?.toUpperCase() || "";
      const template = templateLabels[userData.shirtDesign?.template || ""] || "";
      const position = positionLabels[userData.shirtDesign?.position || ""] || "";

      const shirtType = getShirtType(item.color || "");
      const shirtName = shirtType === "ringtee" ? "Ringer Tee" : "T-shirt";
      let summary = `${shirtName} ${color}`;
      if (size) summary += ` ${size}`;
      if (template && position) {
        if (template === position && template === "Middle") {
          summary += ` ${template}`;
        } else {
          summary += ` ${template} ${position}`;
        }
      } else if (template) {
        summary += ` ${template}`;
      }
      summaries.push(summary);
    }

    // Add hat summary (in bundle mode, hat is in selectedHat; in single cap mode, cap is in selectedItem)
    if (hat?.type === "cap") {
      // Bundle mode: hat is in selectedHat
      const color = colorLabels[hat.color || ""] || hat.color || "";
      const hatName = hat.hatType === "bucket_hat" ? "Bucket Hat" : "Cap";
      summaries.push(`${hatName} ${color}`);
    } else if (item?.type === "cap") {
      // Single cap mode: cap is in selectedItem
      const color = colorLabels[item.color || ""] || item.color || "";
      const hatName = item.hatType === "bucket_hat" ? "Bucket Hat" : "Cap";
      summaries.push(`${hatName} ${color}`);
    }

    return summaries.join(" + ");
  };

  const handleNext = async () => {
    if (uploadedImage && userData.personalityType) {
      setIsProcessing(true);

      try {
        setProcessingStatus("Preparing order data...");

        // Prepare order data
        // For shirts use the selected template, for hats use "cap"
        const hasShirt = userData.selectedItem?.type === "shirt";
        const template = hasShirt 
          ? (userData.shirtDesign?.template || "middle")
          : "cap";
        const position = hasShirt 
          ? userData.shirtDesign?.position
          : undefined;

        // Get order summary
        const orderSummary = getOrderSummary();
        const itemPrice = calculateTotal();

        // Determine primary item type and color (shirt takes precedence, or cap if only cap)
        const itemType = userData.selectedItem?.type || "shirt";
        const color = userData.selectedItem?.color || "";

        const orderData: CompleteOrderData = {
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          personalityType: userData.personalityType || "",
          itemType: itemType,
          color: color,
          size: userData.selectedItem?.size || undefined,
          template: template,
          position: position,
          price: itemPrice,
          orderSummary: orderSummary,
          paymentImage: uploadedImage,
          selectedPatches: userData.selectedPatches || [],
          selectedHat: userData.selectedHat, // Include hat data (only in bundle mode)
        };

        setProcessingStatus("Processing order...");

        // Process order (upload to Google Drive and save to Google Sheets)
        const result = await ApiService.processOrder(orderData);

        if (result.success) {
          setProcessingStatus("Order processed successfully!");

          // Update user data with the results
          const finalPrice = calculateTotal();
          updateUserData({
            paymentInfo: {
              method: "image_upload",
              amount: finalPrice,
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
        <div className="payment-title">PAYMENT HERE</div>
        <div className="payment-note">NOTE TRANSFER: NAME_QUABUDZ</div>
      </div>

      {/* Details Section */}
      {userData.selectedItem && (
        <div className="payment-details-section">
          <div className="payment-details-title">DETAILS</div>
          <div className="payment-details-list">
            {getOrderDetails().map((detail, index) => (
              <div key={index} className="payment-details-item">
                <span className="payment-details-name">{detail.name}</span>
                <span className="payment-details-price">{detail.price}K</span>
              </div>
            ))}
            {hasBundlingDiscount() && (
              <div className="payment-details-item payment-details-discount">
                <span className="payment-details-name">DISC 10%*</span>
                <span className="payment-details-price">-{PRICES.bundlingDiscount}K</span>
              </div>
            )}
          </div>
          <div className="payment-details-divider"></div>
          <div className="payment-details-total">
            <span className="payment-details-total-label">TOTAL</span>
            <span className="payment-details-total-price">{calculateTotal()}K</span>
          </div>
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
