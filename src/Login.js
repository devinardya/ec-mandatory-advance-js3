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
          error401: false,
          error400: false,
          token: token$.value,
          textPlaceholderUser: true,
          textPlaceholderPass: true,
          valueUser: "",
          valuePass:"",
          errorMsg: "",
        };
    
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemovePlaceholderTextUser = this.onRemovePlaceholderTextUser.bind(this);
        this.onShowPlacehoderTextUser = this.onShowPlacehoderTextUser.bind(this);
        this.onRemovePlaceholderTextPass = this.onRemovePlaceholderTextPass.bind(this);
        this.onShowPlacehoderTextPass = this.onShowPlacehoderTextPass.bind(this);
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
        this.setState({email: value, valueUser: value});
      }
    
      onChangePass(value) {
        this.setState({password: value, valuePass: value});
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
            //this.setState({error: true});
            console.log(err.response.data);
            if (err.response.data.message === "Validation error"){
              this.setState({error400: true, 
                             error401: false, 
                             errorMsg: err.response.data.details[0].message})
             
            } else if (err.response.data.message === "Email or password incorrect"){
              console.log("error 401")
              this.setState({error401: true, 
                             error400: false,
                             errorMsg: err.response.data.message})
              
            }
          });
      }

      onRemovePlaceholderTextUser(){
        this.setState({textPlaceholderUser: false})
    }

      onShowPlacehoderTextUser(){
        this.setState({textPlaceholderUser: true})
    }

      onRemovePlaceholderTextPass(){
        this.setState({textPlaceholderPass: false})
    }

      onShowPlacehoderTextPass(){
        this.setState({textPlaceholderPass: true})
    }
    
      render() {

        if (this.state.token) {
            return <Redirect to="/" />;
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

        let errMsg = css ({
          color: "red",
          margin: 0,
          fontSize: "12px",
          height: "12px",
          fontWeight: "bold",
        })

        let inputErrorUser;
        let inputErrorPass;
        let errorMsg = <p className = {errMsg}> </p>;
        if (this.state.error400) {
          errorMsg = <p className = {errMsg}>{this.state.errorMsg}</p>;
        } else if (this.state.error401){
          errorMsg = <p className = {errMsg}>{this.state.errorMsg}</p>
        }


        //console.log(this.state.valueUser)

        if(!this.state.textPlaceholderUser){
            inputErrorUser = null;
            inputErrorPass = "password";
            console.log('roar')
          } else if (!this.state.textPlaceholderPass){
            inputErrorUser = "name@email.com";
            inputErrorPass = null;
            //console.log('hejhej')
          }else {
            if(this.state.error400){
                inputErrorUser = null;
                inputErrorPass = null;
            } else if (this.state.error401){
                //console.log('401')
                inputErrorUser = this.state.valueUser;
                inputErrorPass = this.state.valuePass;
            }else {
              inputErrorUser = "name@email.com";
              inputErrorPass = "password";
            }
          
          }


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
                                error400 = {this.state.error400}
                                error401 = {this.state.error401}
                                email = {this.state.email} onChangeEmail = {this.onChangeEmail} valueUser = {this.state.valueUser} placeholderUser = {inputErrorUser} onFocusText={this.onRemovePlaceholderTextUser} onBlurText={this.onShowPlacehoderTextUser}
                                password = {this.state.password} onChangePass = {this.onChangePass} valuePass =  {this.state.valuePass} placeholderPass = {inputErrorPass} onFocusPass={this.onRemovePlaceholderTextPass} onBlurPass={this.onShowPlacehoderTextPass}
                                textContent = "Login"
                            />
                            <p className={pText}>Don't have an account? <span><Link to="/register" className={pTextSpan}>Register here!</Link></span></p>
                        </div>
                </div>
        )
      }
    }

export default Login;