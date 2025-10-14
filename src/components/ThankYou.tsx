import React from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const { userData, resetFlow } = useFlow();

  const handleNewOrder = () => {
    resetFlow();
    navigate("/");
  };

  const handleGetOtherPatch = () => {
    navigate("/get-other-patch");
  };

  return (
    <div className="screen">
      <div className="container">
        <div className="header">
          <h1>Thank You!</h1>
        </div>

        <div className="content">
          <div className="thank-you-card">
            <div className="icon">🎉</div>
            <h2>Order Confirmed!</h2>
            <p>
              Thank you, <strong>{userData.name}</strong>! Your custom MBTI
              patch shirt has been ordered successfully.
            </p>

            <div className="order-details">
              <h3>Order Details</h3>
              <div className="detail-item">
                <span>Name:</span>
                <span>{userData.name}</span>
              </div>
              <div className="detail-item">
                <span>Phone:</span>
                <span>{userData.phone}</span>
              </div>
              <div className="detail-item">
                <span>Address:</span>
                <span>{userData.address}</span>
              </div>
              {userData.mbti && (
                <div className="detail-item">
                  <span>MBTI Type:</span>
                  <span className="mbti-badge">{userData.mbti}</span>
                </div>
              )}
              {userData.shirtDesign && (
                <div className="detail-item">
                  <span>Shirt:</span>
                  <span>
                    {userData.shirtDesign.color} {userData.shirtDesign.size} -{" "}
                    {userData.shirtDesign.design}
                  </span>
                </div>
              )}
              {userData.appointmentDate && (
                <div className="detail-item">
                  <span>Delivery Date:</span>
                  <span>
                    {new Date(userData.appointmentDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="button-group">
            <button className="secondary-button" onClick={handleGetOtherPatch}>
              Get Other Patch
            </button>
            <button className="primary-button" onClick={handleNewOrder}>
              Place New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
