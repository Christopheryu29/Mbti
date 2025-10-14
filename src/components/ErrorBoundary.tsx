import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
            backgroundColor: "#f6f4ef",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h1 style={{ color: "#1976d2", marginBottom: "20px" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#666", textAlign: "center", maxWidth: "500px" }}>
            We're sorry, but something unexpected happened. Please refresh the
            page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Refresh Page
          </button>
          {this.state.error && (
            <details style={{ marginTop: "20px", maxWidth: "500px" }}>
              <summary style={{ cursor: "pointer", color: "#666" }}>
                Error Details (for developers)
              </summary>
              <pre
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "5px",
                  overflow: "auto",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
