import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './cart.css';
import Cartitem from './Cartitem';
import Cookies from 'js-cookie';

class Cartpage extends React.Component{
    state = {
        cart:[],
        total:0
    }
    fetchCartItems(key){
        fetch('http://localhost:5000/api/cart/showCart',{
            method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid": key
                }
            })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    cart:result.result
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
            body : JSON.stringify({product_id:productId}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid": key
                }
            })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                this.fetchCartItems(key)
            })
            .catch(e => {
                console.log(e);
            })
    }
    changeQuantity(key,productId,operation){
        fetch('http://localhost:5000/api/cart/cartQty',{
            method : 'PUT',
            body : JSON.stringify({product_id:productId,operation:operation}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid": key
                }
            })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                this.fetchCartItems(key);
            })
            .catch(e => {
                console.log(e);
            })
    }
    componentDidMount(){
        var Key = Cookies.get("_cid");
        this.fetchCartItems(Key);
        setTimeout(() => {
            console.log(this.state.cart);
            
        }, 100);
    }
    Total(){
        var product_total=0;
        if(this.state.cart != null){
            this.state.cart.map(i => {
                product_total += parseInt(i.total)
            })
            console.log(product_total);
            this.setState({
                total:product_total
            })
        }
        
    }
    removeCartItem(id, product_id){
        var Key = Cookies.get("_cid");
        this.deleteCartItems(Key,product_id)
    }
    INC_QTY(context,product_id){
        var Key = Cookies.get("_cid");
        this.changeQuantity(Key,product_id,"INC");
    }
    DEC_QTY(context, product_id){
        var Key = Cookies.get("_cid");
        this.changeQuantity(Key,product_id,"DEC");
    }
    render(){
        var C = this.state.cart;
        return(
            <div className="container">
                <div className="col-lg-1">

                </div>
                <div className="col-lg-10">
                    <h2 style={{fontSize:'34px'}}>Your Shopping Cart <Link to={'/confirmorder'} style={{float:'right'}} className="cart-confirm-btn">Confirm Order</Link></h2>
                    <table className="table table-responsive table-hover cart-table">
                        <tbody>
                            {
                                Object.keys(C).map((item,k) =>{
                                    return(
                                        <Cartitem cartdata={C[item]} inc={this.INC_QTY.bind(this)} dec={this.DEC_QTY.bind(this)} remove={this.removeCartItem.bind(this)} key={k}/>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="cart-table-totalrow">
                        <div className="col-lg-8 text-right" style={{marginTop:'16px'}}>Total Price</div>
                        <div className="col-lg-4 text-center">&#8377;<span className="cart-table-totalprice">{this.state.total}</span></div>
                    </div>
                    {/* <div style={{marginTop:'50px',float:'right'}}>
                        <Link to={'/confirmorder'} className="cart-confirm-btn">Confirm Order</Link>
                    </div> */}
                </div>
                <div className="col-lg-1">

                </div>
            </div>
        )
    }
}

export default Cartpage;