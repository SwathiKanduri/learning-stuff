import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import PropTypes from 'prop-types';
import './App.css';


const btn_style={
    cursor:"pointer"
}
 
var subtotal=0; 

export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={ count:1, total_val:0, 
        }
    }
    
   /* componentDidMount() {
        this.setState(prevState => {
          return {sub_total : prevState.sub_total + 1 }
         });
     }  */

    addOne() {                                                       // adds one item when button clicked                                  
            this.setState(prevState => {
          return {count : prevState.count + 1 }
         });
        }
    
       removeOne() {                                                 // removes one item when button clicked
        this.setState(prevState => {
            if(prevState.count>=1) {
          return { count : prevState.count - 1 }
            }
            else{
                alert('quantity cant be less than zero')
            }
         });
       }

   
    calc=()=>{
            subtotal= Number(this.props.price * this.state.count).toFixed(2);
            console.log('subtotal is '+subtotal);
            return subtotal;
          }
        
     calctotal=()=>{
            var total=subtotal;
            this.setState((prevState)=> {
              return{total_val:prevState.total_val+total}  
            });

          }


    render(){
        return(
            <div>
                <Table >
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                        <TableRow>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        <TableRow >
                            <TableRowColumn><img src={this.props.src} className="zoom" />  </TableRowColumn>
                            <TableRowColumn >{this.props.name}<br/> {this.props.description}</TableRowColumn>
                            <TableRowColumn id="price_row" >Price per each item:<br/> {this.props.price} <br/>
                                <p> subtotal is: </p><span id="show_sub" >{ this.calc()}  </span>
                                
                            </TableRowColumn>
                            <TableRowColumn>
                                <input style={btn_style} type='button' onClick={this.addOne.bind(this)} value='add an item'/>
                                <input style={btn_style} type='button' onClick={this.removeOne.bind(this)} value='remove an item'/>
                                <br/> <div> quantity: </div> <div id="qty_div" > {this.state.count}  </div> 
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

Product.propTypes={
    name:PropTypes.string,
    price:PropTypes.number,
    description:PropTypes.string,

};