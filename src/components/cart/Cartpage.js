import React, { Component } from 'react';
import './cart.css';
import Cartitem from './Cartitem';
import Cookies from 'js-cookie';
import Contactinfo from '../headers/Contactinfo';
import Searchbar from '../headers/Searchbar';
import Topnav from '../headers/Topnav';

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
            this.setState({
                total:product_total
            })
        }
        
    }
    removeCartItem(id, product_id){
        var Key = Cookies.get("_cid");
        this.deleteCartItems(Key,product_id)
    }
    INC_QTY(context,product_id, qty){
        if(qty <= 9){
            var Key = Cookies.get("_cid");
            this.changeQuantity(Key,product_id,"INC");
        }
    }
    DEC_QTY(context, product_id, qty){
        if(qty > 1){
            var Key = Cookies.get("_cid");
            this.changeQuantity(Key,product_id,"DEC");
        }
    }
    orderItem(){
        //if AUTH is empty => login else => confirmorder
        var loggedin = this.CheckAuth();
        if(loggedin) {
            this.props.history.push('/confirmOrder');
        }else{
            this.props.history.push('/login/co');
        }
    }
    CheckAuth(){
        var token = Cookies.get("_token");
        var session = Cookies.get("sessionID");
        if(token !== undefined&&session !== undefined){
            return true;
        }else{
            return false;
        }
    }
    render(){
        var C = this.state.cart;
        
        return(
            <React.Fragment>
                <Contactinfo />
                <Searchbar />
                <Topnav />
                <div className="container">
                    <div className="col-lg-1">

                    </div>
                    <div className="col-lg-10">
                        <h2 style={{fontSize:'34px'}}>Your Shopping Cart <button style={{float:'right'}} className="cart-confirm-btn" onClick={this.orderItem.bind(this)}>Confirm Order</button></h2>
                        <table className="table table-responsive table-hover cart-table">
                            <tbody>
                                {
                                    C == null ? <CartEmpty /> : <ShowCart cart={C} inc={this.INC_QTY.bind(this)} dec={this.DEC_QTY.bind(this)} remove={this.removeCartItem.bind(this)}/>
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
            </React.Fragment>
        )
    }
}

const ShowCart = (cart) =>{
    var C = cart.cart; 
    return(
        <React.Fragment>
            {
                Object.keys(C).map((item,k) =>{
                    return(
                    <Cartitem cartdata={C[item]} inc={cart.inc.bind(this)} dec={cart.dec.bind(this)} remove={cart.remove.bind(this)} key={k}/>
                    )
                })
            }
             
        </React.Fragment>
    )
}

const CartEmpty = () =>{
    return(
        <tr className="cart-table-tr">
            <td colSpan='5' style={{fontSize: '18px',textAlign: 'cente'}}>Your cart is empty</td>
        </tr>
    )
}
export default Cartpage;