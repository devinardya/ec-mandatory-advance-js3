import React from 'react';
import { css } from "glamor";


class Form extends React.Component {

    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(e) {
        this.props.onChangeEmail(e.target.value);
    }
    
    onChangePass(e) {
        this.props.onChangePass(e.target.value);
    } 

    onSubmit(e){
        e.preventDefault();
        this.props.onSubmit();
    }

    render(){

        let submitButton;
        let input;
        let inputDefault = css({
            width: "50%",
            height: "40px",
            paddingLeft: "10px",
            margin: "10px 0",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "4px solid #FFB200",
            backgroundColor: "#F1F1F1",
            fontSize: "14px",
            color: "#737373",
        })

        if(this.props.error400){
          input = css({
            border: "2px solid red",
            "::placeholder": {
              color: "red",
              
            },
            ":focus::placeholder":{
              color: "transparent",
            }
          })
      } else if (this.props.error401){
        input = css({
            border: "2px solid red",
            "::placeholder": {
              color: "red",
             
            },
            ":focus::placeholder":{
              color: "transparent",
            }
          })
      } else {
        input = css({
            "::placeholder": {
                color: "rgb(94, 94, 94)"
              },
            ":focus::placeholder":{
              color: "transparent",
            }
        })
      }

      let submitDefault = css ({
          color: 'white',
          fontWeight: "bold",
          fontSize: "13px",
          width: "51%",
          height: "40px", 
          margin: "20px 0",
          border: "none",
      })

        if(this.props.textContent === "Login"){
            submitButton =  css({
              backgroundColor: "#FFAA00",
              ':hover': {
                backgroundColor: "#FFC500",
                cursor: "pointer",
                color: "white"
              },
            })
        } else {
            submitButton = css({
              backgroundColor: "#196ab1",
              ':hover': {
                backgroundColor: "#1c9bfa",
                cursor: "pointer",
                color: "white"
              },
            })
        }
          

        return ( <>
                    <form onSubmit = {this.onSubmit}>
                        <input type="email" 
                            onChange={this.onChangeEmail} 
                            className={`${input} ${inputDefault}`} 
                            placeholder= "name@email.com" 
                            email = {this.props.value} 
                            value ={this.props.valueUser}/>
                        <input type="password" 
                            name = {this.props.namePass}
                            onChange={this.onChangePass}
                            className={`${input} ${inputDefault}`} 
                            placeholder= "password" 
                            password = {this.props.value} 
                            value = {this.props.valuePass}/>
                        <button type="submit" className={`${submitButton} ${submitDefault}`}>{this.props.textContent}</button>
                    </form>
                 </>
        )
    }
}

export default Form;