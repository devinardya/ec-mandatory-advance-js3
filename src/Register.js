import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Redirect} from 'react-router-dom';
import { css } from "glamor";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: "",
                      password: "",
                      status: false,
                    };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onChangeEmail(e){
        this.setState({email: e.target.value})
    }

    onChangePass(e){
        this.setState({password: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        let newInput = {email : this.state.email, 
                        password: this.state.password};

        axios.post("http://3.120.96.16:3002/register", newInput)
        .then(response => {
            console.log(response);
            this.setState({status: true})
          })
          .catch(err => {
            console.error(err);
          });

    }

    render(){
        if (this.state.status) {
            return <Redirect to="/" />;
          }

        let rule = css({
            color: 'red',
            width: "100px",
            height: "30px", 
            marginTop: "20px",
            border: "none",
            ':hover': {
              color: 'pink'
            },
          })

        let input = css({
            width: "300px",
            height: "30px",
            paddingLeft: "10px",
            margin: "10px 0",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "1px dotted cadetblue",
            backgroundColor: "#F2F2F2"
        })

        return (<div className ="register-box">
                    <Helmet>
                          <title>Register Account</title>
                    </Helmet>
                    <h1>Register account!</h1>
                    <form onSubmit = {this.onSubmit}>
                        <input type="text" onChange={this.onChangeEmail} className={input} placeholder="email address"/>
                        <input type="password" onChange={this.onChangePass} className={input} placeholder="password"/>
                        <button type="submit" className={rule}>Register</button>
                    </form>
                    <p>Have an accout? <Link to="/login">Login here!</Link></p>
                </div>
                )
    }
}

export default Register;