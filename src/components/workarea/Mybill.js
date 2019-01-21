import React from 'react';
import Billitems from './Billitems';
import { Link } from 'react-router-dom';
import './bill.css';
import Cookies from 'js-cookie';

class Mybill extends React.Component{

    state ={
        cartItem:[],
        total:0
    }

    componentDidMount(){
        var cacheId = Cookies.get('_cid');
        if(cacheId == null){
            this.setCookie();
        }
        setTimeout(() => {
            var KEY = Cookies.get("_cid");
            this.fetchCartItems(KEY);
        }, 500);
        setTimeout(() => {
            console.log(this.state.cartItem);
        }, 200);
    }
    setCookie(){
        var ran = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15)).toUpperCase();
        Cookies.set('_cid', ran, { expires: 7 });
    }

    fetchCartItems(key){
        fetch('/api/cart/showCart',{
            method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid":key
                }
            })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                
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
        fetch('/api/cart/cartItemRemove',{
            method : 'DELETE',
            body : JSON.stringify({product_id:productId}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid":key
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
        fetch('/api/cart/cartQty',{
            method : 'PUT',
            body : JSON.stringify({product_id:productId,operation:operation}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid":key
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

    Total(){
        var product_total=0;
        if(this.state.cartItem !== null){
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
        
        if(this.props.cartItem === undefined){
            var KEY = Cookies.get("_cid");
            this.fetchCartItems(KEY);
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

    INC_qty(context,product_id,qty){
        if(qty <= 9){
            var KEY = Cookies.get("_cid");
            this.changeQuantity(KEY,product_id,"INC");
        }
        
    }
    DEC_qty(context,product_id,qty){
        if(qty > 1){
            var KEY = Cookies.get("_cid");
            this.changeQuantity(KEY,product_id,"DEC");
        }
    }
    REMOVE_item(context,product_id){
        var KEY = Cookies.get("_cid");
        console.log(product_id);
        this.deleteCartItems(KEY,product_id);
    }
    clearCart(){
        var key = Cookies.get("_cid");
        fetch('/api/cart/_cdel',{
            method : 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid":key
                }
            })
            .then(res => {
                if(res.status === 200){
                    console.log("deleted");
                    this.fetchCartItems();
                }else{
                    alert("Something went wrong!!")
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    
    render(){
        return(
            <div className="panel panel-info" style={{borderColor: '#ffdd00'}}>
                <div className="panel-heading" style={{color: '#000',backgroundColor: '#ffdd00',borderColor: '#ffdd00'}}><span style={{fontSize: '22px',fontWeight: '700'}}>Shopping Bag</span></div>
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
                        <button className="btn c_bill_btn" onClick={this.clearCart.bind(this)}>Clear Cart</button>
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