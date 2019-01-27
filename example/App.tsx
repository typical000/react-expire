import * as React from 'react';
import Expire from '../src/Expire';
import * as css from './App.css';
import Button from './Button';

export default class App extends React.Component<
  {},
  {
    callbackTimer: number;
    expired: boolean;
    renderPropTimer: number;
  }
> {
  state = {
    callbackTimer: 2000,
    expired: false,
    renderPropTimer: 2000,
  };

  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>react-expire</h1>
        <div className={css.wrapper}>
          <h4>{`Expire component with render-prop (Timeout: ${
            this.state.renderPropTimer
          })`}</h4>
          <Expire until={this.state.renderPropTimer}>
            {(expired) =>
              expired ? (
                <div className={css.danger}>Expired</div>
              ) : (
                <div className={css.success}>Running</div>
              )
            }
          </Expire>
          <div className={css.item}>
            <Button onClick={this.handleChangeRenderPropTimer}>
              Randomize timer
            </Button>
          </div>

          <h4>{`Expire component with callback (Timeout: ${
            this.state.callbackTimer
          })`}</h4>
          <Expire until={this.state.callbackTimer} onExpire={this.handleExpire}>
            {this.state.expired ? (
              <div className={css.danger}>Expired</div>
            ) : (
              <div className={css.success}>Running</div>
            )}
          </Expire>
          <div className={css.item}>
            <Button onClick={this.handleChangeCallbackTimer}>
              Randomize timer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  private handleChangeRenderPropTimer = () => {
    this.setState({
      renderPropTimer: Math.floor(Math.random() * 10) * 1000,
    });
  };

  private handleChangeCallbackTimer = () => {
    this.setState({
      callbackTimer: Math.floor(Math.random() * 10) * 1000,
      expired: false,
    });
  };

  private handleExpire = () => {
    this.setState({
      expired: true,
    });
  };
}
