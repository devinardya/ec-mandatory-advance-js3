import React from 'react';
import axios from 'axios';
import {token$, updateToken} from './store';
import {Helmet} from "react-helmet";
import {Redirect} from 'react-router-dom';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdClose } from "react-icons/md";
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
          //radioBtn: [],
          idStat: false,
        };

        this.source = undefined;
        this.logout = this.logout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onGetData = this.onGetData.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.radioBtnChange = this.radioBtnChange.bind(this);
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
            //this.setState({profile: response.data.profile});
            //
            
            console.log(response.data.todos);
            this.setState({data: response.data.todos});
            // console.log(this.state.data.length);
            /* let radioBool = [];
            for (var i = 0; i < this.state.data.length; i++){
              radioBool.push(false);
            }
            this.setState({radioBtn: radioBool});  */
            
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
          this.onGetData();
          /* let oldData = [...this.state.data];
          this.setState({data: [...oldData, userInput]}) */
       })
       .catch ( err => {
         console.log(err);
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

 /*      shouldComponentUpdate(nextState) {
        if (this.state.buttonState !== undefined){
            return (this.state.data.buttonState !== nextState.data.buttonState);
        } 
      } */

    render(){

        if (!this.state.token) {
            return <Redirect to="/login" />;
          }
        

   
        //console.log(this.state.data)
        let datas = [];
        let printData;
        //console.log(this.state.data[0]);
        
        if (this.state.data){

            //console.log("not undefined");
            datas.push(this.state.data)
            
           

            printData = datas[0].map((data) => {
              let button;
              console.log(data.buttonState)
              if (data.buttonState){
                button = <MdCheckBox size="20px"  style={{color: "green"}}/>
              } else {
                button = <MdCheckBoxOutlineBlank size="20px"/>
              }
              //console.log(data.buttonState);
              return (<li key= {data.id}>
                          <span className="list-radioBtn" onClick={() => this.radioBtnChange(data.id)}>
                              {button}
                          </span>
                          <span className ="liText">
                               {data.content} 
                          </span>
                          <span className="deleteBtn">
                              <button onClick = {() => this.onDelete(data.id)}><MdClose size="20px" style={{color: "red", position:"relative", right:"40px"}}/></button>
                          </span>
                      </li>
                      )
            
            })
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
                            <input type="text" onChange= {this.onChange} value={this.state.input} placeholder="What to do today?"  />
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