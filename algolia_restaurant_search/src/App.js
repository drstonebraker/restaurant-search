import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <div className="App">
        <header className="header">
          <input 
            type="text" 
            className="header__input" />
        </header>
      </div>
    );
  }
}

export default App;
