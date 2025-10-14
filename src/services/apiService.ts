// API service for handling Google Drive and Sheets operations
import type { CompleteOrderData, OrderResult } from "../types";
import { handleError, logError } from "../utils/errorHandler";
import { config } from "../config/env";

export class ApiService {
  static async processOrder(
    orderData: CompleteOrderData
  ): Promise<OrderResult> {
    try {
      const sheetsId = config.get("googleSheetsId");
      const apiBaseUrl = config.get("apiBaseUrl");

      if (config.get("isDevelopment")) {
        console.log("Processing order with data:", {
          ...orderData,
          paymentImage: orderData.paymentImage.name,
        });
      }

      const hasGoogleConfig = sheetsId;

      if (!hasGoogleConfig) {
        logError(
          "Google APIs not configured, using fallback mode",
          "ApiService.processOrder"
        );
        return this.processOrderFallback(orderData);
      }

      // Use backend server to process the complete order
      const formData = new FormData();
      formData.append("name", orderData.name);
      formData.append("phone", orderData.phone);
      formData.append("address", orderData.address);
      formData.append("personalityType", orderData.personalityType);
      formData.append("template", orderData.template);
      if (orderData.position) {
        formData.append("position", orderData.position);
      }
      formData.append("paymentImage", orderData.paymentImage);

      const response = await fetch(`${apiBaseUrl}/process-order`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        logError(
          `Backend server error: ${errorText}`,
          "ApiService.processOrder"
        );
        return this.processOrderFallback(orderData);
      }

      const result = await response.json();

      return {
        success: true,
        paymentImageUrl: result.webViewLink,
        rowNumber: result.rowNumber,
      };
    } catch (error) {
      logError(error, "ApiService.processOrder");
      return this.processOrderFallback(orderData);
    }
  }

  // Fallback method that works without Google APIs
  private static async processOrderFallback(
    orderData: CompleteOrderData
  ): Promise<OrderResult> {
    try {
      // Create a local data URL for the image
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => {
          const imageDataUrl = reader.result as string;

          // Log the order data to console (for development)
          console.log("Order Data (Fallback Mode):", {
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            personalityType: orderData.personalityType,
            template: orderData.template,
            position: orderData.position,
            timestamp: new Date().toISOString(),
            imageDataUrl: imageDataUrl.substring(0, 100) + "...", // Truncate for logging
          });

          resolve({
            success: true,
            paymentImageUrl: imageDataUrl,
            rowNumber: Date.now(), // Use timestamp as row number
          });
        };
        reader.readAsDataURL(orderData.paymentImage);
      });
    } catch (error) {
      console.error("Fallback processing error:", error);
      return {
        success: false,
        error: "Failed to process order in fallback mode",
      };
    }
  }
}
