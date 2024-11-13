import React from 'react';
import {useNavigate} from "react-router-dom";
import Auth from "@/services/auth/index.js";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <h2>Something went wrong</h2>
                    <p>{this.state.error.message}</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="error-reset-button"
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
