import React from "react";

const TestComponent: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f6f4ef",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#1976d2" }}>Test Component</h1>
      <p>If you can see this, React is working!</p>
    </div>
  );
};

export default TestComponent;
