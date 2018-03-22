const React = require('react');

class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      ourNumber: 5,
    };
  }
  render() {
    const { ourNumber } = this.state;
    const { close, number } = this.props;

    return (
      <div>
        This is a test!
        <div>Number: {ourNumber}</div>
        <div>Provided number: {number}</div>
        <div><button onClick={close} >Click me!</button></div>

      </div>
    );
  }
}

module.exports = Test;
