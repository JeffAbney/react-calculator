import React, { Component } from 'react';
import './App.css';

const SolarPanel = (props) => {
	    return (
		      <div className="solar-panel" id="solar-panel" onMouseOver={props.mouseOver} onMouseOut={props.mouseOff}>
                <div className="solar-panel-line" />
                <div className="solar-panel-line" />
                <div className="solar-panel-line" />
                <div className="solar-panel-line" />
                <div className="solar-panel-line" />
          </div>
	    );
};

const Display = (props) => {
  const { fade, display, input } = props.state;
  const displayClass = `display ${fade}`;
  const inputClass = `input-display ${fade}`;
	return (
	  <div className="display-container">
	    <div className={inputClass}>
          <p>{input}</p>
        </div>
        <div className={displayClass} id="display">{display.length > 10 ? Number(display).toExponential(6) : display}
        </div>
        <div 
            className="calc-button clear-button"
            id="clear"
            onClick={props.onClick}>
            C
        </div>
      </div>
	)
};

const NumberPad = (props) => {
	const { handleNumberInput, handleOperatorInput } = props;
	return (
  <div className="number-pad">
    <div 
        className="calc-button number-button"
        id="seven" 
        onClick={() => handleNumberInput("7")} 
    >
      7
    </div>
    <div 
        className="calc-button number-button"
        id="eight" 
        onClick={() => handleNumberInput("8")} 
    >
      8
    </div>
    <div 
        className="calc-button number-button" 
        id="nine" 
        onClick={() => handleNumberInput("9")} 
    >
      9
    </div>
    <div 
        className="calc-button number-button" 
        id="four" 
        onClick={() => handleNumberInput("4")} 
    >
      4
    </div>
    <div 
        className="calc-button number-button" 
        id="five" 
        onClick={() => handleNumberInput("5")} 
    >
      5
    </div>
    <div 
        className="calc-button number-button" 
        id="six" 
        onClick={() => handleNumberInput("6")} 
    >
      6
    </div>
    <div
       className="calc-button number-button" 
       id="one" 
       onClick={() => handleNumberInput("1")} 
    >
      1
    </div>
    <div 
        className="calc-button number-button" 
        id="two" 
        onClick={() => handleNumberInput("2")} 
    >
      2
    </div>
    <div 
        className="calc-button number-button" 
        id="three" 
        onClick={() => handleNumberInput("3")} 
    >
      3
    </div>
    <div 
        className="calc-button number-button" 
        id="zero" 
        onClick={() => handleNumberInput("0")} 
    >
      0
    </div>
    <div 
        className="calc-button number-button" 
        id="decimal" 
        onClick={() => handleNumberInput(".")} 
    >
      .
    </div>
    <div 
        className="calc-button operator-button" 
        id="add" 
        onClick={() => handleOperatorInput("+")}
    >
      +
    </div>
    <div 
        className="calc-button operator-button" 
        id="subtract" 
        onClick={() => handleOperatorInput("-")}
    >
      -
    </div>
    <div 
        className="calc-button operator-button" 
        id="multiply" 
        onClick={() => handleOperatorInput("*")}
    >
      *
    </div>
    <div 
        className="calc-button operator-button" 
        id="divide" 
        onClick={() => handleOperatorInput("/")}
    >
      /
    </div>
    <div 
        className="calc-button operator-button" 
        id="equals" 
        onClick={() => handleOperatorInput("=")}
    >
      =
    </div>	
  </div>
)}

/* ----------------------- Main App ------------------------- */
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "0",
            input: "",
            fade: ""
        };

        this.handleSolarMouseOn = this.handleSolarMouseOn.bind(this);
        this.handleSolarMouseOff = this.handleSolarMouseOff.bind(this);
        this.handleNumberInput = this.handleNumberInput.bind(this);
        this.handleOperatorInput = this.handleOperatorInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.setDisplay = this.setDisplay.bind(this);
        this.setInput = this.setInput.bind(this);
    }

    handleSolarMouseOn() {
        this.setState({
            fade: "faded"
        });
    }

    handleSolarMouseOff() {
        this.setState({
            fade: ""
        });
    }

    setDisplay(val) {
        const decimalRegex = /\./;
        const hasDecimal = decimalRegex.test(this.state.display);
        const operatorRegex = /[+ \- * / ]$/;
        const endsInOperator = operatorRegex.test(this.state.input);
        if (endsInOperator || this.state.display === "0") {
            return val;
        }
        if (val !== "." || !hasDecimal) {
            return this.state.display + val;
            }
        return this.state.display; 
    }

    setInput(val) {
    	const { input } = this.state;
        const decimalRegex = /\./;
        const hasDecimal = decimalRegex.test(this.state.display);
        const operatorRegex = /[+ \- * / ]$/;
        const endsInOperator = operatorRegex.test(input);

        if (input === "") {
            return val;
        } else if (val !== "." || !hasDecimal || endsInOperator) {
            return input + val;
        } else {
            return input;
        }
    }

    handleNumberInput(val) {
        this.setState({
            display: this.setDisplay(val),
            input: this.setInput(val)
        });
    }


    handleOperatorInput(val) {
    	const { input } = this.state;
        const operatorRegex = /[+ \- * /]$/;
        const numRegex = /[\d]/;
        const previousCharIsNum = numRegex.test(input);
        const endsInOperator = operatorRegex.test(input);
        const callBackFunc = (val) => new Function('return ' + val);
        const evil = (inputVal) => (callBackFunc(inputVal));


        if (val === "=") {
            if (!endsInOperator) {
                this.setState({
                    input: (
                    	Math.round(evil(input)() * 1000000) / 1000000
                    	).toString(),
                    display: (
                    	Math.round(evil(input)() * 1000000) / 1000000
                    	).toString()
                });
            } else if (previousCharIsNum) {
                this.setState({
                	input: (
                	    Math.round(evil(input.slice(0, -1))() * 1000000) / 1000000
                	).toString(),
                    display: (
                    	Math.round(evil(input.slice(0, -1))() * 1000000) / 1000000
                    ).toString()
                });
            } else {
                this.setState({input: "", display: "0"});
            }
        } else if (endsInOperator) {
            this.setState({input: input.slice(0, -1).concat(val)});
        } else {
                this.setState({input: input + val});
        }        
    }

      
    handleClear() {
        this.setState({
            display: "0",
            input: ""
        });
    }

    
    render() {

        return (
            <div className="App">
              <div className="calculator">
                <SolarPanel
                    mouseOver={this.handleSolarMouseOn}
                    mouseOff={this.handleSolarMouseOff}
                />
                <Display 
                    state={this.state} 
                    onClick={this.handleClear}
                />
                <NumberPad 
                    state={this.state} 
                    handleNumberInput={(e)=>this.handleNumberInput(e)}
                    handleOperatorInput={(e)=>this.handleOperatorInput(e)}
                />
              </div>
            </div>
        );
    }
}

export default App;
