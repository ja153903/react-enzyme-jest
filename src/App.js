import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Test = () => <div>Testing</div>
const Title = ({ text }) => <div>{text}</div>

export class App extends Component {
  state = {
    on: false
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Title text="jaime" />
        <ul></ul>
        <ul></ul>
        <ul></ul>
        <p className="button-state">{this.state.on ? "Yes!" : "No!"}</p>
        <button onClick={() => this.setState({ on: true})}>Click</button>
      </div>
    );
  }
}

//export default App;

export class Link extends Component {
  render() {
    return (this.props.hide ? null :
      <a href={this.props.address}>Click</a>)
    
  }
}
