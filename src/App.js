import React, { Component } from 'react';
import './App.css';
import Calculator from './components/Calculator';

const constants = {
  INITIAL_RESULT: '0'
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: constants.INITIAL_RESULT,
      valuesEntered: []
    }
  };

  handleCalculatorReset = () => {
    this.setState({valuesEntered: []});
    this.handleChangeResult(constants.INITIAL_RESULT);
  }

  handleChangeResult = (val) => {
    this.setState({result: val}, () => {
      if(!this.state.result) {
        this.handleChangeResult(constants.INITIAL_RESULT);
      }
    });
  };

  handleNumericalInput = (val) => {
    if(this.state.result === constants.INITIAL_RESULT) {
      this.handleChangeResult(val);
    } else {
      this.handleChangeResult(this.state.result + val);
    }
  }

  handleKeyDown = (e) => {
    // 10-key and keyboard numbers allow for numerical input
    if(parseInt(e.key, 10) || e.key === '0' || e.key === '.') {
      this.handleNumericalInput(e.key);

      return;
    }

    console.log(e.key);

    switch(e.key) {
      case 'Backspace':
        // Backspace removes the number from the right end of the result
        this.handleChangeResult(this.state.result.substring(0,this.state.result.length - 1));
        break;
      case 'Delete':
        // Del removes the number from the left end of the result
        this.handleChangeResult(this.state.result.substring(1));
        break;
      case 'Enter':
        this.handleEquals();
        break;
      case 'Escape':
        // Escape has the same functionality as the clear (C) button
        this.handleCalculatorReset();
        break;
      case '+':
        this.handleAddition();
        break;
      default:
        break;
    }
  };

  handleOperation = (operation) => {
    this.state.valuesEntered.push({
      operation: operation,
      val: parseFloat(this.state.result)
    });

  }

  handleAddition = () => {
    this.handleOperation('+');

    if(this.state.valuesEntered.length > 1) {
      this.handleCalculation();
    }
    this.handleChangeResult(constants.INITIAL_RESULT);
  };

  handleEquals = () => {
    this.handleOperation('');

    if(this.state.valuesEntered.length > 1) {
      this.handleCalculation();
    }
    this.setState({valuesEntered: []});
  }

  handleCalculation = () => {
    // console.log(this.state.valuesEntered);

    const evalIsSoVeryBadButWhatchaGonnaDo = this.state.valuesEntered.map((entered) => {
      return entered.val + entered.operation;
    }).join('');

    // eslint-disable-next-line
    this.handleChangeResult(eval(evalIsSoVeryBadButWhatchaGonnaDo));
  };

  render() {
    return (
      <div className="App" onKeyDown={this.handleKeyDown} tabIndex="0">
        <p className="App-intro">
          Calculator:
        </p>
        <Calculator
          handleAddition={this.handleAddition}
          handleEquals={this.handleEquals}
          handleNumericalInput={this.handleNumericalInput}
          result={this.state.result}
        />
      </div>
    );
  };
};
