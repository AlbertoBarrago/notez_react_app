import { Component } from 'react';

class ErrorBoundary extends Component {
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
                <div className="error-page">
                    <div className="error-content">
                        <h1>Oops! Something went wrong</h1>
                        <p>{this.state.error?.message || 'An unexpected error occurred'}</p>
                        <button
                            onClick={() => window.location.href = '/notes'}
                            className="error-button"
                        >
                            Back to Notes
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
