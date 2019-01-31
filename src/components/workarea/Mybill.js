import React from 'react';
import Billitems from './Billitems';
import { Link } from 'react-router-dom';
import './bill.css';
import Cookies from 'js-cookie';

class Mybill extends React.Component{

    state ={
        cartItem:[],
        total:0,
        ShowWait:false,
        WaitMsg:'',
        storeloc:''
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
        var loc = Cookies.get('_loc');
        this.setState({
            storeloc:loc
        })
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
                
                this.setState({
                    cartItem:result.result,
                    ShowWait:false
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
        this.setState({
            ShowWait:true,
            WaitMsg:"Deleting Item"
        })
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
        this.setState({
            ShowWait:true,
            WaitMsg:"Updating quantity"
        })
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
               // console.log(this.state.cartItem);
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
                    this.fetchCartItems();
                }else{
                    alert("Something went wrong!!")
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    goCart(){
        this.props.redirecttocart();
    }
    handleLocation(e){
        //this.props.selectLocation()
        this.props.selectLocation(e.target.value)
    }
    
    render(){
        return(
            <div>
                
                <div className="panel panel-info" style={{borderColor: '#ddd',boxShadow: '0px 1px 24px -9px'}}>
                    <div className="panel-heading" style={{color: '#000',backgroundColor: '#ffdd00',borderColor: '#ffdd00'}}><span style={{fontSize: '22px',fontWeight: '700'}}>Shopping Cart</span></div>
                    <div className="">
                        <div className="c_cart_items">
                        {
                            this.state.ShowWait ? <Popup msg={this.state.WaitMsg}/> : null
                        }
                        {/* <Popup /> */}
                        {
                            this.state.cartItem != null ? <Billitem cartdata={this.state.cartItem} removeaction={this.REMOVE_item.bind(this)} inc={this.INC_qty.bind(this)} dec={this.DEC_qty.bind(this)}/> : <p className="empty-cart">Your Cart is Empty</p>
                        }
                        </div>
                        {
                            this.state.cartItem != null ? <TotalTemp totalprice={this.state.total}/> : ''
                        }
                        <p className="text-center" style={{marginTop:'5px'}}>
                            <b>Store Locator:{this.state.storeloc}</b>&nbsp;
                            <select onChange={this.handleLocation.bind(this)} name="location">
                                <option value="">&nbsp;</option>
                                <option value="Vazhuthacaud">Vazhuthacaud</option>
                                <option value="Kazhakoottam">Kazhakoottam</option>
                            </select>
                        </p>
                        <span style={{marginTop:"20px"}}>
                            <button className="btn c_bill_btn" onClick={this.clearCart.bind(this)}>Clear Cart</button>
                            <button className="btn c_bill_btn" style={{backgroundColor:"#ffdd00"}} onClick={this.goCart.bind(this)}>CHECK OUT</button>
                        </span>
                    </div>
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
            <p className="text-center"><span style={{fontSize:'24px'}}>Total</span>&nbsp;&nbsp;&#8377;<span style={{fontSize:'36px',fontWeight:'500'}}>{t.totalprice}</span></p>
        </div>
    )
}

const Popup = (msg) => {
    return(
        <div className="popup">
                <div className="popup-inner-cart">
                    <p className="text-center" style={{marginTop: '20px',fontSize: '22px'}}>{msg.msg}</p>
                </div>
            </div>
    )
}
export default Mybill;