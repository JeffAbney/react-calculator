import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			display: "0",
			input: "",
			lastOperator: "",
		}

		this.handleNumberInput = this.handleNumberInput.bind(this);
		this.handleOperatorInput = this.handleOperatorInput.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}

	handleNumberInput(val){
		const decimalRegex = /\./;
		const decimalCheck = decimalRegex.test(this.state.display);
		const operatorRegex = /[\+\-\*\/]$/;
		const operatorCheck = operatorRegex.test(this.state.input);
		this.setState({
			display: operatorCheck ? val : this.state.display === "0" ? val : val !== "." ? this.state.display + val
			        : decimalCheck ? this.state.display : this.state.display + val,
			input: this.state.display === "0" ? val : val !== "." ? this.state.input + val
			        : decimalCheck ? this.state.input : this.state.input + val,
		})
	}

	handleOperatorInput(val){
		const operatorRegex = /[\+\-\*\/]$/;
		const operatorCheck = operatorRegex.test(this.state.input);
		val === "=" ? operatorCheck ? 
		        this.setState({input: eval(this.state.input.slice(0, -1)), display: eval(this.state.input.slice(0, -1))})
		                :this.setState({display: eval(this.state.input), input:eval(this.state.input)}) 
		                        :operatorCheck ? this.setState({input: this.state.input.slice(0,-1).concat(val)})
		                                :this.setState({ input: this.state.input + val});
			
		
	}

	handleClear(){
		this.setState({
			display: "0",
			input: "",
		})
	}

  render() {
    return (
      <div className="App">
        <div className="calculator">
        	<div className="solar-panel" id="solar-panel">
        	</div>
        	<div className="input-display">{this.state.input}</div>
        	<div className="display" id="display">{this.state.display}
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
        	<div className="calc-button number-button" id="dec" onClick={()=>this.handleNumberInput(".")} >.
        	</div>
        	<div className="calc-button operator-button" id="add" onClick={()=>this.handleOperatorInput("+")}>+
        	</div>
        	<div className="calc-button operator-button" id="subt" onClick={()=>this.handleOperatorInput("-")}>-
        	</div>
        	<div className="calc-button operator-button" id="mult" onClick={()=>this.handleOperatorInput("*")}>*
        	</div>
        	<div className="calc-button operator-button" id="div" onClick={()=>this.handleOperatorInput("/")}>/
        	</div>
        	<div className="calc-button operator-button" id="equ" onClick={()=>this.handleOperatorInput("=")}>=
        	</div>
        	<div className="calc-button clear-button" id="clear" onClick={()=>this.handleClear()}>C
        	</div>
        </div>
      </div>
    );
  }
}

export default App;
