import React from 'react';
import axios from 'axios';
import {token$, updateToken} from './store';
import {Helmet} from "react-helmet";
import {Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';


class Todo extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          profile: {},
          token: token$.value,
        };

        this.logout = this.logout.bind(this);
      }

      componentDidMount() {
        this.subscribe = token$.subscribe(token => {
          this.setState({token});
          const decoded = jwt.decode(this.state.token);
          console.log(decoded);
        });

        if (this.state.token){
            axios.get('http://3.120.96.16:3002/todos', {
                headers: {
                  Authorization: `Bearer ${this.state.token}`
                }
              })
              .then(response => {
                //this.setState({profile: response.data.profile});
                console.log(response)
                
              })
              .catch(e => {
                console.error(e);
                updateToken(null);
              });
        }
    
        
      }

      logout() {
        updateToken(null);
      }

      componentWillUnmount(){
          this.subscribe.unsubscribe();
      }

    render(){
        if (!this.state.token) {
            return <Redirect to="/login" />;
          }
      
        return <>
                <Helmet>
                    <title>To Do List</title>
                </Helmet>
                <h1>Todo</h1>
                <button onClick={this.logout}>Logga ut</button>
             </>
    }
}

export default Todo;