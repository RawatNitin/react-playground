import react, { Component, type ReactElement } from "react";

export class ErrorBoundary extends Component<
  { children: ReactElement; maxRetries: number },
  { hasError: boolean; error: Error; retryCount: number }
> {
  state = {
    hasError: false,
    error: undefined,
    retryCount: 0,
  };

  componentDidCatch(error: Error): void {
    // this.setState({ error: error, hasError: true });
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, retryCount: 0 };
  }

  onRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      retryCount: this.state.retryCount + 1,
    });
  };

  render() {
    console.log("errrr", this.state.error);
    if (this.state.hasError) {
      return (
        <div>
          {this.state.retryCount < this.props.maxRetries ? "true" : "false"}
          {this.state.retryCount < this.props.maxRetries ? (
            <button onClick={this.onRetry}>Retry</button>
          ) : null}
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}
