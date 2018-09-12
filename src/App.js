import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			input: 0,
			output: "",
			decimal: false,
			frontZero: false,
			lastOperator: "",
		}

		this.handleNumberInput = this.handleNumberInput.bind(this);
		this.handleOperatorInput = this.handleOperatorInput.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}

	handleNumberInput(){

	}

	handleOperatorInput(){

	}

	handleClear(){

	}

  render() {
    return (
      <div className="App">
        <div className="calculator">
        	<div className="display" id="display">{this.state.input}
        	</div>
        	<div className="input-container">

        		<div className="number-button" id="one" onClick={()=>this.handleNumberInput()} >1
        		</div>
        		<div className="number-button" id="two" onClick={()=>this.handleNumberInput()} >2
        		</div>
        		<div className="number-button" id="three" onClick={()=>this.handleNumberInput()} >3
        		</div>
        		<div className="number-button" id="four" onClick={()=>this.handleNumberInput()} >4
        		</div>
        		<div className="number-button" id="five" onClick={()=>this.handleNumberInput()} >5
        		</div>
        		<div className="number-button" id="six" onClick={()=>this.handleNumberInput()} >6
        		</div>
        		<div className="number-button" id="seven" onClick={()=>this.handleNumberInput()} >7
        		</div>
        		<div className="number-button" id="eight" onClick={()=>this.handleNumberInput()} >8
        		</div>
        		<div className="number-button" id="nine" onClick={()=>this.handleNumberInput()} >9
        		</div>
        		<div className="number-button" id="zero" onClick={()=>this.handleNumberInput()} >0
        		</div>
        		<div className="number-button" id="decimal" onClick={()=>this.handleNumberInput()} >.
        		</div>
        		<div className="operator-button" id="add" onClick={()=>this.handleOperatorInput()}>+
        		</div>
        		<div className="operator-button" id="subtract" onClick={()=>this.handleOperatorInput()}>-
        		</div>
        		<div className="operator-button" id="multiply" onClick={()=>this.handleOperatorInput()}>*
        		</div>
        		<div className="operator-button" id="divide" onClick={()=>this.handleOperatorInput()}>/
        		</div>
        		<div className="operator-button" id="equals" onClick={()=>this.handleOperatorInput()}>=
        		</div>
        		<div className="clear-button" id="clear" onClick={()=>this.handleClear()}>C
        		</div>

        	</div>
        </div>
      </div>
    );
  }
}

export default App;
