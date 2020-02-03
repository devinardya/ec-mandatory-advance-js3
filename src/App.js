import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Todo';
import Welcome from './Welcome';
import './App.css';

class App extends React.Component {
    render(){
      return (
        <div className="App">
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/welcome" component={Welcome} />
            </Router>
        </div>
      );
    }
}


export default App;
