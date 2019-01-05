import React from 'react';
import Billitems from './Billitems';
import { Link } from 'react-router-dom';
import './bill.css';

class Mybill extends React.Component{

    state ={
        cartItem:[],
        total:0
    }

    componentDidMount(){
        this.fetchCartItems(5);
        setTimeout(() => {
            console.log(this.state.cartItem);
        }, 100);
    }

    fetchCartItems(key){
        fetch('http://localhost:5000/api/cart/showCart',{
            method : 'POST',
            body : JSON.stringify({key : key}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    cartItem:result.result
                })
                setTimeout(() => {
                    this.Total();
                }, 100);
            })
            .catch(e => {
                console.log(e);
            })
    }
    deleteCartItems(key,productId){
        fetch('http://localhost:5000/api/cart/cartItemRemove',{
            method : 'DELETE',
            body : JSON.stringify({key : key,product_id:productId}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                this.fetchCartItems(5)
            })
            .catch(e => {
                console.log(e);
            })
    }
    changeQuantity(key,productId,operation){
        fetch('http://localhost:5000/api/cart/cartQty',{
            method : 'PUT',
            body : JSON.stringify({key : key,product_id:productId,operation:operation}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                this.fetchCartItems(5);
            })
            .catch(e => {
                console.log(e);
            })
    }

    Total(){
        var product_total=0;
        if(this.state.cartItem != null){
            this.state.cartItem.map(i => {
                product_total += parseInt(i.total)
            })
            console.log(product_total);
            this.setState({
                total:product_total
            })
        }
        
    }

    componentWillReceiveProps(){
        
        if(this.props.cartItem == undefined){
            this.fetchCartItems(5);
        }else{
            setTimeout(() => {
                this.setState({
                    cartItem:this.props.cartitems
                })
            }, 100);
            setTimeout(() => {
                console.log(this.state.cartItem);
            }, 200);
        }
        
    }

    INC_qty(context,product_id){
        this.changeQuantity(5,product_id,"INC");
    }
    DEC_qty(context,product_id){
        this.changeQuantity(5,product_id,"DEC");
    }
    REMOVE_item(context,product_id){
        console.log(product_id);
        this.deleteCartItems(5,product_id);
    }
    
    render(){
        return(
            <div className="panel panel-info">
                <div className="panel-heading">MY BILL</div>
                <div className="">
                    <div className="c_cart_items">
                    {
                        this.state.cartItem != null ? <Billitem cartdata={this.state.cartItem} removeaction={this.REMOVE_item.bind(this)} inc={this.INC_qty.bind(this)} dec={this.DEC_qty.bind(this)}/> : <p className="empty-cart">Your Cart is Empty</p>
                    }
                    </div>
                    {
                        this.state.cartItem != null ? <TotalTemp totalprice={this.state.total}/> : ''
                    }
                    <span style={{marginTop:"20px"}}>
                        <button className="btn c_bill_btn">Clear Cart</button>
                        <button className="btn c_bill_btn" style={{backgroundColor:"#ffdd00"}}><Link to={"/cart"} style={{textDecoration:'none'}}>CHECK OUT</Link></button>
                    </span>
                </div>
            </div>
        )
    }
}
const Billitem = (data) => {
    
    return(
        data.cartdata.map(item => {
            return(
               <Billitems itemDetail={item} remove={data.removeaction.bind(this)} increment={data.inc.bind(this)} decrement={data.dec.bind(this)} key={item.productId}/>
            )
        })
    )
}
const TotalTemp = (t) => {
    return(
        <div className="c_cart_totalbill">
            <p className="text-center"><span>Total</span>&nbsp;&nbsp;&#8377;<span style={{fontSize:'20px',fontWeight:'500'}}>{t.totalprice}</span></p>
        </div>
    )
}
export default Mybill;