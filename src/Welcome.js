import React from 'react';
import {token$} from './store';
import {Helmet} from "react-helmet";
import {Redirect, Link} from 'react-router-dom';
import { css } from "glamor";
import { TiInputChecked } from "react-icons/ti";
import jwt from 'jsonwebtoken';
import Header from './Header';


class Welcome extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: "",
          token: token$.value,
          input: "",
          data: [],
          inputError: false,
          idStat: false,
          textPlaceholder: true,
          errorMsg: "",
        };

   
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

      shouldComponentUpdate(nextState, prevState){
          if(this.state.data.buttonState !== undefined){
            return this.state.data.buttonState !== prevState.data.buttonState
          } else {
            return true
          }
      } 

  

    render(){

        if (this.state.token) {
            return <Redirect to="/" />;
        } 
        
   
        let icon = css({
            width: "80px",
            height: "80px",
            backgroundColor: "#196ab1",
            borderRadius: "50%",
            padding: "15px",
            marginBottom: "-10px",
        })

        let link = css ({
            color: "#196ab1"
        })

          

        return (<div className="todoBox">
                  <Helmet>
                      <title>Welcome to doToDo</title>
                  </Helmet>
                  <Header testItem = "welcome"/>
                  <div className="welcome-container">
                         <h2>Welcome</h2>
                        <TiInputChecked color="white" className={icon}/>
                         <h1>doToDo</h1>
                         <p>doTodo is a general-purpose to-do creator website which can be used for simple home lists. You can simply create your own to do list, mark it when it's done and remove it when you no longer need it. It's that easy!</p>
                         <h3><Link to="/register" className={link}>Sign up now!</Link></h3>
                  </div> 
             </div>)
    
  }
}
    

export default Welcome;