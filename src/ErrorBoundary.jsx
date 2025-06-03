import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.error("🔥 Error caught by ErrorBoundary:", error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("⚠️ Error info:", errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1 style={{ color: 'red' }}>Something went wrong!.</h1>;
        }

        return this.props.children;
    }
}
