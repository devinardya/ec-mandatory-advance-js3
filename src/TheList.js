import React from 'react';
import { toggleFavorite } from './store';
import { favorites$ } from "./store";
import { TiTickOutline, TiTick, TiDelete} from "react-icons/ti"
import { css } from "glamor";

class TheList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          favorite: favorites$.value,
        }

        this.onDelete = this.onDelete.bind(this);
        //this.radioBtnChange = this.radioBtnChange.bind(this);
        this.handleFav = this.handleFav.bind(this);

    }

    onDelete(id){
        this.props.onDelete(id);
    }

     // a function to control the checklist button correspon to every item on the list.
   /*   radioBtnChange(index){
      this.props.radioBtnChange(index)
    } */

    handleFav = (doc) => {
      toggleFavorite(doc);
    };

    componentDidMount() {
   
      this.subscribe = favorites$.subscribe(favorite => {
        console.log(favorite)
        this.setState({favorite})
      });

      console.log(this.state.favorite)

  }

  componentWillUnmount() {
      this.subscribe.unsubscribe();
  }

    render(){
        let printData;
        let datas = [];

        let icon = css({
            color: "rgba(180, 180, 180, 0.5)", 
            position:"relative", 
            top: "2px",
            right:"40px",
            ":hover":{
              color: "red",
            }
        })

        if (this.props.data){

            //console.log("not undefined");
            datas.push(this.props.data)
          
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
                          <span className="liText" onClick={() => this.handleFav(data)}>
                          {this.state.favorite.find(x => x.id === data.id)
                              ? <span><TiTick size="20px" style={{ color: "rgb(250, 142, 0)", position: "relative", top: "3px" }} /></span>
                              : <span><TiTickOutline size="20px" style={{ position: "relative", top: "3px" }} /></span>}
                              <span>{data.content}</span>
                          </span>
                          
                          <span className="deleteBtn">
                              <button className={icon} onClick = {() => this.onDelete(data.id)}><TiDelete size="25px" /></button>
                          </span>
                      </li>
                      )
                     })
        }
        return (<ul>
                    {printData}
                 </ul>
        )
    }
}

export default TheList;