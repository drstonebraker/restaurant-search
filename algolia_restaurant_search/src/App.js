import React, { Component } from 'react';
import './App.css';

import Header from './components/Header'

class App extends Component {

  componentDidMount() {
    document.addEventListener
  }

  render() {
    return (
      <div className="view">
        <Header 
          ref={header => {this.header = header}}
        />
      </div>
    )
  }
}

export default App

