import React from 'react'
import './App.css';

export default class Users extends React.Component{

constructor(){
    super();
    this.state={
        editing:false,
    }
}

edit=()=>{
    this.setState({
    editing:true
    });

}

save=()=>{
    var newuser=this.refs.name.value;
    var newclass=this.refs.class.value;
    var newschool=this.refs.school.value;
    if(newuser.length<1 ||newclass.length<1 || newschool.length<1 ){
        alert('cant add empty name/class/school')
    }
    else{  
        this.props.saveuser(newuser,newclass,newschool,this.props.length);
        this.setState({
            editing:false
        });
    }
    
}

remove=()=>{
this.props.removeuser(this.props.index);
console.log(this.props.index);
}

renderThis=()=>{
    return (
      <div className="userContainer"> 
          {/*  <div className="userNameContainer" > {this.props.children} </div> <br/> */}
            <button onClick={this.edit} > edit</button>
            <button onClick={this.remove}> remove</button>
      </div>
    );
}

renderForm=()=>{
    return (
        <div className="userContainer"> 
        {/* <textarea ref="newText" defaultValue={this.props.children} /> <br/>  */}
        <input ref="name" type="text" placeholder="enter full_name here"/>
        <input ref="class" type="text" placeholder="enter class here"/>
        <input ref="school" type="text" placeholder="enter school here"/>
         <button onClick={this.save}> save</button>
        </div>
    );
}

    render(){
        return this.state.editing?this.renderForm():this.renderThis();

    }
}
