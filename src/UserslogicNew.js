import React from 'react'
import Users from './Users';
import axios from 'axios'
import UserHeader from './Components/UserHeader'
import UserRow from './Components/UserRow'

const jsonfile=' http://localhost:3000/userdata.json';
var index=0;

export default class UsersLogic extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
            length:0,
        }
    }
   
componentDidMount() {
    axios.get(jsonfile)
    .then((res) => {
        this.setState({ users: res.data.users })
    })
}  

addNew(newuser,newclass,newschool){
    var arr=this.state.users;
    arr.push({
        full_name:newuser,
        class:newclass,
        school:newschool
    });
    this.setState({
        users:arr,
        length:arr.length,
        editing:false,
    });

}

saveUser=(newuser,newclass,newschool,i) => {

    var arr=this.state.users;
    arr[i]["full_name"]=newuser,
    arr[i]["class"]=newclass,
    arr[i]["school"]=newschool,
    this.setState({
        users:arr,
    })                                  
}

removeUser=(i)=>{
    var arr=this.state.users;
    arr.splice(i,1); 
  this.setState({
      users:arr
  });
}

edit=(i)=>{
    index=i;
    this.setState({
    editing:true
    });

}

save=(ind)=>{
    var newuser=this.refs.name.value;
    var newclass=this.refs.class.value;
    var newschool=this.refs.school.value;
    if(newuser.length<1 ||newclass.length<1 || newschool.length<1 ){
        alert('cant add empty name/class/school')
    }
    else{  
        this.saveUser(newuser,newclass,newschool,ind);
        this.setState({
            editing:false
        });
    }
    
}

renderThis=()=>{
    return ( 
        <div className="container">
          <UserHeader />
          {!this.state.users && 
              <p>Loading ...</p>
          }
          {this.state.users && this.state.users.map((user,i) => {
              return (
                  <div>
                    <UserRow key={i} user={user} index={i} />
                    <button key={i} onClick={this.edit.bind(this,i)} > edit</button>
                    <button key={i} onClick={this.removeUser.bind(this,i)}> remove</button>
                  </div>
                );
          })}
            <button onClick={this.addNew.bind(this, "default name","default class","default school")} >
            add new user </button>  
        </div>  
    );
}

renderForm=()=>{
    return (
        <div className="userContainer"> 
        <input ref="name" type="text" placeholder="enter new full_name here"/>
        <input ref="class" type="text" placeholder="enter new class here"/>
        <input ref="school" type="text" placeholder="enter new school here"/> 
        <button onClick={this.save.bind(this,index)} >save</button>
        </div>
    );
}



    render(){

                 return this.state.editing?this.renderForm():this.renderThis();
            }
}

