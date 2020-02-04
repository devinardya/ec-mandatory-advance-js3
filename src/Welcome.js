import React from 'react';
import {token$, updateToken} from './store';
import {Helmet} from "react-helmet";
import {Redirect, Link} from 'react-router-dom';
import { css } from "glamor";
import { TiInputChecked, TiTick, TiThList, TiTimes } from "react-icons/ti";
import jwt from 'jsonwebtoken';
import Header from './Header';


class Welcome extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: "",
          token: token$.value,
        };
        this.logout = this.logout.bind(this);
   
      }

      componentDidMount() {
        console.log("does it mount")

        // subscribe to the token when just got log in
        this.subscribe = token$.subscribe(token => {
          this.setState({token});
          if (this.state.token){
            const decoded = jwt.decode(this.state.token);
            this.setState({user: decoded.email})
          }
        });

      }

      // to clean up the component before login out
      componentWillUnmount(){
          this.subscribe.unsubscribe();

          //this.source.cancel('Operation canceled by the user.'); 
      }

      logout() {
        updateToken(null);
      }


    render(){

        let activeToken;
        let ctaButton;
        let grettings;

        let link = css ({
          color: "rgb(252, 156, 11)",
          textDecoration: "none",
          fontSize: "20px",
          ":hover": {
            color: "orangered",
          }
      })

        let icon = css({
          width: "80px",
          height: "80px",
          backgroundColor: "#196ab1",
          borderRadius: "50%",
          padding: "15px",
          marginBottom: "-10px",
      })

        let iconRow = css ({
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignItems: "center",
        })

        let iconRowSpan = css ({
          width: "140px",
          height: "140px",
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          padding: "10px",
          backgroundColor: "#196ab1",
          margin: "0px 10px",
          color: "white",
          borderRadius: "50%",
          marginBottom:"25px",
          textDecoration: "none",
        })

        let linkButton = css ({
          width: "180px",
          backgroundColor: "rgb(252, 156, 11)",
          color: "white",
          padding: "10px",
          textDecoration: "none",
          verticalAlign:"middle",
          marginTop: "40px",
          borderRadius: "40px"
        })

        if (this.state.token) {
            //return <Redirect to="/" />;
            activeToken = this.state.user;
            ctaButton = <div className={linkButton}><Link to="/todo" style= {{textDecoration: "none", color: "white", fontSize: "15px", fontWeight: "bold"}}>To your list!</Link></div>
            grettings = (<>
                          <h2>Hi, {this.state.user}</h2>
                          <div className={iconRow}>
                              <Link to="/todo" className={iconRowSpan}><TiTick size="80px" color="white"/>Done the list</Link>
                              <Link to="/todo" className={iconRowSpan}><TiThList size="80px" color="white"/>Make new list</Link>
                              <Link to="/todo" className={iconRowSpan}><TiTimes size="80px" color="white"/>Remove the list</Link>
                          </div>
                          <p>doTodo is a general-purpose to-do creator website which can be used for simple home lists. You can simply create your own to do list, mark it when it's done and remove it when you no longer need it. It's that easy!</p>
                          {ctaButton}
                        </>)
        } else {
            activeToken = "Register";
            ctaButton = <h3><Link to="/register" className={link}>Sign up now!</Link></h3>
            grettings = (<>
                          <h2>Welcome</h2>
                          <TiInputChecked color="white" className={icon}/>
                          <h1>doToDo</h1>
                          <p>doTodo is a general-purpose to-do creator website which can be used for simple home lists. You can simply create your own to do list, mark it when it's done and remove it when you no longer need it. It's that easy!</p>
                          {ctaButton}
                        </>)
        }
        
        return (<div className="todoBox">
                  <Helmet>
                      <title>Welcome to doToDo</title>
                  </Helmet>
                  <Header testItem = "home" 
                          activeToken = {activeToken}
                          logout = {this.logout} />
                  <div className="welcome-container">
                      {grettings}
                  </div> 
             </div>)
    
  }
}
    

export default Welcome;