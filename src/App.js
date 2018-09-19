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
        } else if (val !== "." || !hasDecimal) {
            return this.state.display + val;
            } else {
                return this.state.display;
            }
    }

    setInput(val) {
        const decimalRegex = /\./;
        const hasDecimal = decimalRegex.test(this.state.display);
        const operatorRegex = /[+ \- * / ]$/;
        const endsInOperator = operatorRegex.test(this.state.input);

        if (this.state.input === "") {
            return val;
        } else if (val !== "." || !hasDecimal || endsInOperator) {
            return this.state.input + val;
        } else {
            return this.state.input;
        }
    }

    handleNumberInput(val) {
        this.setState({
            display: this.setDisplay(val),
            input: this.setInput(val)
        });
    }

    handleOperatorInput(val) {
        const operatorRegex = /[+ \- * /]$/;
        const numRegex = /[\d]/;
        const previousCharIsNum = numRegex.test(this.state.input);
        const endsInOperator = operatorRegex.test(this.state.input);
        function evil(fn) {
            return new Function('return ' + fn)();
        }

        if (val === "=") {
            if (!endsInOperator) {
                this.setState({
                	display: (Math.round(evil(this.state.input) * 1000000) / 1000000).toString(),
                    input: (Math.round(evil(this.state.input) * 1000000) / 1000000).toString()});
            } else if (previousCharIsNum) {
                this.setState({
                	input: (Math.round(evil(this.state.input.slice(0, -1)) * 1000000) / 1000000).toString(),
                    display: (Math.round(evil(this.state.input.slice(0, -1)) * 1000000) / 1000000).toString()});
            } else {
                this.setState({input: "", display: "0"});
            }
        }

        else {
            if (endsInOperator) {
                this.setState({input: this.state.input.slice(0, -1).concat(val)});
            } else {
                this.setState({input: this.state.input + val})};
        }            
    }

    handleClear() {
        this.setState({
            display: "0",
            input: ""
        });
    }

    
    render() {
      const displayClass = "display " + this.state.fade;
      const inputClass = "input-display " + this.state.fade;
        return (
          <div className="App">
            <div className="calculator">
              <SolarPanel mouseOver={this.handleSolarMouseOn} mouseOff={this.handleSolarMouseOff} />
              <div className={inputClass}>
                <p>{this.state.input}</p>
              </div>
              <div className={displayClass} id="display">
                {this.state.display.length > 10 ?
                    Number(this.state.display).toExponential(6) 
                    :
                    this.state.display}
              </div>
              <div className="calc-button number-button" id="seven" onClick={()=>this.handleNumberInput("7")} >7
              </div>
              <div className="calc-button number-button" id="eight" onClick={()=>this.handleNumberInput("8")} >8
              </div>
              <div className="calc-button number-button" id="nine" onClick={()=>this.handleNumberInput("9")} >9
              </div>
              <div className="calc-button number-button" id="four" onClick={()=>this.handleNumberInput("4")} >4
              </div>
              <div className="calc-button number-button" id="five" onClick={()=>this.handleNumberInput("5")} >5
              </div>
              <div className="calc-button number-button" id="six" onClick={()=>this.handleNumberInput("6")} >6
              </div>
              <div className="calc-button number-button" id="one" onClick={()=>this.handleNumberInput("1")} >1
              </div>
              <div className="calc-button number-button" id="two" onClick={()=>this.handleNumberInput("2")} >2
              </div>
              <div className="calc-button number-button" id="three" onClick={()=>this.handleNumberInput("3")} >3
              </div>
              <div className="calc-button number-button" id="zero" onClick={()=>this.handleNumberInput("0")} >0
              </div>
              <div className="calc-button number-button" id="decimal" onClick={()=>this.handleNumberInput(".")} >.
              </div>
              <div className="calc-button operator-button" id="add" onClick={()=>this.handleOperatorInput("+")}>+
              </div>
              <div className="calc-button operator-button" id="subtract" onClick={()=>this.handleOperatorInput("-")}>-
              </div>
              <div className="calc-button operator-button" id="multiply" onClick={()=>this.handleOperatorInput("*")}>*
              </div>
              <div className="calc-button operator-button" id="divide" onClick={()=>this.handleOperatorInput("/")}>/
              </div>
              <div className="calc-button operator-button" id="equals" onClick={()=>this.handleOperatorInput("=")}>=
              </div>
              <div className="calc-button clear-button" id="clear" onClick={this.handleClear}>C
              </div>
            </div>
          </div>
        );
    }
}

export default App;
