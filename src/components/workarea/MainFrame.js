import React from 'react';
import Categorylist from './Categorylist';
import Mybill from './Mybill';
import Listitems from './Listitems';
import './product.css';
import Cookies from 'js-cookie';

class Mainframe extends React.Component{
    state = {
        products:[],
        cart:[],
        isFetching : false
    }
    componentDidMount(){
        this.fetchData();
        
    }

    fetchData(){
        fetch('http://localhost:5000/product/getall')
        .then(res => res.json())
        .then(result => {
            this.setState({
                products:result,
                isFetching: true
            })
        })
    }

    addToCart(product_ID, product_item, qty){
        var key = 5 ;
        fetch('http://localhost:5000/api/cart/addCart',{
            method:'POST',
            body : JSON.stringify({key: key, product_id:product_ID}),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        .then(res => res.json())
        .then(result => {
            alert(result.message);
            setTimeout(() => {
                this.fetchCartItems(key)
            }, 100);
        })
        .catch(e => {
            console.log(e);
        })
        
    }
    removeCartItem(prod_id){

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
    render(){
        
        return(
            <div className="container-fluid">
                <div className="col-lg-2 col-md-2">
                    <Categorylist />
                </div>
                <div className="col-lg-8 col-md-8">
                {
                    this.state.isFetching ? <Listitems productlist={this.state.products} addtocart={this.addToCart.bind(this)}/> : "Loading...."
                }
                </div>
                <div className="col-lg-2 col-md-2">
                    <Mybill cartitems={this.state.cart} removeCartItem={this.removeCartItem.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default Mainframe;