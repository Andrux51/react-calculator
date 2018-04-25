import React, {Component} from 'react';

export default class CalculatorNumber extends Component {
    handleClick = (e) => {
        document.getElementsByClassName('App')[0].focus();

        this.props.setValue(this.props.val);
    };

    render() {
        return (
            <div className="calculator-number">
                <button
                    type="button"
                    className="calculator-number-button"
                    onClick={this.handleClick}
                >
                    {this.props.val}
                </button>
            </div>
        )
    };
};
