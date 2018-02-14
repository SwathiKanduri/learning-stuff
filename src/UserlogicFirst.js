import React from 'react'
import Users from './Users';
import axios from 'axios'
import UserHeader from './Components/UserHeader'
import UserRow from './Components/UserRow'

const jsonfile=' http://localhost:3000/userdata.json';

export default class UsersLogic extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
            length:0
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
        length:arr.length
    });

}

saveUser=(newuser,newclass,newschool,i)=> {
    var ind=i-1;
    var arr=this.state.users;
arr[ind]["full_name"]=newuser,
arr[ind]["class"]=newclass,
arr[ind]["school"]=newschool,
this.setState({
    users:arr
})
    }

removeUser=(i)=>{
    var arr=this.state.users;
    arr.splice(i,1); 
  this.setState({
      users:arr
  });
}


saveUserNew=(entry)=>{
var arr=this.state.users;

}

    render(){
        return(
            <div className="container">
                <UserHeader />
                {!this.state.users && 
                    <p>Loading ...</p>
                }

                {this.state.users && this.state.users.map((user,i) => {
                    return <UserRow key={i} user={user} index={i} />
                })}  
                
                <button onClick={this.addNew.bind(this, "default name","default class","default school")} >
                add new user </button>  

            </div>   
        );

    }
}
