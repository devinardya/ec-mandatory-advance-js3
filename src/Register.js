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
                      error: false,
                    };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onChangeEmail(value){
        this.setState({email: value})
    }

    onChangePass(value){
        this.setState({password: value})
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
            console.error(err);
            this.setState({error: true})
          });

    }

    render(){
        if (this.state.status) {
            return <Redirect to="/login" />;
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
            fontWeight: "bold",
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

        return (<div className ="register-box">
                    <Helmet>
                          <title>Create Account</title>
                    </Helmet>
                    <div className="box-left">
                           <h1>Welcome</h1>
                            <MdAssignmentTurnedIn color="#0a968b" className={icon}/>
                            <h1>doToDo</h1>
                        </div>
                        <div className="box-right">
                            <h3 className={textH3}>Create Account</h3>
                            {errorMsg}
                            <Form
                                onSubmit = {this.onSubmit} 
                                email = {this.state.email} onChangeEmail = {this.onChangeEmail}
                                password = {this.state.password} onChangePass = {this.onChangePass}
                                textContent = "Create Account"
                            />
                            <p className={pText}>Already have an account? <span><Link to="/login" className={pTextSpan}>Login here!</Link></span></p>
                        </div>
                </div>
                )
    }
}

export default Register;