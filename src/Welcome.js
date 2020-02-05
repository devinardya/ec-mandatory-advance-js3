import React from 'react';
import axios from 'axios';
import {token$, updateToken} from './store';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import { css } from "glamor";
import { TiTick, TiThList, TiTimes } from "react-icons/ti";
import jwt from 'jsonwebtoken';
import Header from './Header';
import headerimage from './header-image.jpg'

let url = 'http://3.120.96.16:3002/todos';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: "",
          token: token$.value,
          data: [],
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

          if (this.state.token){
            this.onGetData();
        }
      }
      
      onGetData(){

        let CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
      
        axios.get(url, {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            },
          },{
            cancelToken: this.source.token,
          })
          .then(response => {   
            console.log(response.data.todos);
            this.setState({data: response.data.todos});     
          })
          .catch(e => {
            console.error(e);
            updateToken(null);
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
        let dataLength;
        let textInfo;
        let pageTitle;

        let link = css ({
          color: "rgb(252, 156, 11)",
          textDecoration: "none",
          fontSize: "20px",
          ":hover": {
            color: "orangered",
          }
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
          background: "#fba108",
          margin: "0px 15px 25px 15px",
          color: "white",
          borderRadius: "50%",
          textDecoration: "none",
          fontWeight: "bold",
        })

        let linkButton = css ({
          width: "180px",
          backgroundColor: "rgb(252, 156, 11)",
          color: "white",
          padding: "10px",
          textDecoration: "none",
          verticalAlign:"middle",
          marginTop: "30px",
          borderRadius: "40px",
          ":hover": {
            backgroundColor: "#ff7100",
          }
        })

        let image = css({
          width: "100%",
          height: "calc(45% - 50px)",
          objectFit: "cover",
          marginBottom: "50px",
        })

        let pText = css ({
          fontSize: "18px",
          fontWeight: "bold",
        })

        if(this.state.data !== undefined && this.state.data.length >= 1){
          dataLength = this.state.data.length;
          textInfo = "Do not forget to check your list to make sure you did not miss anything!";
        } else if (this.state.data.length === 0){
          dataLength = "0";
          textInfo = "Time to organize your day and create a list!"
        }

        if (this.state.token) {
            //return <Redirect to="/" />;
            activeToken = this.state.user;
            pageTitle = <title>Welcome, {this.state.user}</title>
            ctaButton = <Link to="/todo" style= {{textDecoration: "none", color: "white", fontSize: "15px", fontWeight: "bold"}}><div className={linkButton}>Jump to list!</div></Link>
            grettings = ( <>
                            <img className={image} src={headerimage} alt="headerimage" />
                            <div className="welcome-content">
                                <div className="welcome-sidebar">
                                      <div className="counter">
                                         <h3>{dataLength}</h3>
                                      </div>
                                </div>
                                <div className="welcome-textbox">
                                    <h3>Hi, {this.state.user}</h3>
                                    <p className={pText}>Currently you have {dataLength} items on your to-do list.</p>
                                    <p>{textInfo}</p>
                                    {ctaButton}
                                </div>
                          </div>
                        </>)
        } else {
            activeToken = "Register";
            pageTitle = <title>doTodo</title>
            ctaButton = <h3><Link to="/register" className={link}>Sign up now!</Link></h3>
            grettings = (<>
                          <img className={image} src={headerimage} alt="headerimage" />
                          <div className={iconRow}>
                              <div className={iconRowSpan}><TiThList size="80px" color="white"/>Make new list</div>
                              <div to="/todo" className={iconRowSpan}><TiTick size="80px" color="white"/>Done the list</div>
                              <div to="/todo" className={iconRowSpan}><TiTimes size="80px" color="white"/>Remove the list</div>
                          </div>
                          <p>doTodo is a general-purpose to-do creator website which can be used for simple home lists. You can simply create your own to do list, mark it when it's done and remove it when you no longer need it. It's that easy!</p>
                          {ctaButton}
                        </>)
        }
        
        return (<div className="todoBox">
                  <Helmet>
                      {pageTitle}
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