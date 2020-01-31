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
    
      onSubmit() {
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
          errorMsg = <p className="err">Invalid login values</p>;
        }

        let icon = css({
          width: "80px",
          height: "80px",
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "20px",
          marginBottom: "30px",
      })

        let textH3 = css ({
          color: "rgba(21,71,60,1)",
          fontSize: "23px",
          marginBottom: "20px",
          width: "320px",
          fontFamily: 'Montserrat',
          lineHeight: "20px",
        })

        let pText = css ({
          fontSize: "13px",
          color: "#737373",
        })

        let pTextSpan = css ({
          color: "orangered",
          fontWeight: "bold",
          ":hover": {
            color: "#FF8B00",
          }
        })


        return (<div className ="login-box">
                    <Helmet>
                          <title>Log In Account</title>
                    </Helmet>
                        <div className="box-left">
                            <h1>Welcome</h1>
                            <MdAssignmentTurnedIn color="#0a968b" className={icon}/>
                            <h1>doToDo</h1>
                        </div>
                        <div className="box-right">
                            <h3 className={textH3}>Log in Account</h3>
                            {errorMsg}
                            <Form
                                onSubmit = {this.onSubmit} 
                                email = {this.state.email} onChangeEmail = {this.onChangeEmail}
                                password = {this.state.password} onChangePass = {this.onChangePass}
                                textContent = "Login"
                            />
                            <p className={pText}>Don't have an account? <span><Link to="/register" className={pTextSpan}>Register here!</Link></span></p>
                        </div>
                </div>
        )
      }
    }

export default Login;