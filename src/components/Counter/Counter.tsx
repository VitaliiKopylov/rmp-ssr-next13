import { Component, createElement } from 'react';
import styles from './styles.module.css';

type CounterProps = {
  initialValue: number;
};

export default class Counter extends Component<CounterProps, {}> {
  state = {
    counter: this.props.initialValue,
  };

  increaseCounter = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  decreaseCounter = () => {
    this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    return createElement(
      'div',
      { className: styles.container },
      createElement(
        'button',
        {
          className: styles.button,
          'data-testid': 'number-decrement',
          onClick: this.decreaseCounter,
        },
        '-'
      ),
      createElement(
        'div',
        { className: styles.result, 'data-testid': 'number-display' },
        this.state.counter
      ),
      createElement(
        'button',
        {
          className: styles.button,
          'data-testid': 'number-increment',
          onClick: this.increaseCounter,
        },
        '+'
      )
    );
  }
}
