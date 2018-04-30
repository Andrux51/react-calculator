import React, { Component } from 'react';
import './App.css';

const constants = {
    CHARACTERS_ALLOWED: 12,
    INITIAL_RESULT: '0'
};

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: constants.INITIAL_RESULT,
            valuesEntered: [],
            buttonRows: [
                [
                    { label: '%', func: () => this.handleOperation('%', true) },
                    { label: '√', func: this.handleSquareRoot },
                    { label: '←', func: this.handleBackspace },
                    { label: 'CE', func: this.handleCalculatorReset }
                ],
                [
                    { label: '7', func: () => this.handleNumericalInput('7') },
                    { label: '8', func: () => this.handleNumericalInput('8') },
                    { label: '9', func: () => this.handleNumericalInput('9') },
                    { label: '+', func: () => this.handleOperation('+', true) }
                ],
                [
                    { label: '4', func: () => this.handleNumericalInput('4') },
                    { label: '5', func: () => this.handleNumericalInput('5') },
                    { label: '6', func: () => this.handleNumericalInput('6') },
                    { label: '-', func: () => this.handleOperation('-', true) }
                ],
                [
                    { label: '1', func: () => this.handleNumericalInput('1') },
                    { label: '2', func: () => this.handleNumericalInput('2') },
                    { label: '3', func: () => this.handleNumericalInput('3') },
                    { label: '÷', func: () => this.handleOperation('/', true) }
                ],
                [
                    { label: '=', func: this.handleEquals },
                    { label: '0', func: () => this.handleNumericalInput('0') },
                    { label: '.', func: () => this.handleNumericalInput('.') },
                    { label: '×', func: () => this.handleOperation('*', true) }
                ],
            ],
        }
    };

    handleBackspace = () => {
        // Backspace removes the number from the right end of the result
        this.handleChangeResult(this.state.result.substring(0, this.state.result.length - 1));
    };

    handleCalculation = () => {
        const evalIsEvil = this.state.valuesEntered.map((entered, i) => {
            return entered.val + entered.operation;
        }).join('');

        // "eval" without using eval()
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
        this.handleChangeResult(Function('"use strict";return (' + evalIsEvil + ')')());
    };

    handleCalculatorReset = () => {
        this.setState({ valuesEntered: [] });

        this.handleChangeResult(constants.INITIAL_RESULT);
    };

    handleChangeResult = (val) => {
        this.setState({ result: val.toString().slice(0, constants.CHARACTERS_ALLOWED) }, () => {
            if (!this.state.result) {
                this.handleChangeResult(constants.INITIAL_RESULT);
            }
        });
    };

    handleClick = (func) => {
        document.getElementsByClassName('App')[0].focus();

        func();
    };

    handleDelete = () => {
        // Del removes the number from the left end of the result
        this.handleChangeResult(this.state.result.substring(1));
    };

    handleEquals = () => {
        this.handleOperation('');

        if (this.state.valuesEntered.length > 1) {
            this.handleCalculation();
        }
        this.setState({ valuesEntered: [] });
    };

    handleKeyDown = (e) => {
        // restrict keyboard input to only desired keys
        if (parseInt(e.key, 10) || e.key === '0' || e.key === '.') {
            this.handleNumericalInput(e.key);

            return;
        }

        switch (e.key) {
            case 'Backspace':
                this.handleBackspace();
                break;
            case 'Delete':
                this.handleDelete();
                break;
            case 'Enter':
                this.handleEquals();
                break;
            case 'Escape':
                this.handleCalculatorReset();
                break;
            case '+':
                this.handleOperation('+', true);
                break;
            case '-':
                this.handleOperation('-', true);
                break;
            case 'x':
            case '*':
                this.handleOperation('*', true);
                break;
            case '/':
                this.handleOperation('/', true);
                break;
            case '%':
                this.handleOperation('%', true);
                break;
            default:
                break;
        }
    };

    handleNumericalInput = (val) => {
        // since we're concatenating a string of numbers, 0 needs to be explicitly replaced
        if (this.state.result === constants.INITIAL_RESULT) {
            this.handleChangeResult(val);
        } else {
            this.handleChangeResult(this.state.result + val);
        }
    };

    handleOperation = (operation, clear = false) => {
        // here instead of as function param for clarity of implementation
        if(operation === '%') {
            operation = '/100*';
        }
        
        this.state.valuesEntered.push({
            operation: operation,
            val: parseFloat(this.state.result)
        });

        if(clear) {
            this.handleChangeResult(constants.INITIAL_RESULT);
        }
    };

    handleSquareRoot = () => {
        this.handleChangeResult(Math.sqrt(this.state.result));
    };

    render() {
        return (
            <div className="App" onKeyDown={this.handleKeyDown} tabIndex="0">
                <p className="App-intro">
                    Calculator:
                </p>
                <div className="calculator-container">
                    <div className="calculator-hud">
                        {this.state.result}
                    </div>
                    <div className="calculator-body">
                        <table>
                            <tbody>
                            {
                                this.state.buttonRows.map((row, i) => {
                                    return (
                                        <tr key={i}>
                                        {
                                            row.map((btn, j) => {
                                                return (
                                                    <td className="calc-row" key={j}>
                                                        <button
                                                            type="button"
                                                            className="calc-row-button"
                                                            onClick={() => {this.handleClick(btn.func)}}
                                                        >
                                                            {btn.label}
                                                        </button>
                                                    </td>
                                                )
                                            })
                                        }
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };
};
