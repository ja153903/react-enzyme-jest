import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Test = () => <div>Testing</div>
const Title = ({ text }) => <div>{text}</div>

export class App extends Component {
  state = {
    on: false,
    input: '',
    mainColor: 'blue',
    lifeCycle: '',
    hide: false
  }

  componentDidMount() {
    this.setState({
      lifeCycle: 'componentDidMount'
    })
  }

  componentWillReceiveProps() {
    this.setState({
      lifeCycle: 'componentWillReceiveProps'
    })
  }

  handleStrings(str) {
    return str === "Hello World" ? true : false;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h3 className={this.state.mainColor}>Everyone is welcome!</h3>
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
        <h2>{ this.state.input }</h2>
        <input type="text" 
        onChange={(e) => this.setState({ input: e.target.value })}/>
        <p className="lifeCycle">{this.state.lifeCycle}</p>
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
