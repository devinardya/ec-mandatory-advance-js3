import React from 'react';
import {Link} from 'react-router-dom';
import { css } from "glamor";

class Header extends React.PureComponent{

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
        
    }

    onClick(){
        this.props.logout();
    }

    render(){

        let pTextSpan = css ({
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            ":hover": {
              color: "#FF8B00",
            }
          }) 

        console.log(this.props.testItem)

        let buttonOne;
        let buttonTwo;

        if(this.props.testItem === "todo"){
            buttonOne =  <p className="loginUser">{this.props.user}</p>
            buttonTwo =  <button onClick={this.props.logout} className="logoutButton">Log out</button>
        } else if (this.props.testItem === "welcome"){
            buttonOne = <p className="loginUser"><Link to="/register" className={pTextSpan}>Register</Link></p>
            buttonTwo = <p className="logoutButton"><Link to="/login" className={pTextSpan}>Log in</Link></p>
        }

        return (<div className="header">
        <div className="header-left">
            <h3>doToDo</h3>
        </div>
        <div className="header-right">
            {buttonOne}
            <span>|</span>
            {buttonTwo}
        </div>
    </div>)
    }
}

export default Header;