import React, { Component } from 'react';
import './cart.css';
import Cartitem from './Cartitem';

class Cartpage extends React.Component{
    state = {
        cart:[]
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
                    cart:result.result
                })
            })
            .catch(e => {
                console.log(e);
            })
    }
    componentDidMount(){
        this.fetchCartItems(5);
        setTimeout(() => {
            console.log(this.state.cart);
            
        }, 100);
    }
    render(){
        var C = this.state.cart;
        return(
            <div className="container">
                <div className="col-lg-1">

                </div>
                <div className="col-lg-10">
                    <h2 style={{fontSize:'34px'}}>Your Shopping Cart</h2>
                    <table className="table table-responsive table-hover cart-table">
                        <tbody>
                            {
                                Object.keys(C).map((item,k) =>{
                                    return(
                                        <Cartitem cartdata={C[item]} key={k}/>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-1">

                </div>
            </div>
        )
    }
}

export default Cartpage;