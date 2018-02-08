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
            users:[]
        }
    }
   
componentDidMount() {
    axios.get(jsonfile)
    .then((res) => {
        this.setState({ users: res.data.users })
    })
}  

addNew(newuser){
    var arr=this.state.users;
    arr.push(newuser);
    this.setState({
        users:arr
    });

}

saveUser=(newtext,i)=> {
var arr=this.state.users;
arr[i]=newtext;
this.setState({
    users:arr
})
    }

removeUser=(i)=>{
    var arr=this.state.users;
    arr.splice(i,1)  
  this.setState({
      users:arr
  });
}

    render(){
        return(
            <div className="container">
            <UserHeader />
            {!this.state.users && 
                <p>Loading ...</p>
            }

            {this.state.users && this.state.users.map((user,i) => {
                return <UserRow key={i} user={user} />
            })}
            
            </div>   
        );

    }
}