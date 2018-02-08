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
    var text=this.refs.newText.value;
    if(text.length<1){
        alert('cant add empty name')
    }
    else{
        this.props.saveuser(text,this.props.index);
        this.setState({
            editing:false
        });
    }
    
}

remove=()=>{
this.props.removeuser(this.props.index);
}

renderNormal=()=>{
    return (
      <div className="userContainer"> 
            <div className="userNameContainer" > {this.props.children} </div> <br/>
            <button onClick={this.edit} > edit</button>
            <button onClick={this.remove}> remove</button>
      </div>
    );
}

renderForm=()=>{
    return (
        <div className="userContainer"> 
         <textarea ref="newText" defaultValue={this.props.children} /> <br/>
         <button onClick={this.save} > save</button>
        </div>
    );
}

    render(){
        return this.state.editing?this.renderForm():this.renderNormal();

    }
}
