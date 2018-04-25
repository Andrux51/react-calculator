import React, {Component} from 'react';
import CalculatorNumber from './CalculatorNumber';

export default class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numKeys: this.buildNumKeysArray(),
            otherButtons: [
                {label: '=', func: this.props.handleEquals},
                {label: '+', func: this.props.handleAddition},
                // '-',
                // 'x',
                // '/',
                // '%',
                // '√'
            ]
        };
    };

    buildNumKeysArray = () => {
        let numKeys = [0,1,2,3,4,5,6,7,8,9];
        
        // Making calculators more fun since 2018!
        while(numKeys.length < 10) {
            const rando = Math.floor(Math.random() * 10);
            if(!numKeys.includes(rando)) {
                numKeys.push(rando);
            }
        }

        return numKeys;
    };

    handleSetValue = (val) => {
        this.props.handleNumericalInput(val.toString());
    };

    render() {
        return (
            <div className="calculator-container">
                <div className="calculator-hud">
                    {this.props.result}
                </div>
                <div className="calculator-body">
                    {
                        this.state.numKeys.map((num) => {
                            return <CalculatorNumber
                                key={num}
                                val={num}
                                setValue={this.handleSetValue}
                            />;
                        })
                    }
                </div>
            </div>
        )
    };
};
