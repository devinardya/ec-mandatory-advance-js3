import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Redirect} from 'react-router-dom';
import { MdAssignmentTurnedIn } from "react-icons/md";
import { css } from "glamor";
import Form from './Form';

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

        return (<div className ="register-box">
                    <Helmet>
                          <title>Register Account</title>
                    </Helmet>
                    <h1>DoToDo App</h1>
                    <MdAssignmentTurnedIn color="white" className={icon}/>
                    <h3 className={textH3}>Please register your email and password!</h3>
                    <Form
                         onSubmit = {this.onSubmit} 
                         email = {this.state.email} onChangeEmail = {this.onChangeEmail}
                         password = {this.state.password} onChangePass = {this.onChangePass}
                    />
                    <p className={pText}>Already have an account? <span><Link to="/login"  className={pTextSpan}>Login here!</Link></span></p>
                </div>
                )
    }
}

export default Register;