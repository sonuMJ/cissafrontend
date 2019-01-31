import React from 'react';
import './cart.css';
import Cartitem from './Cartitem';
import Cookies from 'js-cookie';
import Contactinfo from '../headers/Contactinfo';
import Searchbar from '../headers/Searchbar';
import Topnav from '../headers/Topnav';
import {Link} from 'react-router-dom';

class Cartpage extends React.Component{
    state = {
        cart:[],
        total:0,
        confirmplace:true,
        ShowWait:false,
        WaitMsg:''
    }
    fetchCartItems(key){
        fetch('/api/cart/showCart',{
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
                    cart:result.result,
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

        var loc = Cookies.get("_loc");
        if(loc !== undefined){
            var Key = Cookies.get("_cid");
            this.fetchCartItems(Key);
            setTimeout(() => {
                this.setState({
                    confirmplace:true
                })
            }, 100);
        }else{
            alert("You must choose store location to continue!!");
            this.props.history.push('/');
        }
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

    Agreement(e){
        console.log(e.target.checked);
    }

    confirmlocaion(){
        this.setState({
            confirmplace: !this.state.confirmplace
        })
    }

    cancelPurchase(){
        this.props.history.push('/');
    }

    render(){
        var C = this.state.cart;
        
        return(
            <React.Fragment>
                {/* {
                    this.state.confirmplace ?
                    <Confirmlocation confirm={this.confirmlocaion.bind(this)} cancel={this.cancelPurchase.bind(this)}/>
                    :
                    null
                } */}
                <Contactinfo />
                <Searchbar />
                <Topnav />
                {
                    this.state.ShowWait ? <Popup msg={this.state.WaitMsg}/> : null
                }
                <div className="container">
                    <div className="col-lg-1">

                    </div>
                    <div className="col-lg-10">
                        <h4><span style={{fontSize:'22px'}}><Link to={'/'} style={{color:'#7ac142'}}><img src={'./img/back_arrow.png'}/>Back</Link></span></h4>
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
                        {/* <div class="alert alert-danger" style={{color:'#000',marginTop:'30px'}}>
                            <strong>Warning!</strong> You should read this message
                            <div class="checkbox">
                                <label><input type="checkbox" name="agreement" onClick={this.Agreement.bind(this)}/>Option 1</label>
                            </div>
                        </div> */}
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

const Confirmlocation = (p) => {
    
    return(
        <div className="popup">
            <div className="popup-inner">
                <div style={{padding: '4px 22px',borderBottom:' 5px solid #4e9cff',textAlign:'center'}}>
                    <h2 style={{color:'#4e9cff'}}>Confirm Location</h2>
                </div>
                <div style={{padding:' 14px 22px',fontSize: '18px',textAlign:'center'}}>
                    <p>Delivery only available in trivandrum</p>
                </div>
                
                <div style={{textAlign:'center',paddingTop: '30px'}}>
                    <button className="btn btn-popup" onClick={p.confirm.bind(this)}>Continue</button>
                    <h4 className="text-center cart-popup-cancel" onClick={p.cancel.bind(this)}>Cancel</h4>
                </div>
            </div>
        </div>
    )
}

const CartEmpty = () =>{
    return(
        <tr className="cart-table-tr">
            <td colSpan='5' style={{fontSize: '18px',textAlign: 'cente'}}>Your cart is empty</td>
        </tr>
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

export default Cartpage;