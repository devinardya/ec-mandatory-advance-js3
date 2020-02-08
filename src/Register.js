import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Redirect} from 'react-router-dom';
import { TiUserAdd } from "react-icons/ti"
import { css } from "glamor";
import Form from './Form';
import Header from './Header';
import Footer from './Footer';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: "",
                      password: "",
                      error400: false,
                      textPlaceholderUser: true,
                      textPlaceholderPass: true,
                      valueUser: "",
                      valuePass:"",
                      errorMsg: "",
                      status: false,
                    };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onRemovePlaceholderTextUser = this.onRemovePlaceholderTextUser.bind(this);
        this.onShowPlacehoderTextUser = this.onShowPlacehoderTextUser.bind(this);
        this.onRemovePlaceholderTextPass = this.onRemovePlaceholderTextPass.bind(this);
        this.onShowPlacehoderTextPass = this.onShowPlacehoderTextPass.bind(this);
    }

    onChangeEmail(value) {
      this.setState({email: value, valueUser: value});
    }
  
    onChangePass(value) {
      this.setState({password: value, valuePass: value});
    }

    onSubmit(){
        //e.preventDefault();
        let newInput = {email : this.state.email, 
                        password: this.state.password};

        axios.post("http://3.120.96.16:3002/register", newInput)
        .then(response => {
            console.log(response);
            this.setState({status: true})
          })
          .catch(err => {
            console.log(err.response.data);
            if (err.response.data.message === "Validation error"){
              this.setState({error400: true,
                             errorMsg: err.response.data.details[0].message })
            } else if (err.response.data.message === "User with that email address exists") {
              this.setState({error400: true,
                             errorMsg: err.response.data.message })
            }

          });

    }

    onRemovePlaceholderTextUser(){
      this.setState({textPlaceholderUser: false, error400:false, error401: false})
  }

    onShowPlacehoderTextUser(){
      this.setState({textPlaceholderUser: true, error400:false, error401: false})
  }

    onRemovePlaceholderTextPass(){
      this.setState({textPlaceholderPass: false})
  }

    onShowPlacehoderTextPass(){
      this.setState({textPlaceholderPass: true})
  }

    render(){
        if (this.state.status) {
            return <Redirect to="/login" />;
          }

          let icon = css({
            width: "60px",
            height: "60px",
            backgroundColor: "#196ab1",
            borderRadius: "0 50% 50% 50%",
            padding: "20px",
            marginBottom: "0px",
        })

          let textH3 = css ({
            color: "#196ab1",
            fontSize: "35px",
            marginBottom: "30px",
            width: "320px",
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: "bold",
            lineHeight: "20px",
            marginTop: "25px",
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
            margin: "0",
            fontSize: "12px",
            height: "12px",
            fontWeight: "bold",
          })

          let inputErrorUser;
          let inputErrorPass;
          let errorMsg = <p className = {errMsg}> </p>;
          if (this.state.error400){
            errorMsg = <p className = {errMsg}>{this.state.errorMsg}</p>
          }

          //console.log(this.state.valueUser)

          if(!this.state.textPlaceholderUser){
              inputErrorUser = null;
              inputErrorPass = "password";
              //console.log('roar')
            } else if (!this.state.textPlaceholderPass){
              inputErrorUser = "name@email.com";
              inputErrorPass = null;
              //console.log('hejhej')
            }else {
              if(this.state.error400){
                inputErrorUser = "name@email.com";
                inputErrorPass = "password";
              } else if (this.state.error401){
                  //console.log('401')
                  inputErrorUser = this.state.valueUser;
                  inputErrorPass = this.state.valuePass;
              }else {
                inputErrorUser = "name@email.com";
                inputErrorPass = "password";
              }
            
            }
  

        return (<div className ="register-box">
                    <Helmet>
                          <title>doTodo - Sign Up</title>
                    </Helmet>
                    <Header testItem = "welcome"/>
                    <div className="login-container">
                        <div className="box-right">
                            <TiUserAdd color="white" className={icon}/> 
                            <h3 className={textH3}>Sign Up</h3>
                            {errorMsg}
                            <Form
                                onSubmit = {this.onSubmit} 
                                error400 = {this.state.error400}
                                error401 = {this.state.error401}
                                email = {this.state.email} 
                                onChangeEmail = {this.onChangeEmail} 
                                valueUser = {this.state.valueUser} 
                                placeholderUser = {inputErrorUser} 
                                onFocusText={this.onRemovePlaceholderTextUser} 
                                onBlurText={this.onShowPlacehoderTextUser}
                                password = {this.state.password} 
                                onChangePass = {this.onChangePass} 
                                valuePass =  {this.state.valuePass} 
                                placeholderPass = {inputErrorPass} 
                                onFocusPass={this.onRemovePlaceholderTextPass} 
                                onBlurPass={this.onShowPlacehoderTextPass}
                                textContent = "Create Account"
                            />
                            <p className={pText}>Already have an account? <span><Link to="/login" className={pTextSpan}>Login here!</Link></span></p>
                       </div>   
                    </div>
                    <Footer/>
              </div>
            )
    }
}

export default Register;