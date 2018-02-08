import React from 'react'
import Users from './Users';

const jsonfile='http://localhost/C:/Users/lappy/Desktop/testapp/testing-two/src/userdata.json';

export default class UsersLogic extends React.Component{
    constructor(){
        super();
        this.state={
            users:[]
        }
    }
   
componentWillMount() {
    fetch(jsonfile)
    .then((res)=>{res.json()
    }).then((data)=> {
        this.setState({
            users:data
        });
    }).catch((err)=>{
        console.log(err)
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
            <div>
            <div><button onClick={this.addNew.bind(this,'Default user name')} > Add new User</button> </div>
            <div> 
                {this.state.users.map((userslist,i)=> {
                    return <Users key={i} index={i} removeuser={this.removeUser} saveuser={this.saveUser}>
                    {userslist}
                    </Users >
                } )
                }
            </div> 
            </div>   
        );

    }
}