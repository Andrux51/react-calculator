import React, { Component } from 'react';
import './App.css';
import Calculator from './components/Calculator';

const defaults = {
  INITIAL_RESULT: '0'
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: defaults.INITIAL_RESULT
    }
  };

  handleChangeResult = (val) => {
    console.log('you are here');

    this.setState({result: val}, () => {
      if(!this.state.result) {
        this.handleChangeResult(defaults.INITIAL_RESULT);
      }
    });
  };

  handleKeyDown = (e) => {
    // 10-key and keyboard numbers allow for numerical input
    if(parseInt(e.key, 10) || e.key === '0') {
      if(this.state.result === defaults.INITIAL_RESULT) {
        this.handleChangeResult(e.key);
      } else {
        this.handleChangeResult(this.state.result + e.key);
      }

      return;
    }

    // Backspace removes the number from the right end of the result
    if(e.key === 'Backspace') {
      this.handleChangeResult(this.state.result.substring(0,this.state.result.length - 1));
    }

    // Delete removes the number from the left end of the result
    if(e.key === 'Delete') {
      this.handleChangeResult(this.state.result.substring(1));

      return;
    }

    // Escape has the same functionality as the clear (C) button
    if(e.key === 'Escape') {
      this.handleChangeResult(defaults.INITIAL_RESULT);

      return;
    }
  };

  render() {
    return (
      <div className="App" onKeyDown={this.handleKeyDown} tabIndex="0">
        <p className="App-intro">
          Calculator:
        </p>
        <Calculator
          result={this.state.result}
          handleChangeResult={this.handleChangeResult}
        />
      </div>
    );
  };
};
