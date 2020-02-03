import React from 'react';
import { css } from "glamor";


class Form extends React.Component {

    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemovePlaceholderTextUser = this.onRemovePlaceholderTextUser.bind(this);
        this.onShowPlacehoderTextUser = this.onShowPlacehoderTextUser.bind(this);
        this.onRemovePlaceholderTextPass = this.onRemovePlaceholderTextPass.bind(this);
        this.onShowPlacehoderTextPass = this.onShowPlacehoderTextPass.bind(this);
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

    onRemovePlaceholderTextUser(){
        this.props.onRemovePlaceholderTextUser();
    }

      onShowPlacehoderTextUser(){
        this.props.onShowPlacehoderTextUser();
    }

    onRemovePlaceholderTextPass(){
      this.props.onRemovePlaceholderTextPass();
  }

    onShowPlacehoderTextPass(){
      this.props.onShowPlacehoderTextPass();
  }

    render(){
        let rule = css({
            color: 'white',
            fontWeight: "bold",
            fontSize: "13px",
            width: "81%",
            height: "40px", 
            margin: "20px 0",
            border: "none",
            backgroundColor: "#196ab1",
            ':hover': {
              backgroundColor: "#1c9bfa",
              cursor: "pointer",
              color: "white"
            },
          })

        let input;
      


        //console.log(this.props.textPlaceholderUser )

        //console.log(this.props.error)
            if(this.props.error400){
              input = css({
                width: "80%",
                height: "40px",
                paddingLeft: "10px",
                margin: "10px 0",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "4px solid #FFB200",
                backgroundColor: "#F1F1F1",
                fontSize: "14px",
                border: "2px solid red",
                "::placeholder": {
                  color: "red",
                }
              })
          } else if (this.props.error401){
            input = css({
                width: "80%",
                height: "40px",
                paddingLeft: "10px",
                margin: "10px 0",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "4px solid #FFB200",
                backgroundColor: "#F1F1F1",
                fontSize: "14px",
                border: "2px solid red",
                "::placeholder": {
                  color: "red",
                }
              })
          } else {
            input = css({
                width: "80%",
                height: "40px",
                paddingLeft: "10px",
                margin: "10px 0",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "4px solid #FFB200",
                backgroundColor: "#F1F1F1",
                fontSize: "14px",
                "::placeholder": {
                    color: "rgb(94, 94, 94)"
                  }
            })
          }
          

        return ( <>
                    <form onSubmit = {this.onSubmit}>
                        <input type="email" 
                            onChange={this.onChangeEmail} 
                            className={input} 
                            placeholder= {this.props.placeholderUser} 
                            email = {this.props.value} 
                            onFocus={this.props.onFocusText} 
                            onBlur={this.props.onBlurText}
                            value ={this.props.valueUser}/>
                        <input type="password" 
                            onChange={this.onChangePass} 
                            className={input} 
                            placeholder= {this.props.placeholderPass} 
                            password = {this.props.value} 
                            onFocus={this.props.onFocusPass} 
                            onBlur={this.props.onBlurPass}
                            value = {this.props.valuePass}/>
                        <button type="submit" className={rule}>{this.props.textContent}</button>
                    </form>
                 </>
        )
    }
}

export default Form;