import { Component } from 'react';
import type { ReactNode } from 'react';

type HeroBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type HeroBoundaryState = {
  hasError: boolean;
};

/**
 * Isolates the WebGL hero. If Three.js / R3F throws (e.g. no WebGL context,
 * driver issue, or a runtime error in the scene), we render a static fallback
 * instead of letting the error propagate and blank the entire page.
 */
export class HeroBoundary extends Component<
  HeroBoundaryProps,
  HeroBoundaryState
> {
  state: HeroBoundaryState = { hasError: false };

  static getDerivedStateFromError(): HeroBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Surface the cause in dev without crashing the app.
    console.error('Hero 3D scene failed, using fallback:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
