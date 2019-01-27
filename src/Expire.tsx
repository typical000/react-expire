import * as React from 'react';

interface ExpireProps {
  /**
   * Used as identifier of what was expired. Usefull if you have parent component
   * that renders "list" of "expirable" components, and you need to identify them in some way.
   * If not set - just "onExpire" will be called without any params.
   */
  id?: number | string;
  /**
   * Lifetime in milliseconds. If set 0 - this means that widget will never expire.
   * When widget will expire - 'onExpire' property will be triggered.
   */
  until: number;
  /**
   * Untouched children components. Not obbligatory at all.
   */
  children?: React.ReactNode;
  /**
   * Callback, that will be called when 'until' prop countdown will finish
   */
  onExpire?(id?: number | string): void;
}

interface ExpireState {
  expired: boolean;
}

/**
 * @class Expire
 * @classdesc "React component for managing time expiration
 */
export default class Expire extends React.Component<ExpireProps, ExpireState> {
  state = {
    expired: false,
  };

  private expireTimer: number | null;

  constructor(props: ExpireProps) {
    super(props);
    this.expireTimer = null;
  }

  componentDidMount() {
    if (this.props.until > 0) {
      this.startExpiration();
    }
  }

  componentDidUpdate(prevProps: ExpireProps) {
    const {until} = this.props;
    if (prevProps.until !== until) {
      // In any case, if this prop change - stop previous counter
      this.cancelExpiration();

      if (until !== 0) {
        // If lifetime is zero - it means, that widget will never expire
        this.startExpiration();
      }
    }
  }

  componentWillUnmount() {
    // Cleanup timers to avoid firing things when there is no component
    this.cancelExpiration();
  }

  render() {
    const {children} = this.props;

    if (typeof children === 'function') {
      return children(this.state.expired);
    }

    // Because react doesn't like 'undefined' as children.
    return children || null;
  }

  private startExpiration() {
    const {until, onExpire, id} = this.props;

    this.setState({
      expired: false,
    });

    this.expireTimer = window.setTimeout(() => {
      if (onExpire) {
        onExpire(id);
      }

      this.setState({
        expired: true,
      });
    }, until);
  }

  private cancelExpiration() {
    if (this.expireTimer) {
      clearTimeout(this.expireTimer);
    }
  }
}
