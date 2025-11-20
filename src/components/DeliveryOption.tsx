import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const DeliveryOption: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useFlow();
  const [selectedOption, setSelectedOption] = useState<"pickup" | "delivery" | null>(null);

  const handlePickup = () => {
    setSelectedOption("pickup");
    updateUserData({ 
      deliveryType: "pickup",
      address: "PICK UP" // Set default address for pickup orders
    });
    navigate("/payment");
  };

  const handleDelivery = () => {
    setSelectedOption("delivery");
    updateUserData({ deliveryType: "delivery" });
    navigate("/address");
  };

  return (
    <div className="delivery-option-page">
      {/* Main content container */}
      <div className="delivery-option-content-container">
        {/* Character image - using adress.webp as placeholder, can be replaced */}
        <div className="delivery-option-character">
          <img
            src="/adress.webp"
            alt="Delivery Character"
            className="delivery-option-character-img"
          />
        </div>

        {/* Option buttons */}
        <div className="delivery-option-buttons">
          <button
            className={`delivery-option-button ${
              selectedOption === "pickup" ? "selected" : ""
            }`}
            onClick={handlePickup}
          >
            PICK UP
          </button>
          <button
            className={`delivery-option-button ${
              selectedOption === "delivery" ? "selected" : ""
            }`}
            onClick={handleDelivery}
          >
            DELIVERY
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOption;

