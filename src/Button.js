import React, { Component } from 'react';

class Button extends Component {
 constructor(props) {
    super(props);
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
}
}
export default Button;