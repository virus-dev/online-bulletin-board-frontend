import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode | React.ReactElement,
}

interface ErrorBoundaryState {
  hasError: boolean,
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
