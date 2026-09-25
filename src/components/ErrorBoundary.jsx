// src/components/ErrorBoundary.jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error for debugging
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReset = () => {
        // Reset state to clear the error boundary
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
        // Allow passing a custom fallback UI prop if needed
            if (this.props.fallback) {
                return this.props.fallback;
            }

      // Default section fallback UI with a "Try again" button
        return (
            <div className="p-4 m-2 bg-red-50 border border-red-200 rounded-lg text-center shadow-sm">
            <h3 className="text-base font-semibold text-red-700">
                {this.props.sectionName || "This section"} ran into a problem
            </h3>
            <p className="text-sm text-red-500 mt-1">
                {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
                onClick={this.handleReset}
                className="mt-3 bg-red-600 text-white px-3 py-1.5 text-xs font-medium rounded hover:bg-red-700 transition-colors"
            >
                Try again
            </button>
            </div>
        );
    }

    return this.props.children;
    }
}

export default ErrorBoundary;