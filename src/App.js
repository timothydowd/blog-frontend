import React, { Component } from 'react'
import Books from './components/Books'
import BookPage from './components/BookPage'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import './App.css';



export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <h1>app</h1>
          <Route exact path='/' component={Books} />
          <Route exact path='/book/:id' component={BookPage} />
        </div>
        </Router>
    );
  }
}

export default App

