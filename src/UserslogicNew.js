<<<<<<< HEAD
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

=======
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
            editing:false,
            users:[],
            length:0,
            newUser: false,
            user: {
                full_name: '',
                class: '',
                school: '',
            }
        }
        this.updateUser = this.updateUser.bind(this)
    }
   
componentDidMount() {
    axios.get(jsonfile)
    .then((res) => {
        this.setState({ users: res.data.users })
    })
} 

updateUser(e) {
    let user = this.state.user
    user[e.target.name] = e.target.value
    this.setState({ user: user })
}

toggleForm() {
    this.setState({ editing: !this.state.editing, newUser: !this.state.newUser})
}

addNew(){
    var arr=this.state.users;
    arr.push({
        full_name:this.state.user.full_name,
        class:this.state.user.class,
        school:this.state.user.school
    });
    this.setState({
        user:arr,
        length:arr.length,
        editing:false,
        newUser: false,
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
i seee. yeah u should have added in constructor but why its working? coz as per the logic, if this.state.editing evaluates  to true or exist
it will show form, else for any condition it will show users list. so at begining thsi.state.editing returns undefined
so it returns u renderThis, but again, when u click edit, u r setting value of editing on state so now it has value set to true
so now now it returns renderForm. so somehow coz of logic, error was not thrown. but to avoid any unhandled error
its better to declare in contrctuctor;  got this? yes earlier i added it in constructor, but now its missimg anyway i will add it now

edit=(i)=>{
    index=i;
  const user = this.state.users[i]
    this.setState({
    editing:true,
    user: user
    });

}

save=(ind)=>{
    const user = this.state.user
    if(!user.full_name || !user.class || !user.school ){
        alert('cant add empty name/class/school')
    }
    else{  
        this.saveUser(user.full_name, user.class, user.school,ind);
        this.setState({
            editing:false
        });
    }
    
}

renderThis=()=>{
    return ( 
        <div className="container">
          <div className="col-xs-12">
            <button className="btn btn-success" type="button" onClick={this.toggleForm.bind(this)}>
                <span className="glyphicon glyphicon-plus" /> &nbsp;User
            </button>
          </div> <br /> <br />
          <UserHeader />
          {!this.state.users && 
              <p>Loading ...</p>
          }

          {this.state.users && this.state.users.map((user,i) => {
              return <UserRow key={i} user={user} index={i} editAction={this.edit.bind(this)} removeAction={this.removeUser.bind(this)} />
               
          })} 
        </div>  
    );
}

renderForm=()=>{
    return (
        <div className="userContainer"> 
        <div className="row user-form">
            <div className="col-sm-3" />
            <div className="col-sm-6">
                <input className="form-control" name="full_name" onChange={e => this.updateUser(e)} value={this.state.user.full_name} type="text" placeholder="enter new full_name here"/>
                <input className="form-control" name="class" onChange={e => this.updateUser(e)} value={this.state.user.class} type="text" placeholder="enter new class here"/>
                <input className="form-control" name="school" onChange={e => this.updateUser(e)} value={this.state.user.school} type="text" placeholder="enter new school here"/> 
                <button type="button" className="btn btn-success"
                        onClick={this.state.newUser ? this.addNew.bind(this) : this.save.bind(this,index)}>
                    <span className="glyphicon glyphicon-ok" /> &nbsp;save
                </button>
            </div>
        </div>
        </div>
    );
}



    render() {

        return this.state.editing?this.renderForm():this.renderThis();
    }
}

>>>>>>> adding from git bash
