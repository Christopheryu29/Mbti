import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useFlow } from "../contexts/FlowContext";

const ClaimOrder: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useFlow();

  const handleClaimOrder = () => {
    navigate("/design-shirt");
  };

  const handleGetOtherPatch = () => {
    navigate("/get-other-patch");
  };

  return (
    <div className="screen">
      <div className="container">
        <div className="header">
          <h1>Claim Your Order</h1>
        </div>

        <div className="content">
          <div className="order-card">
            <div className="icon">🎁</div>
            <h2>Congratulations, {userData.name}!</h2>
            <p>
              Based on your personality type, we've prepared a special patch
              just for you.
            </p>

            {userData.mbti && (
              <div className="mbti-display">
                <span className="mbti-badge">{userData.mbti}</span>
              </div>
            )}

            {userData.testResults && (
              <div className="personality-display">
                <span className="personality-badge">
                  {Object.entries(userData.testResults)
                    .reduce((a, b) =>
                      userData.testResults![
                        a[0] as keyof typeof userData.testResults
                      ] >
                      userData.testResults![
                        b[0] as keyof typeof userData.testResults
                      ]
                        ? a
                        : b
                    )[0]
                    .toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="footer">
          <div className="button-group">
            <button className="secondary-button" onClick={handleGetOtherPatch}>
              Get Other Patch
            </button>
            <button className="primary-button" onClick={handleClaimOrder}>
              Claim Order & Make Order
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimOrder;
