(this.webpackJsonptodoapp=this.webpackJsonptodoapp||[]).push([[0],{132:function(e,t,a){e.exports=a.p+"static/media/background.fa9bc396.png"},133:function(e,t,a){e.exports=a.p+"static/media/background-online.46e70a0d.png"},134:function(e,t,a){e.exports=a(293)},139:function(e,t,a){},195:function(e,t){},197:function(e,t){},235:function(e,t){},236:function(e,t){},292:function(e,t,a){},293:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(51),s=a.n(r),c=(a(139),a(9)),i=a(10),l=a(12),m=a(11),u=a(13),h=a(5),d=a(27),p=a(35),g=a(4),b=a(15),f=a.n(b),E=a(26),v=new(a(295).a)(localStorage.getItem("token"));function x(e){e?localStorage.setItem("token",e):localStorage.removeItem("token"),v.next(e)}var O=a(6),j=a(2),k=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).onSubmit=a.onSubmit.bind(Object(g.a)(a)),a.onChange=a.onChange.bind(Object(g.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"onChange",value:function(e){this.props.onChange(e.target.value,e.target.name)}},{key:"onSubmit",value:function(e){e.preventDefault(),this.props.onSubmit()}},{key:"render",value:function(){var e,t,a=Object(j.css)({width:"50%",height:"40px",paddingLeft:"10px",margin:"10px 0",borderTop:"none",borderLeft:"none",borderRight:"none",borderBottom:"4px solid #FFB200",backgroundColor:"#F1F1F1",fontSize:"14px",color:"#737373"});t=this.props.error400?Object(j.css)({border:"2px solid red","::placeholder":{color:"red"},":focus::placeholder":{color:"transparent"}}):this.props.error401?Object(j.css)({border:"2px solid red","::placeholder":{color:"red"},":focus::placeholder":{color:"transparent"}}):Object(j.css)({"::placeholder":{color:"rgb(94, 94, 94)"},":focus::placeholder":{color:"transparent"}});var n=Object(j.css)({color:"white",fontWeight:"bold",fontSize:"13px",width:"51%",height:"40px",margin:"20px 0",border:"none"});return e="Login"===this.props.textContent?Object(j.css)({backgroundColor:"#FFAA00",":hover":{backgroundColor:"#FFC500",cursor:"pointer",color:"white"}}):Object(j.css)({backgroundColor:"#196ab1",":hover":{backgroundColor:"#1c9bfa",cursor:"pointer",color:"white"}}),o.a.createElement(o.a.Fragment,null,o.a.createElement("form",{onSubmit:this.onSubmit},o.a.createElement("input",{type:"email",onChange:this.onChange,className:"".concat(t," ").concat(a),placeholder:"name@email.com",email:this.props.email,value:this.props.email,name:"email"}),o.a.createElement("input",{type:"password",name:"password",onChange:this.onChange,className:"".concat(t," ").concat(a),placeholder:"password",password:this.props.password,value:this.props.password}),o.a.createElement("button",{type:"submit",className:"".concat(e," ").concat(n)},this.props.textContent)))}}]),t}(o.a.Component),S=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).onClick=a.onClick.bind(Object(g.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"onClick",value:function(){this.props.logout()}},{key:"render",value:function(){var e,t,a,n=Object(j.css)({color:"#196ab1",fontWeight:"bold",textDecoration:"none",":hover":{color:"#FF8B00"}}),r=Object(j.css)({textDecoration:"none",color:"#196ab1",":hover":{cursor:"pointer"}}),s=Object(j.css)({width:"20px",height:"20px",backgroundColor:"#196ab1",borderRadius:" 0 50% 50% 50%",padding:"5px",marginBottom:"0px",marginRight:"5px",position:"relative",top:"3px"});return console.log("render from header"),"todo"===this.props.testItem?(a=o.a.createElement("h3",null,o.a.createElement(h.b,{to:"/",className:r}," ",o.a.createElement(O.c,{color:"white",className:s}),"doToDo")),e=o.a.createElement("p",{className:"loginUser"},this.props.user),t=o.a.createElement("button",{onClick:this.props.logout,className:"logoutButton"},"Log out")):"signup"===this.props.testItem?(a=o.a.createElement("h3",null,o.a.createElement(h.b,{to:"/",className:r}," ",o.a.createElement(O.c,{color:"white",className:s}),"doToDo")),e=o.a.createElement("p",{className:"loginUser"},o.a.createElement(h.b,{to:"/",className:n},"Home")),t=o.a.createElement("p",{className:"logoutButton"},o.a.createElement(h.b,{to:"/login",className:n},"Log in"))):"login"===this.props.testItem?(a=o.a.createElement("h3",null,o.a.createElement(h.b,{to:"/",className:r}," ",o.a.createElement(O.c,{color:"white",className:s}),"doToDo")),e=o.a.createElement("p",{className:"loginUser"},o.a.createElement(h.b,{to:"/",className:n},"Home")),t=o.a.createElement("p",{className:"logoutButton"},o.a.createElement(h.b,{to:"/register",className:n},"Sign up"))):"home"===this.props.testItem&&("Register"===this.props.activeToken?(a=o.a.createElement("h3",null,o.a.createElement(h.b,{to:"/",className:r}," ",o.a.createElement(O.c,{color:"white",className:s}),"doToDo")),e=o.a.createElement("p",{className:"loginUser"},o.a.createElement(h.b,{to:"/register",className:n},"Sign up")),t=o.a.createElement("p",{className:"logoutButton"},o.a.createElement(h.b,{to:"/login",className:n},"Log in"))):(a=o.a.createElement("h3",null,o.a.createElement(h.b,{to:"/",className:r}," ",o.a.createElement(O.c,{color:"white",className:s}),"doToDo")),e=o.a.createElement("p",{className:"loginUser"},this.props.activeToken),t=o.a.createElement("button",{onClick:this.props.logout,className:"logoutButton"},"Log out"))),o.a.createElement("div",{className:"header"},o.a.createElement("div",{className:"header-left"},a),o.a.createElement("div",{className:"header-right"},e,o.a.createElement("span",null,"|"),t))}}]),t}(o.a.PureComponent),N=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("footer",null,o.a.createElement("p",null,'Devina. A. Paramita Na - 2020 | "Human Illustrator" by ',o.a.createElement("a",{href:"https://www.humaaans.com/"},"humaaans"),", used under ",o.a.createElement("a",{href:"https://creativecommons.org/licenses/by/4.0/"},"CC BY")))}}]),t}(o.a.PureComponent),C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={email:"",password:"",error401:!1,error400:!1,token:v.value,value:"",errorMsg:""},a.onSubmit=a.onSubmit.bind(Object(g.a)(a)),a.onChange=a.onChange.bind(Object(g.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.subscription=v.subscribe((function(t){e.setState({token:t})}))}},{key:"componentWillUnmount",value:function(){this.subscription.unsubscribe()}},{key:"onChange",value:function(e,t){var a;this.setState((a={},Object(p.a)(a,t,e),Object(p.a)(a,"value",e),a))}},{key:"onSubmit",value:function(){var e=this,t={email:this.state.email,password:this.state.password};f.a.post("http://3.120.96.16:3002/auth",t).then((function(e){x(e.data.token)})).catch((function(t){console.log(t.response.data),"Validation error"===t.response.data.message?e.setState({error400:!0,error401:!1,errorMsg:t.response.data.details[0].message}):"Email or password incorrect"===t.response.data.message&&(console.log("error 401"),e.setState({error401:!0,error400:!1,errorMsg:t.response.data.message}))}))}},{key:"render",value:function(){if(this.state.token)return o.a.createElement(d.a,{to:"/todo"});var e=Object(j.css)({width:"60px",height:"60px",backgroundColor:"orange",borderRadius:"50% 0% 50% 50%",padding:"20px",marginBottom:"0px"}),t=Object(j.css)({color:"#196ab1",fontSize:"35px",marginBottom:"30px",width:"320px",fontFamily:"Montserrat, sans-serif",lineHeight:"20px",fontWeight:"bold",marginTop:"25px"}),a=Object(j.css)({fontSize:"13px",color:"#737373"}),n=Object(j.css)({color:"orangered",fontWeight:"bold",":hover":{color:"#FF8B00"}}),r=Object(j.css)({color:"red",margin:0,fontSize:"12px",height:"12px",fontWeight:"700"}),s=o.a.createElement("p",{className:r}," ");return this.state.error400?s=o.a.createElement("p",{className:r},this.state.errorMsg):this.state.error401&&(s=o.a.createElement("p",{className:r},this.state.errorMsg)),o.a.createElement("div",{className:"login-box"},o.a.createElement(E.Helmet,null,o.a.createElement("title",null,"doTodo - Log in")),o.a.createElement(S,{testItem:"login"}),o.a.createElement("div",{className:"login-container"},o.a.createElement("div",{className:"box-right"},o.a.createElement(O.i,{color:"white",className:e}),o.a.createElement("h3",{className:t},"Log in"),s,o.a.createElement(k,{onSubmit:this.onSubmit,error400:this.state.error400,error401:this.state.error401,email:this.state.email,password:this.state.password,textContent:"Login",onChange:this.onChange,value:this.state.value}),o.a.createElement("p",{className:a},"Don't have an account? ",o.a.createElement("span",null,o.a.createElement(h.b,{to:"/register",className:n},"Sign up here!"))))),o.a.createElement(N,null))}}]),t}(o.a.Component),w=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={email:"",password:"",error400:!1,errorMsg:"",value:"",status:!1},a.onSubmit=a.onSubmit.bind(Object(g.a)(a)),a.onChange=a.onChange.bind(Object(g.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"onChange",value:function(e,t){var a;this.setState((a={},Object(p.a)(a,t,e),Object(p.a)(a,"value",e),a))}},{key:"onSubmit",value:function(){var e=this,t={email:this.state.email,password:this.state.password};f.a.post("http://3.120.96.16:3002/register",t).then((function(t){console.log(t),e.setState({status:!0})})).catch((function(t){console.log(t.response.data),"Validation error"===t.response.data.message?e.setState({error400:!0,errorMsg:t.response.data.details[0].message}):"User with that email address exists"===t.response.data.message&&e.setState({error400:!0,errorMsg:t.response.data.message})}))}},{key:"render",value:function(){if(this.state.status)return o.a.createElement(d.a,{to:"/login"});var e=Object(j.css)({width:"60px",height:"60px",backgroundColor:"#196ab1",borderRadius:"0 50% 50% 50%",padding:"20px",marginBottom:"0px"}),t=Object(j.css)({color:"#196ab1",fontSize:"35px",marginBottom:"30px",width:"320px",fontFamily:"Montserrat, sans-serif",fontWeight:"bold",lineHeight:"20px",marginTop:"25px"}),a=Object(j.css)({fontSize:"13px",color:"#737373"}),n=Object(j.css)({color:"orangered",fontWeight:"bold",":hover":{color:"#FF8B00"}}),r=Object(j.css)({color:"red",margin:"0",fontSize:"12px",height:"12px",fontWeight:"bold"}),s=o.a.createElement("p",{className:r}," ");return this.state.error400&&(s=o.a.createElement("p",{className:r},this.state.errorMsg)),o.a.createElement("div",{className:"register-box"},o.a.createElement(E.Helmet,null,o.a.createElement("title",null,"doTodo - Sign Up")),o.a.createElement(S,{testItem:"signup"}),o.a.createElement("div",{className:"login-container"},o.a.createElement("div",{className:"box-right"},o.a.createElement(O.j,{color:"white",className:e}),o.a.createElement("h3",{className:t},"Sign Up"),s,o.a.createElement(k,{onSubmit:this.onSubmit,error400:this.state.error400,error401:this.state.error401,email:this.state.email,onChange:this.onChange,value:this.state.value,password:this.state.password,textContent:"Create Account"}),o.a.createElement("p",{className:a},"Already have an account? ",o.a.createElement("span",null,o.a.createElement(h.b,{to:"/login",className:n},"Login here!"))))),o.a.createElement(N,null))}}]),t}(o.a.Component),y=a(52),B=a.n(y),D=a(132),T=a.n(D),z=a(133),M=a.n(z),F="http://3.120.96.16:3002/todos",I=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={user:"",token:v.value,data:[]},a.logout=a.logout.bind(Object(g.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("does it mount"),this.subscribe=v.subscribe((function(t){if(e.setState({token:t}),e.state.token){var a=B.a.decode(e.state.token);e.setState({user:a.email})}})),this.state.token&&this.onGetData()}},{key:"onGetData",value:function(){var e=this,t=f.a.CancelToken;this.source=t.source(),f.a.get(F,{headers:{Authorization:"Bearer ".concat(this.state.token)}},{cancelToken:this.source.token}).then((function(t){console.log(t.data.todos),e.setState({data:t.data.todos})})).catch((function(e){console.error(e),x(null)}))}},{key:"componentWillUnmount",value:function(){this.subscribe.unsubscribe();var e=f.a.CancelToken;this.source=e.source(),f.a.get(F,{cancelToken:this.source.token}).catch((function(e){f.a.isCancel(e)&&console.log("Request canceled",e.message)})),this.source.cancel("Operation canceled by the user.")}},{key:"logout",value:function(){x(null)}},{key:"render",value:function(){var e,t,a,n,r,s,c=Object(j.css)({color:"rgb(252, 156, 11)",textDecoration:"none",fontSize:"20px",":hover":{color:"orangered"}}),i=Object(j.css)({display:"flex",flexFlow:"row wrap",justifyContent:"center",alignItems:"center"}),l=Object(j.css)({width:"140px",height:"140px",display:"flex",flexFlow:"column wrap",justifyContent:"center",alignItems:"center",fontSize:"12px",padding:"10px",background:"#fba108",margin:"-50px 15px 25px 15px",color:"white",borderRadius:"50%",textDecoration:"none",fontWeight:"bold",zIndex:1}),m=Object(j.css)({width:"180px",backgroundColor:"rgb(252, 156, 11)",color:"white",padding:"10px",textDecoration:"none",verticalAlign:"middle",marginTop:"30px",borderRadius:"40px",":hover":{backgroundColor:"#ff7100"}}),u=Object(j.css)({height:"55%",objectFit:"cover",marginBottom:"50px",position:"absolute",zIndex:"0",marginTop:"50px"}),d=Object(j.css)({fontSize:"18px",fontWeight:"bold"});return void 0!==this.state.data&&this.state.data.length>=1?(n=this.state.data.length,r="Do not forget to check your list to make sure you did not miss anything!"):0===this.state.data.length&&(n="0",r="Time to organize your day and create a list!"),this.state.token?(e=this.state.user,s=o.a.createElement("title",null,"Welcome, ",this.state.user),t=o.a.createElement(h.b,{to:"/todo",style:{textDecoration:"none",color:"white",fontSize:"15px",fontWeight:"bold"}},o.a.createElement("div",{className:m},"Jump back to list!")),a=o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"welcome-top"},o.a.createElement("img",{className:u,src:M.a,alt:"headerimage"})),o.a.createElement("div",{className:"welcome-content"},o.a.createElement("div",{className:"welcome-sidebar"},o.a.createElement("div",{className:"counter"},o.a.createElement("h3",null,n))),o.a.createElement("div",{className:"welcome-textbox"},o.a.createElement("h3",null,"Hi, ",this.state.user),o.a.createElement("p",{className:d},"Currently you have ",n," items on your to-do list."),o.a.createElement("p",{style:{marginTop:"0px"}},r),t)))):(e="Register",s=o.a.createElement("title",null,"doTodo"),t=o.a.createElement("h3",null,o.a.createElement(h.b,{to:"/register",className:c},"Sign up now!")),a=o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"welcome-top"},o.a.createElement("img",{className:u,src:T.a,alt:"headerimage"})),o.a.createElement("div",{className:i},o.a.createElement("div",{className:l},o.a.createElement(O.e,{size:"80px",color:"white"}),"Make new list"),o.a.createElement("div",{to:"/todo",className:l},o.a.createElement(O.f,{size:"80px",color:"white"}),"Done the list"),o.a.createElement("div",{to:"/todo",className:l},o.a.createElement(O.h,{size:"80px",color:"white"}),"Remove the list")),o.a.createElement("p",null,"doTodo is a general-purpose to-do creator website which can be used for simple home lists. You can simply create your own to do list, mark it when it's done and remove it when you no longer need it. It's that easy!"),t)),o.a.createElement("div",{className:"todoBox"},o.a.createElement(E.Helmet,null,s),o.a.createElement(S,{testItem:"home",activeToken:e,logout:this.logout}),o.a.createElement("div",{className:"welcome-container"},a),o.a.createElement(N,null))}}]),t}(o.a.Component),A=a(43),W=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).onChange=a.onChange.bind(Object(g.a)(a)),a.onSubmit=a.onSubmit.bind(Object(g.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"onChange",value:function(e){this.props.onChange(e.target.value)}},{key:"onSubmit",value:function(e){e.preventDefault(),this.props.onSubmit()}},{key:"render",value:function(){var e,t,a=" ",n=Object(j.css)({color:"red",margin:"0px",fontSize:"12px",fontWeight:"bold",marginLeft:"30px",width:"calc(90% - 30px)",height:"calc(100% - 10px)",marginBottom:"5px"});t=Object(j.css)({fontSize:"12px",color:"#737373",width:"calc(10% - 10px)",textAlign:"right",margin:"0px 0px 0px 0px"});var r=Object(j.css)({display:"flex",flexFlow:"row wrap",height:"20px",width:"80%",alignItems:"center",justifyContent:"space-between",marginBottom:"5px"});return this.props.inputError?(a=this.props.errorMsg,e=Object(j.css)({border:"2px solid red",padding:"2px","::placeholder":{color:"rgb(94, 94, 94)"}})):(a=" ",e=Object(j.css)({border:"1px solid #dddddd",padding:"2px","::placeholder":{color:"rgb(94, 94, 94)"}})),(this.props.input.length>100||0===this.props.input.length)&&(t=Object(j.css)({fontSize:"12px",color:"red",width:"calc(10% - 10px)",textAlign:"right",margin:"0px 0px 0px 0px"})),o.a.createElement(o.a.Fragment,null,o.a.createElement("span",{className:r},o.a.createElement("p",{className:n},a),o.a.createElement("p",{className:t},this.props.input.length,"/100")),o.a.createElement("form",{onSubmit:this.onSubmit},o.a.createElement("input",{className:e,type:"text",onChange:this.onChange,value:this.props.value,placeholder:"What to do today?"}),o.a.createElement("button",{className:"addButton",type:"submit"},"Add List")))}}]),t}(o.a.Component),L=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).onDelete=a.onDelete.bind(Object(g.a)(a)),a.radioBtnChange=a.radioBtnChange.bind(Object(g.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"onDelete",value:function(e){this.props.onDelete(e)}},{key:"radioBtnChange",value:function(e){this.props.radioBtnChange(e)}},{key:"render",value:function(){var e,t=this,a=[],n=Object(j.css)({color:"rgba(180, 180, 180, 0.5)",position:"relative",top:"2px",right:"40px",":hover":{color:"red"}});return this.props.data&&(a.push(this.props.data),e=a[0].map((function(e){var a;return a=e.buttonState?o.a.createElement(O.f,{size:"25px",style:{color:"rgb(250, 142, 0)"}}):o.a.createElement(O.g,{size:"25px"}),o.a.createElement("li",{key:e.id},o.a.createElement("span",{className:"liText",onClick:function(){return t.radioBtnChange(e.id)}},o.a.createElement("span",null,a),o.a.createElement("span",null,e.content)),o.a.createElement("span",{className:"deleteBtn"},o.a.createElement("button",{className:n,onClick:function(){return t.onDelete(e.id)}},o.a.createElement(O.a,{size:"25px"}))))}))),o.a.createElement("ul",null,e)}}]),t}(o.a.Component),R="http://3.120.96.16:3002/todos",U=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={user:"",token:v.value,input:"",data:[],inputError:!1,idStat:!1,errorMsg:"",endSessionAlert:!1,endSessionMsg:""},a.source=void 0,a.logout=a.logout.bind(Object(g.a)(a)),a.onSubmit=a.onSubmit.bind(Object(g.a)(a)),a.onChange=a.onChange.bind(Object(g.a)(a)),a.onGetData=a.onGetData.bind(Object(g.a)(a)),a.onDelete=a.onDelete.bind(Object(g.a)(a)),a.radioBtnChange=a.radioBtnChange.bind(Object(g.a)(a)),a.endSessionOption=a.endSessionOption.bind(Object(g.a)(a)),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("does it mount"),this.subscribe=v.subscribe((function(t){if(e.setState({token:t}),e.state.token){var a=B.a.decode(e.state.token);e.setState({user:a.email})}})),this.state.token&&this.onGetData()}},{key:"onGetData",value:function(){var e=this,t=f.a.CancelToken;this.source=t.source(),f.a.get(R,{headers:{Authorization:"Bearer ".concat(this.state.token)}},{cancelToken:this.source.token}).then((function(t){console.log(t.data.todos),e.setState({data:t.data.todos})})).then((function(){console.log(e.state.data);var t=e.state.data;t.map((function(e){return e.buttonState=!1})),e.setState({data:t})})).catch((function(t){console.error(t),e.setState({endSessionAlert:!0})}))}},{key:"logout",value:function(){x(null),this.setState({endSessionMsg:"home"})}},{key:"onChange",value:function(e){var t=e;this.setState({input:t})}},{key:"onSubmit",value:function(){var e=this;console.log(this.state.input);var t={content:this.state.input};f.a.post(R,t,{headers:{Authorization:"Bearer ".concat(this.state.token)}}).then((function(t){console.log(t);var a=Object(A.a)(e.state.data),n={content:t.data.todo.content,id:t.data.todo.id,buttonState:!1};e.setState({data:[].concat(Object(A.a)(a),[n]),inputError:!1,input:""})})).catch((function(t){console.log(t.response.data),"Unauthorized"===t.response.data.message?e.setState({endSessionAlert:!0}):"Validation error"===t.response.data.message&&e.setState({inputError:!0,errorMsg:t.response.data.details[0].message})}))}},{key:"onDelete",value:function(e){var t=this;f.a.delete("http://3.120.96.16:3002/todos/"+e,{headers:{Authorization:"Bearer ".concat(this.state.token)}}).then((function(a){console.log(a);var n=t.state.data.findIndex((function(t){return t.id===e})),o=Object(A.a)(t.state.data);o.splice(n,1),t.setState({data:o})})).catch((function(e){console.log(e),"Unauthorized"===e.response.data.message&&t.setState({endSessionAlert:!0})}))}},{key:"radioBtnChange",value:function(e){if(e){var t=this.state.data.findIndex((function(t){return t.id===e})),a=Object(A.a)(this.state.data);a[t]={content:a[t].content,id:a[t].id,buttonState:!1===a[t].buttonState},this.setState({data:a})}}},{key:"componentDidUpdate",value:function(){this.state.token||this.setState({endSessionAlert:!0})}},{key:"componentWillUnmount",value:function(){this.subscribe.unsubscribe();var e=f.a.CancelToken;this.source=e.source(),f.a.get(R,{cancelToken:this.source.token}).catch((function(e){f.a.isCancel(e)&&console.log("Request canceled",e.message)})),this.source.cancel("Operation canceled by the user.")}},{key:"endSessionOption",value:function(e){x(null),"backhome"===e?this.setState({endSessionMsg:"home"}):"relogin"===e&&this.setState({endSessionMsg:"login"})}},{key:"render",value:function(){var e,t=this;if("login"===this.state.endSessionMsg)return o.a.createElement(d.a,{to:"/login"});if("home"===this.state.endSessionMsg)return o.a.createElement(d.a,{to:"/"});var a=Object(j.css)({width:"100%",height:"40px",borderBottom:"1px solid #e0e0e0",borderLeft:"none",borderTop:"none",borderRight:"none",paddingBottom:"8px",backgroundColor:"#fff",textAlign:"left",fontFamily:"'Montserrat', sans-serif",fontSize:"13px",color:"#737373",marginTop:"8px",verticalAlign:"middle",":hover":{cursor:"pointer",backgroundColor:"#f5f5f5",color:"orangered",fontWeight:"bold"}});return this.state.endSessionAlert&&(console.log("alert true"),e=o.a.createElement("div",{className:"container endSession"},o.a.createElement("div",{className:"container endSession box"},o.a.createElement(O.k,{size:"40px"}),o.a.createElement("p",null,"Your session has expired."),o.a.createElement("p",null,"Please log in again to continue or log out to return to home."),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){t.endSessionOption("relogin")}},"Go to login"),o.a.createElement("button",{onClick:function(){t.endSessionOption("backhome")}},"Log out"))))),o.a.createElement("div",{className:"todoBox"},o.a.createElement(E.Helmet,null,o.a.createElement("title",null,"The To Do List")),o.a.createElement(S,{user:this.state.user,logout:this.logout,testItem:"todo"}),o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"info-box"},o.a.createElement("div",{className:"info-area"},o.a.createElement("h2",null,"Welcome, ",this.state.user),o.a.createElement("hr",null),o.a.createElement("p",null,"doTodo is a general-purpose website which can be used for simple home lists. You can simply create your own to do list, mark it when it's done and remove it when you no longer need it. It's that easy!")),o.a.createElement("div",{className:"info-menu"},o.a.createElement("h3",null,"Main Menu"),o.a.createElement("hr",null),o.a.createElement(h.b,{to:"/"},o.a.createElement("button",{className:a},o.a.createElement(O.b,{size:"16px",color:"orangered",style:{position:"relative",top:"2px",marginRight:"6px",marginLeft:"5px"}}),"Home")),o.a.createElement("button",{className:a,onClick:this.logout},o.a.createElement(O.d,{size:"22px",color:"orangered",style:{position:"relative",top:"6px",marginRight:"3px",marginLeft:"3px"}}),"Log out"))),o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"content-top"},o.a.createElement("h2",null,"YOUR TO DO LIST"),o.a.createElement(W,{onChange:this.onChange,value:this.state.input,errorMsg:this.state.errorMsg,input:this.state.input,inputError:this.state.inputError,onSubmit:this.onSubmit})),o.a.createElement("div",{className:"todolist"},o.a.createElement(L,{data:this.state.data,onDelete:this.onDelete,radioBtnChange:this.radioBtnChange})))),o.a.createElement(N,null),s.a.createPortal(e,document.body))}}]),t}(o.a.Component),H=(a(292),function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(h.a,null,o.a.createElement(d.b,{exact:!0,path:"/",component:I}),o.a.createElement(d.b,{path:"/register",component:w}),o.a.createElement(d.b,{path:"/login",component:C}),o.a.createElement(d.b,{path:"/todo",component:U})))}}]),t}(o.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[134,1,2]]]);
//# sourceMappingURL=main.1b12534a.chunk.js.map