import React from 'react';
import axios from 'axios';
import {token$, updateToken} from './store';
import {Helmet} from "react-helmet";
import {Redirect} from 'react-router-dom';
import { MdRadioButtonUnchecked } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { css } from "glamor";
import jwt from 'jsonwebtoken';
import Header from './Header';


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
          textPlaceholder: true,
          errorMsg: "",
        };

        this.source = undefined;
        this.logout = this.logout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onGetData = this.onGetData.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.radioBtnChange = this.radioBtnChange.bind(this);
        this.onRemovePlaceholderText = this.onRemovePlaceholderText.bind(this);
        this.onShowPlacehoderText = this.onShowPlacehoderText.bind(this);
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
          });
      }

      // a function that called when log out, sending null parameter to the store.js that remove the token, hence making it not valid any longer
      logout() {
        updateToken(null);
      }

      onChange(e){
          let input = e.target.value;
          this.setState({input});
      }

      onSubmit(e){
        e.preventDefault();
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
                         textPlaceholder: true, 
                         input: ""})
         
       })
       .catch ( err => {
         // when error occurs, fetching the error messages from the server and save it on a local state to pass it to the render
         console.log(err.response.data);
         this.setState({inputError: true, 
                        textPlaceholder: true,
                        errorMsg: err.response.data.details[0].message})
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
          this.onGetData();
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
         }
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

      // a function to clear the text inside the placeholder when the input box in on focus
      onRemovePlaceholderText(){
          this.setState({textPlaceholder : false})
      }

      // to show the text inside the placeholder when input box is no longer on focus
      onShowPlacehoderText(){
        this.setState({textPlaceholder : true, inputError: false})
      }

    render(){
        
      // if the token is not valid or no longer valid, then the page should be automatically redirect to the login page
        if (!this.state.token) {
            return <Redirect to="/welcome" />;
          }

        let datas = [];
        let printData;

        let icon = css({
          color: "rgba(180, 180, 180, 0.5)", 
          position:"relative", 
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
                button = <MdCheckCircle size="20px"  style={{color: "orange"}}/>
              } else {
                button = <MdRadioButtonUnchecked size="20px"/>
              }

              return (<li key= {data.id}>
                          <span className="liText" onClick={() => this.radioBtnChange(data.id)}>
                              <span>{button}</span>
                              <span>{data.content}</span>
                          </span>
                          
                          <span className="deleteBtn">
                              <button className={icon} onClick = {() => this.onDelete(data.id)}><MdClose size="25px" /></button>
                          </span>
                      </li>
                      )
                     })
        }

        let inputErrorMessage;
        let placeholder;
        let errorMsg = " ";
        let counter;

        let errMsg = css ({
          color: "red",
          margin: "0px",
          fontSize: "12px",
          fontWeight: "bold",
          marginLeft: "30px",
          width: "calc(70% - 30px)",
          height: "calc(100% - 10px)",
          marginBottom: "5px",
        })

        counter = css ({
          fontSize: "12px",
          color: "#737373",
          width: "30%",
          height: "100%",
          textAlign: "right",
          margin: "0px",
        })

        let errorCounter = css ({
          display: "flex",
          flexFlow: "row wrap",
          height:"20px",
          width: "80%",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "5px",
        })


        if(!this.state.textPlaceholder){
          inputErrorMessage = null;
          placeholder = css({
            padding: "2px",
          })
        } else {
            if(this.state.inputError){
              inputErrorMessage = "What to do today?";
              errorMsg =  this.state.errorMsg;
              placeholder = css({
                border: "2px solid red",
                padding: "2px",
                "::placeholder": {
                  color: "rgb(94, 94, 94)",
                }
              })
          } else {
              inputErrorMessage = "What to do today?";
              placeholder = css({
                border: "px solid #dddddd",
                padding: "2px",
                "::placeholder": {
                  color: "rgb(94, 94, 94)",
                }
              })
          }
        }

        if (this.state.input.length > 100 || this.state.input.length === 0){

            counter = css ({
              fontSize: "12px",
              color: "red",
              width: "30%",
              height: "100%",
              textAlign: "right",
              margin: "0px",
            })
        }


        return <div className="todoBox">
                  <Helmet>
                      <title>To Do List</title>
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
                      </div>
                      <div className="content">
                          <div className="content-top">
                            <h2>YOUR TO DO LIST</h2>
                            <span className ={errorCounter} >
                                <p className = {errMsg}>{errorMsg}</p>
                                <p className= {counter}>{this.state.input.length}/100</p>
                            </span>
                            <form onSubmit = {this.onSubmit}>
                                <input className={placeholder} 
                                    type="text" 
                                    onChange= {this.onChange} 
                                    value={this.state.input} 
                                    placeholder= {inputErrorMessage} 
                                    onFocus={this.onRemovePlaceholderText} 
                                    onBlur={this.onShowPlacehoderText}/>
                                <button className="addButton" type="submit">Add List</button>
                            </form>
                          </div>
                          <div className="todolist">
                              <ul>
                                {printData}
                              </ul>
                          </div>
                      </div>
                    
                  </div>
                  
             </div>
    
  }
}
    

export default Todo;