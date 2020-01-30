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
        //this.props.onSubmit(true)
    }

    render(){
        let rule = css({
            color: 'white',
            fontWeight: "bold",
            fontSize: "13px",
            width: "311px",
            height: "40px", 
            marginTop: "20px",
            border: "none",
            backgroundColor: "#1FA70C",
            ':hover': {
              backgroundColor: "#0c6845",
              cursor: "pointer",
            },
          })

        let input = css({
            width: "300px",
            height: "40px",
            paddingLeft: "10px",
            margin: "10px 0",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "2px dotted cadetblue",
            backgroundColor: "#F2F2F2"
        })


        return ( <>
                    <form onSubmit = {this.onSubmit}>
                        <input type="text" onChange={this.onChangeEmail} className={input} placeholder="email address" email = {this.props.value}/>
                        <input type="password" onChange={this.onChangePass} className={input} placeholder="password" password = {this.props.value}/>
                        <button type="submit" className={rule}>Login</button>
                    </form>
                 </>
        )
    }
}

export default Form;