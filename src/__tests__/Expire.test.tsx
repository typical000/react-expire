import {mount, render, shallow} from 'enzyme';
import * as React from 'react';
import Expire from '../Expire';

describe('ReactExpire', () => {
  it('Should render nothing if no children was passed', () => {
    expect(render(<Expire until={1000} />).html()).toBeNull();
  });

  it('Should render children without changes if it was passed', () => {
    expect(
      mount(
        <Expire until={1000}>
          <div id="children">children</div>
        </Expire>,
      ).containsMatchingElement(<div id="children">children</div>),
    ).toBeTruthy();
  });

  it('Should render children as function correctly', () => {
    expect(
      mount(
        <Expire until={1000}>{() => <div id="children">children</div>}</Expire>,
      ).containsMatchingElement(<div id="children">children</div>),
    ).toBeTruthy();
  });

  it('Should call callback when timeout is expired', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
    const wrap = mount(<Expire until={1000} onExpire={callback} />);

    expect(callback).toHaveBeenCalledTimes(0); // Not called on mount
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('Should call callback with ID if it was passed as prop', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
    const wrap = mount(<Expire until={1000} onExpire={callback} id={5} />);

    jest.runAllTimers();
    expect(callback).toHaveBeenCalledWith(5);
  });

  it('Should pass correct params to children in case of render-prop usage', () => {
    jest.useFakeTimers();

    const mockedRender = jest.fn();

    shallow(<Expire until={1000}>{mockedRender}</Expire>);

    expect(mockedRender).toHaveBeenCalledWith(false); // Not yet expired.
    jest.runAllTimers();
    expect(mockedRender).toHaveBeenCalledWith(true); // After 1s was expired
  });

  it('Should never expire if 0 is set as timer property', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
    shallow(<Expire until={0} onExpire={callback} />);

    expect(callback).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('Should restart counters if new prop "until" was passed', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
    const wrap = shallow(<Expire until={1000} onExpire={callback} />);

    expect(callback).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1); // Called, as intended.

    // Change property for retriggering internal setTimeout
    wrap.setProps({
      until: 2000,
    });
    wrap.update();

    expect(callback).toHaveBeenCalledTimes(1); // Timers not yet finished running
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
