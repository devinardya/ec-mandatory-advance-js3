import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {token$, updateToken} from './store';
import { MdAssignmentTurnedIn } from "react-icons/md";
import jwt from "jsonwebtoken";
import { css } from "glamor";
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

        let icon = css({
          width: "80px",
          height: "80px",
          backgroundColor: "#1FA70C",
          borderRadius: "50%",
          padding: "20px",
          marginBottom: "30px",
      })

        let textH3 = css ({
          color: "#1FA70C",
          fontSize: "15px",
          marginBottom: "0px",
        })

        let pText = css ({
          fontSize: "13px",
          color: "#737373",
        })

        let pTextSpan = css ({
          color: "green",
          fontWeight: "bold",
          ":hover": {
            color: "#0c6845",
          }
        })


        return (<div className ="login-box">
                    <Helmet>
                          <title>Log In Account</title>
                    </Helmet>
                    {errorMsg}
                    <h1>DoToDo App</h1>
                    <MdAssignmentTurnedIn color="white" className={icon}/>
                    <h3 className={textH3}>Please log in using your email and password!</h3>
                    <Form
                         onSubmit = {this.onSubmit} 
                         email = {this.state.email} onChangeEmail = {this.onChangeEmail}
                         password = {this.state.password} onChangePass = {this.onChangePass}
                    />
                    <p className={pText}>Don't have an account? <span><Link to="/register" className={pTextSpan}>Register here!</Link></span></p>
                 </div>
        )
      }
    }

export default Login;