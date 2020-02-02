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
        };

        this.source = undefined;
        this.logout = this.logout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onGetData = this.onGetData.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.radioBtnChange = this.radioBtnChange.bind(this);
        this.onRemovePlaceholderText = this.onRemovePlaceholderText.bind(this);
      }

      componentDidMount() {
        console.log("does it mount")

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
            cancelToken: this.source.token
          })
          .then(response => {   
            console.log(response.data.todos);
            this.setState({data: response.data.todos});    
            
          })
          .then ( () => {
            let datas = this.state.data;
            datas.map(data => {
              return data.buttonState = false;
            })
            this.setState({data: datas})
          })
          .catch(e => {
            console.error(e);
            updateToken(null);
          });
      }

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
        this.setState({input: ""})

        axios.post(url, userInput,{
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then( response => {
          console.log(response)
          //this.onGetData();
          let copyData = [...this.state.data];
          let newData = {
            content: response.data.todo.content,
            id: response.data.todo.content,
            buttonState: false,
          }

          this.setState({data: [...copyData, newData]})
          this.setState({inputError: false})
          this.setState({textPlaceholder: true})
       })
       .catch ( err => {
         console.log(err);
         this.setState({inputError: true})
         this.setState({textPlaceholder: true})
       })
       
      }

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

      componentWillUnmount(){
          this.subscribe.unsubscribe();

          //this.source.cancel('Operation canceled by the user.'); 

      }

      shouldComponentUpdate(nextState, prevState){
          if(this.state.data.buttonState !== undefined){
            return this.state.data.buttonState !== prevState.data.buttonState
          } return true
      } 

      onRemovePlaceholderText(){
          this.setState({textPlaceholder : false})
      }

    render(){

        if (!this.state.token) {
            return <Redirect to="/login" />;
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


        
        if (this.state.data){

            //console.log("not undefined");
            datas.push(this.state.data)

            printData = datas[0].map((data) => {
              let button;
              //console.log(data.id)
              if (data.buttonState){
                button = <MdCheckCircle size="20px"  style={{color: "green"}}/>
              } else {
                button = <MdRadioButtonUnchecked size="20px"/>
              }
              //console.log(data.buttonState);
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


        if(!this.state.textPlaceholder){
          inputErrorMessage = null;
          placeholder = css({
            padding: "2px",
          })
        } else {
          if(this.state.inputError){
            inputErrorMessage = "Error! Invalid input!";

            placeholder = css({
              border: "2px solid red",
              padding: "2px",
              "::placeholder": {
                color: "red",
                fontWeight: "bold",
              }
            })
        } else {
            inputErrorMessage = "What to do today?";
            placeholder = css({
              border: "px solid #dddddd",
              padding: "2px",
              "::placeholder": {
                color: "black"
              }
            })
        }
        }


        return <div className="todoBox">
                  <Helmet>
                      <title>To Do List</title>
                  </Helmet>
                  <div className="header">
                      <div className="header-left">
                          <h3>doToDo</h3>
                      </div>
                      <div className="header-right">
                          <p className="loginUser">{this.state.user}</p>
                          <span>|</span>
                          <button onClick={this.logout} className="logoutButton">Log out</button>
                      </div>
                  </div>
                  <div className="content">
                      <div className="content-top">
                        <h2>YOUR TO DO LIST</h2>
                        <form onSubmit = {this.onSubmit}>
                            <input className={placeholder} type="text" onChange= {this.onChange} value={this.state.input} placeholder= {inputErrorMessage} onClick={this.onRemovePlaceholderText}/>
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
    
  }
}
    

export default Todo;