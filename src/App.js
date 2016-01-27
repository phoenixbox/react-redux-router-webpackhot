import React, { Component } from 'react';
require('./App.css');
require('./Alternate.css');
require('./less/bootstrap/bootstrap.less');

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="beep">Hello There.</h1>
        <button className="btn btn-primary">Im a Button</button>
        <ul>
          <li className="first">One</li>
          <li>Two</li>
          <li>Bannana</li>
        </ul>
        {React.cloneElement(this.props.children, this.state)}
      </div>
    );
  }
}
