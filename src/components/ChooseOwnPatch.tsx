import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PATCH_DESIGNS = [
  {
    id: 1,
    name: "Nature Lover",
    description: "For those who find peace in nature",
    color: "green",
    price: 15.99,
  },
  {
    id: 2,
    name: "Creative Soul",
    description: "For the artistic and imaginative",
    color: "purple",
    price: 15.99,
  },
  {
    id: 3,
    name: "Social Butterfly",
    description: "For the outgoing and energetic",
    color: "yellow",
    price: 15.99,
  },
  {
    id: 4,
    name: "Peaceful Mind",
    description: "For the calm and thoughtful",
    color: "blue",
    price: 15.99,
  },
  {
    id: 5,
    name: "Adventure Seeker",
    description: "For those who love exploration",
    color: "orange",
    price: 15.99,
  },
  {
    id: 6,
    name: "Tech Enthusiast",
    description: "For the digital native",
    color: "cyan",
    price: 15.99,
  },
  {
    id: 7,
    name: "Bookworm",
    description: "For the knowledge seeker",
    color: "brown",
    price: 15.99,
  },
  {
    id: 8,
    name: "Fitness Fanatic",
    description: "For the health conscious",
    color: "red",
    price: 15.99,
  },
];

const ChooseOwnPatch: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPatch, setSelectedPatch] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedPatch) {
      // Store selected patch and go to order flow
      navigate("/claim-order");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch");
  };

  return (
    <div className="screen">
      <div className="container">
        <div className="header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1>Choose Your Patch</h1>
        </div>

        <div className="content">
          <div className="patch-collection">
            <h2>Available Patch Designs</h2>
            <div className="patch-grid">
              {PATCH_DESIGNS.map((patch) => (
                <div
                  key={patch.id}
                  className={`patch-card ${
                    selectedPatch === patch.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPatch(patch.id)}
                >
                  <div
                    className="patch-preview"
                    style={{ backgroundColor: patch.color }}
                  >
                    <div className="patch-icon">🧩</div>
                  </div>
                  <div className="patch-info">
                    <h3>{patch.name}</h3>
                    <p>{patch.description}</p>
                    <div className="patch-price">${patch.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedPatch && (
            <div className="selected-patch-info">
              <h3>Selected Patch</h3>
              <div className="selected-patch-details">
                {(() => {
                  const patch = PATCH_DESIGNS.find(
                    (p) => p.id === selectedPatch
                  );
                  return patch ? (
                    <>
                      <div
                        className="patch-preview"
                        style={{ backgroundColor: patch.color }}
                      >
                        <div className="patch-icon">🧩</div>
                      </div>
                      <div className="patch-details">
                        <h4>{patch.name}</h4>
                        <p>{patch.description}</p>
                        <div className="patch-price">${patch.price}</div>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <button
            className="primary-button"
            onClick={handleNext}
            disabled={!selectedPatch}
          >
            Continue to Order
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseOwnPatch;
