import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // TO DO: log error to error reporting service
    }

    render() {
        const { hasError } = this.state;
        const { fallback, children } = this.props;
        if(hasError) {
            return fallback;
        } 
        return children;
    }
}

export default ErrorBoundary;