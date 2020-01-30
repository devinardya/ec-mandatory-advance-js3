import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Todo';
import './App.css';

class App extends React.Component {
    render(){
      return (
        <div className="App">
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Router>
        </div>
      );
    }
}


export default App;
