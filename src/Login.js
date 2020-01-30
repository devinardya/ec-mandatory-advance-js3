import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {token$, updateToken} from './store';
import jwt from "jsonwebtoken";
import Form from './Form';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          error: false,
          token: token$.value,
        };
    
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
      componentDidMount() {
        this.subscription = token$.subscribe(token => {
          this.setState({token});
        }); 
      }
    
      componentWillUnmount() {
        this.subscription.unsubscribe();
      }
    
      onChangeEmail(value) {
        this.setState({email: value});
      }
    
      onChangePass(value) {
        this.setState({password: value});
      }
    
      onSubmit(e) {
        //e.preventDefault();
        let authData = {
          email: this.state.email,
          password: this.state.password,
        };
    
        axios.post('http://3.120.96.16:3002/auth', authData)
          .then(response => {
            this.setState({error: false});
            const decoded = jwt.decode(response.data.token);
            console.log(decoded);
            updateToken(response.data.token);
          })
          .catch(err => {
            this.setState({error: true});
            console.error(err);
          });
      }
    
      render() {

        if (this.state.token) {
            return <Redirect to="/" />;
        } 

        let errorMsg = null;
        if (this.state.error) {
          errorMsg = 'Invalid login values';
        }


        return (<div className ="login-box">
                    <Helmet>
                          <title>Log In Account</title>
                    </Helmet>
                    {errorMsg}
                    <h1>Log In!</h1>
                    <Form
                         onSubmit = {this.onSubmit} 
                         email = {this.state.email} onChangeEmail = {this.onChangeEmail}
                         password = {this.state.password} onChangePass = {this.onChangePass}
                    />
                    <p>Don't have an accout? <Link to="/register">Register here!</Link></p>
                 </div>
        )
      }
    }

export default Login;