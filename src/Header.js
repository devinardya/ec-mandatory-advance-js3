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
            color: "#196ab1",
            fontWeight: "bold",
            textDecoration: "none",
            ":hover": {
              color: "#FF8B00",
            }
          }) 

        let h3TextSpan = css ({
            textDecoration: "none",
            color: "#196ab1",
            ":hover": {
                cursor: "pointer",
            }
        })

        console.log("render from header")

        let buttonOne;
        let buttonTwo;
        let homeButton;

        if(this.props.testItem === "todo"){
            homeButton = <h3>doToDo</h3>
            buttonOne =  <p className="loginUser">{this.props.user}</p>
            buttonTwo =  <button onClick={this.props.logout} className="logoutButton">Log out</button>
        } else if (this.props.testItem === "welcome"){
            homeButton = <h3><Link to="/" className={h3TextSpan}>doToDo</Link></h3>
            buttonOne = <p className="loginUser"><Link to="/register" className={pTextSpan}>Sign up</Link></p>
            buttonTwo = <p className="logoutButton"><Link to="/login" className={pTextSpan}>Log in</Link></p>
        }

        return (<div className="header">
                    <div className="header-left">
                        {homeButton}
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