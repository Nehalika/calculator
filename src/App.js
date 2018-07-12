import React, { Component } from 'react';
import  './App.css';


const Button = props => {
  return (
    <div>
      <button
        className = "button"
        onClick = { () => props.addChar(props.char) } >
        { props.char }
      </button>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      equals: false 

    }
    this.addChar = this.addChar.bind(this);
    this.deleteChar = this.deleteChar.bind(this);
    this.clearResult = this.clearResult.bind(this);
    this.findSum = this.findSum.bind(this);
  }
  //static displayName = "Hi";
  addChar(char) { //for adding number or operator to the lastResult
    const numbers = ['7','8','9','4','5','6','1','2','3','0','.'];
    const operators = ['/','*','+','-','.'];
    let lastResult = this.state.result;
    let lastChar = lastResult.slice(-1);
    let checkChar = operators.some( (operator) => {
      let checkResult = ( operator === char && lastResult.length === 0) || 
      (operator === char && lastChar === char );
      return checkResult;
    });
    
    if ( checkChar ) {
      this.setState({ result:lastResult}); 
    } 
    else {
      this.setState({ result: lastResult + char }); //add new char to the previous result
    }
    if(lastResult.length>15){  //if the number is too large 
      alert('number is too large to display');
      this.setState({result: 'No. is too large'});
    }
    //console.log(this.state.result);
    const {equals} = this.state;
    //console.log(equals);
    if(equals) {    
      //console.log('equals inside if', equals);
      //console.log('last char', lastChar);
      //console.log('you press ', char);
      //console.log('result ', this.state.result);
      if(operators.indexOf(char) > 0) {  //if operator is enterd 
        //console.log('indexof',operators.indexOf(char)>0);
        //console.log('you press some operators');
        this.setState({ result: lastResult + char }); // add the operator to the previous value
        //console.log('~~~~~~ last result ~~~~~~~~~~~~~',lastResult+char);
      }
      else{
        this.setState({result: char}); //if new number is entered erase the previous value
        this.setState({equals: false});
      }
    }
  }

  deleteChar() {
    let lastResult = this.state.result;
    if (lastResult.length === 0) {
      this.setState({ result: ''});
    }
    else {
      let newResult = lastResult.slice(0, lastResult.length-1);//delete last result one at a time
      this.setState ({ result: newResult });
    }
  }

  clearResult() {
    this.setState({ result: '' })//clear the text
  }

  findSum() {
    const {equals} = this.state;
    if(equals===false){
      let sum = eval(this.state.result).toString();//perform eval funtion each time= is prssed
      this.setState({ result: sum });
      //console.log(equals);
      this.setState({equals: true});
    }
  }

  render() {
    const numbers = ['7','8','9','4','5','6','1','2','3','0','.'];
    const operators = ['/','*','-','+'];
    const listOfNumbers = numbers.map( number => {
      return <Button
        key = { number }
        char = { number }
        addChar = { this.addChar } />
    });
    const listOfOperators = operators.map( operator => {
      return <Button
        key = { operator }
        char = { operator }
        addChar = { this.addChar } />
    });

    return (
      <div className="calculator">
      <div className="header">Calculator</div>
        <div id="result">{ this.state.result }</div>
        <div className="clear-delete-btns">
          <button className = "button"
            onClick={() => this.clearResult()} >
            C</button>
          <button id="delete-button"
            onClick={() => this.deleteChar()} >
            DEL</button>
        </div>
        <div id="list-of-numbers">
          { listOfNumbers }
          <button className = "button"
            onClick = { () => this.findSum() }>=</button>
        </div>
        <div id="list-of-operators">{ listOfOperators }</div> 
      </div>
    );
  }
}
export default App;