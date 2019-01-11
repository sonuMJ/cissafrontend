import React from 'react';
import Categorylist from './Categorylist';
import Mybill from './Mybill';
import Listitems from './Listitems';
import './product.css';
import Cookies from 'js-cookie';
import Contactinfo from '../headers/Contactinfo';
import Carosel from '../headers/Carosel';
import Searchbar from '../headers/Searchbar';
import Topnav from '../headers/Topnav';

class Mainframe extends React.Component{
    state = {
        products:[],
        cart:[],
        isFetching : false,
        category: 'all'
    }
    componentDidMount(){
        this.fetchData(this.state.category);
    }

    componentWillReceiveProps(){
        
    }

    fetchData(cate){
        fetch('http://localhost:5000/product/getall/'+ cate)
        .then(res => res.json())
        .then(result => {
            this.setState({
                products:result,
                isFetching: true
            })
        })
    }

    addToCart(product_ID, product_item, qty){
        var Key = Cookies.get("_cid");
        fetch('http://localhost:5000/api/cart/addCart',{
            method:'POST',
            body : JSON.stringify({product_id:product_ID}),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                "_cid":Key
            }
        })
        .then(res => res.json())
        .then(result => {
            alert(result.message);
            setTimeout(() => {
                this.fetchCartItems(Key)
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
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid":key
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

    Choosecategory(cate){
        this.fetchData(cate);
    }

    render(){
        
        return(
            <React.Fragment>
                <Contactinfo />
                <Searchbar />
                <Topnav />
                <Carosel />
                <div className="container-fluid show-products">
                    <div className="col-lg-2 col-md-2">
                        <Categorylist selectcat={this.Choosecategory.bind(this)}/>
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
            </React.Fragment>
            
        )
    }
}

export default Mainframe;