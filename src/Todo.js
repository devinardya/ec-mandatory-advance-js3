import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {token$, updateToken} from './store';
import {Helmet} from "react-helmet";
import {Redirect, Link} from 'react-router-dom';
import { TiTickOutline, TiTick, TiDelete, TiHome, TiPower, TiWarning } from "react-icons/ti"
import { css } from "glamor";
import jwt from 'jsonwebtoken';
import Header from './Header';
import Footer from './Footer';
import FormTodo from './FormTodo';

let url = 'http://3.120.96.16:3002/todos';

class Todo extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: "",
          token: token$.value,
          input: "",
          data: [],
          inputError: false,
          idStat: false,
          errorMsg: "",
          endSessionAlert: false,
          endSessionMsg: "",
        };

        this.source = undefined;
        this.logout = this.logout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onGetData = this.onGetData.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.radioBtnChange = this.radioBtnChange.bind(this);
        this.endSessionOption = this.endSessionOption.bind(this);
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

        // if the token is valid, then grab the data from the server
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
          .then ( () => {
            // adding a new key to the data, to be able to control the check button next to the list
            console.log(this.state.data)
            let datas = this.state.data;
            datas.map(data => {
              return data.buttonState = false;
            })
            // save the data with the new key
            this.setState({data: datas})
          })
          .catch(e => {
            
            console.error(e);
            updateToken(null);
            this.setState({endSessionMsg: "home"})
          });
      }

      // a function that called when log out, sending null parameter to the store.js that remove the token, hence making it not valid any longer
      logout() {
        updateToken(null);
        this.setState({endSessionMsg: "home"})
      }

      onChange(value){
          let input = value;
          this.setState({input});
      }

      onSubmit(){
        //e.preventDefault();
        console.log(this.state.input);
        let input = this.state.input;
        let userInput = { content: input };
        
        //sending new data to the server with a token to make sure it saved to the right user
            axios.post(url, userInput,{
              headers: {
                Authorization: `Bearer ${this.state.token}`
              }
            })
            .then( response => {
              console.log(response)
              //this.onGetData();
              // save the input locally to avoid the need to fetch new data from the server, hence making it lighter to load for user
              let copyData = [...this.state.data];
              let newData = {
                content: response.data.todo.content,
                id: response.data.todo.id,
                buttonState: false,
              } 
    
              this.setState({ data: [...copyData, newData] , 
                            inputError: false, 
                            input: ""})
            
          })
          .catch ( err => {
            // when error occurs, fetching the error messages from the server
            console.log(err.response.data);
            
             // if token is already expired, then unsubscribe to token and redirect to home
            if (err.response.data.message === "Unauthorized") {
                this.setState({endSessionAlert: true})
            } else if (err.response.data.message === "Validation error"){ // if there is an error in input, then fetch the error message from the server
                this.setState({inputError: true, 
                errorMsg: err.response.data.details[0].message})
            }
          })
      }

      //removing a spesific item inside the list by sending it's id to the server
      onDelete(id){
        axios.delete( 'http://3.120.96.16:3002/todos/'+ id, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then( response => {
          console.log(response)
          //this.onGetData();
          //delete the data locally, to avoid calling the server 
          const listIndex = this.state.data.findIndex (x => x.id === id);
          let copyData = [...this.state.data]
          copyData.splice(listIndex, 1)
          this.setState({data: copyData})
       }).catch(err => {
         console.log(err)
         // if token is already expired, then unsubscribe to token and redirect to home
         if (err.response.data.message === "Unauthorized") {
           //updateToken(null);
           this.setState({endSessionAlert: true})
         }
       })
      }

      // a function to control the checklist button correspon to every item on the list.
      radioBtnChange(index){
          if (index){
            const buttonIndex = this.state.data.findIndex (x => x.id === index);
          // console.log(buttonIndex)
            const data = [...this.state.data];
          
          //console.log("the curent data", data)
          
          data[buttonIndex] = {
              content: data[buttonIndex].content,
              id : data[buttonIndex].id,
              buttonState : data[buttonIndex].buttonState === false ? true : false,
          }

          this.setState({data})
        }

      }
  
      componentDidUpdate(){
        if (!this.state.token){
          updateToken(null);
          this.setState({endSessionMsg: "home"})
         }
      }

      // to clean up the component before login out
      componentWillUnmount(){
          this.subscribe.unsubscribe();

          let CancelToken = axios.CancelToken;
          this.source = CancelToken.source();

          axios.get(url, {
            cancelToken: this.source.token
          })
          .catch(function (thrown) {
            if (axios.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              // handle error
            }
          }); 
          this.source.cancel('Operation canceled by the user.'); 

      }

      endSessionOption(option){
        updateToken(null);
        if (option === "backhome"){
          this.setState({endSessionMsg: "home"})
        } else if (option === "relogin"){
          this.setState({endSessionMsg: "login"})
        }
      }


    render(){
        
      // if the token is not valid or no longer valid, then the page should be automatically redirect to the login page
       /*  if (!this.state.token) {
            return <Redirect to="/" />;
          } */

        if(this.state.endSessionMsg === "login"){
          return <Redirect to="/login" />;
        } else if (this.state.endSessionMsg === "home"){
          return <Redirect to="/" />;
        }

        let datas = [];
        let printData;

        let icon = css({
          color: "rgba(180, 180, 180, 0.5)", 
          position:"relative", 
          top: "2px",
          right:"40px",
          ":hover":{
            color: "red",
          }
      })

      // when the app has succeed on fetching the data from the server and save it to the state, then copy it to a local variable
        
        if (this.state.data){

            //console.log("not undefined");
            datas.push(this.state.data)
          
            //mapping the data to be able to render 
            printData = datas[0].map((data) => {
             
              // controling which icon to use when the checklist is true or false
              let button;
              if (data.buttonState){
                button = <TiTick size="25px"  style={{color: "rgb(250, 142, 0)"}}/>
              } else {
                button = <TiTickOutline size="25px"/>
              }

              return (<li key= {data.id}>
                          <span className="liText" onClick={() => this.radioBtnChange(data.id)}>
                              <span>{button}</span>
                              <span>{data.content}</span>
                          </span>
                          
                          <span className="deleteBtn">
                              <button className={icon} onClick = {() => this.onDelete(data.id)}><TiDelete size="25px" /></button>
                          </span>
                      </li>
                      )
                     })
        }

        let endSessionBox;

        let backButton = css ({
          width: "100%",
          height: "40px",
          borderBottom: "1px solid #e0e0e0",
          borderLeft: "none",
          borderTop: "none",
          borderRight: "none",
          paddingBottom: "8px",
          backgroundColor: "#fff",
          textAlign: "left",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "13px",
          color: "#737373",
          marginTop: "8px",
          verticalAlign: "middle",
          ":hover": {
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            color: "orangered",
            fontWeight: "bold",
          }
        })

        if (this.state.endSessionAlert){
            endSessionBox = (<div className="container endSession">
                                  <div className="container endSession box">
                                      <TiWarning size="40px" />
                                      <p>Your session has expired.</p>
                                      <p>Please log in again to continue or log out to return to home.</p>
                                      <div>
                                          <button onClick={() => {this.endSessionOption("relogin") }} >Go to login</button>
                                          <button onClick={() => {this.endSessionOption("backhome") }} >Log out</button>
                                      </div>
                                  </div>
                             </div>)
        }


        return <div className="todoBox">
                  <Helmet>
                      <title>The To Do List</title>
                  </Helmet>
                  <Header user = {this.state.user}
                          logout = {this.logout}
                          testItem = "todo"
                  />
                  <div className="container">
                      <div className="info-box">
                          <div className="info-area">
                              <h2>Welcome, {this.state.user}</h2>
                              <hr/>
                              <p>doTodo is a general-purpose website which can be used for simple home lists. You can simply create your own to do list, mark it when it's done and remove it when you no longer need it. It's that easy!</p>
                          </div>
                          <div className="info-menu">
                              <h3>Main Menu</h3>
                              <hr/>
                              <Link to ="/" ><button className={backButton}><TiHome size="16px" color= "orangered" style={{position: "relative", top: "2px", marginRight: "6px", marginLeft:"5px"}}/>Home</button></Link>
                              <button className={backButton} onClick={this.logout}><TiPower size="22px" color= "orangered" style={{position: "relative", top: "6px", marginRight: "3px", marginLeft:"3px"}}/>Log out</button>
                          </div>
                      </div>
                      <div className="content">
                          <div className="content-top">
                            <h2>YOUR TO DO LIST</h2>
                            <FormTodo 
                                onChange= {this.onChange} 
                                value={this.state.input} 
                                errorMsg = {this.state.errorMsg}
                                input = {this.state.input}
                                inputError = {this.state.inputError}
                                onSubmit = {this.onSubmit}
                            />
                          </div>
                          <div className="todolist">
                              <ul>
                                {printData}
                              </ul>
                          </div>
                      </div>
                    
                  </div>
                  <Footer />
                  {ReactDOM.createPortal(endSessionBox, document.querySelector("#root")) }
             </div>
    
  }
}
    

export default Todo;