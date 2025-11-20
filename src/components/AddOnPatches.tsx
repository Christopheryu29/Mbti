import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

interface PatchQuantity {
  patchId: string;
  quantity: number;
}

const AddOnPatches: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useFlow();
  
  // Initialize patches with quantity 0 (default) - using new descriptive IDs
  const [patchQuantities, setPatchQuantities] = useState<Record<string, number>>({
    "num_1": 0, "num_2": 0, "num_3": 0, "num_4": 0, "num_5": 0, "num_6": 0,
    "num_7": 0, "num_8": 0, "num_9": 0, "num_0": 0, "laptop": 0, "flower_bouquet": 0,
    "robot": 0, "rocket": 0, "lightning": 0, "money": 0, "cone": 0, "bom": 0,
    "car": 0, "helicopter": 0, "fire": 0, "flower_red": 0, "flower_purple": 0, "flower_yellow": 0,
    "planet_heart": 0, "heart": 0, "ribbon": 0, "camera": 0, "ufo": 0, "planet": 0,
    "glasses": 0, "chef_hat": 0, "graduation_cap": 0,
  });

  const patches = [
    { id: "num_1", image: "/add_on_patches_1.png" },
    { id: "num_2", image: "/add_on_patches_2.png" },
    { id: "num_3", image: "/add_on_patches_3.png" },
    { id: "num_4", image: "/add_on_patches_4.png" },
    { id: "num_5", image: "/add_on_patches_5.png" },
    { id: "num_6", image: "/add_on_patches_6.png" },
    { id: "num_7", image: "/add_on_patches_7.png" },
    { id: "num_8", image: "/add_on_patches_8.png" },
    { id: "num_9", image: "/add_on_patches_9.png" },
    { id: "num_0", image: "/add_on_patches_10.png" },
    { id: "laptop", image: "/add_on_patches_11.png" },
    { id: "flower_bouquet", image: "/add_on_patches_12.png" },
    { id: "robot", image: "/add_on_patches_13.png" },
    { id: "rocket", image: "/add_on_patches_14.png" },
    { id: "lightning", image: "/add_on_patches_15.png" },
    { id: "money", image: "/add_on_patches_16.png" },
    { id: "cone", image: "/add_on_patches_17.png" },
    { id: "bom", image: "/add_on_patches_18.png" },
    { id: "car", image: "/add_on_patches_19.png" },
    { id: "helicopter", image: "/add_on_patches_20.png" },
    { id: "fire", image: "/add_on_patches_21.png" },
    { id: "flower_red", image: "/add_on_patches_22.png" },
    { id: "flower_purple", image: "/add_on_patches_23.png" },
    { id: "flower_yellow", image: "/add_on_patches_24.png" },
    { id: "planet_heart", image: "/add_on_patches_25.png" },
    { id: "heart", image: "/add_on_patches_26.png" },
    { id: "ribbon", image: "/add_on_patches_27.png" },
    { id: "camera", image: "/add_on_patches_28.png" },
    { id: "ufo", image: "/add_on_patches_29.png" },
    { id: "planet", image: "/add_on_patches_30.png" },
    { id: "glasses", image: "/add_on_patches_31.png" },
    { id: "chef_hat", image: "/add_on_patches_32.png" },
    { id: "graduation_cap", image: "/add_on_patches_33.png" },
  ];

  const handleDecrease = (patchId: string) => {
    setPatchQuantities((prev) => {
      const current = prev[patchId] || 0;
      return {
        ...prev,
        [patchId]: Math.max(0, current - 1),
      };
    });
  };

  const handleIncrease = (patchId: string) => {
    setPatchQuantities((prev) => {
      const current = prev[patchId] || 0;
      return {
        ...prev,
        [patchId]: current + 1,
      };
    });
  };

  const handleNext = () => {
    // Convert patch quantities to array format for storage
    const selectedPatches: PatchQuantity[] = Object.entries(patchQuantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([patchId, quantity]) => ({
        patchId,
        quantity,
      }));

    updateUserData({
      selectedPatches: selectedPatches,
    });

    navigate("/phone");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="add-on-patches-page">
      <button className="add-on-patches-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="add-on-patches-title">
        <div className="add-on-patches-title-line">ADD ON</div>
        <div className="add-on-patches-title-line">PATCHES</div>
      </div>

      <div className="add-on-patches-container">
        <div className="add-on-patches-grid">
          {patches.map((patch) => (
            <div key={patch.id} className="add-on-patches-item">
              <div className="add-on-patches-image-wrapper">
                <img src={patch.image} alt={`Patch ${patch.id}`} />
              </div>
              <div className="add-on-patches-quantity-selector">
                <button
                  className="add-on-patches-quantity-button"
                  onClick={() => handleDecrease(patch.id)}
                >
                  −
                </button>
                <span className="add-on-patches-quantity-number">
                  {patchQuantities[patch.id] || 0}
                </span>
                <button
                  className="add-on-patches-quantity-button"
                  onClick={() => handleIncrease(patch.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="page20-next-button" onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
};

export default AddOnPatches;

