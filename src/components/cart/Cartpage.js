import React from 'react';
import './cart.css';
import Cartitem from './Cartitem';
import Cookies from 'js-cookie';
import Contactinfo from '../headers/Contactinfo';
import Searchbar from '../headers/Searchbar';
import Topnav from '../headers/Topnav';
import {Link} from 'react-router-dom';
import Logo from '../headers/Logo';
import Topnavsm from '../headers/Topnavsm';

class Cartpage extends React.Component{
    state = {
        cart:[],
        total:0,
        confirmplace:true,
        ShowWait:false,
        WaitMsg:'sdasdsd',
        showModal:false,
        unavailable:[],
        loading:true
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
                    ShowWait:false,
                    loading:false
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
    changeQuantity(key,productId,operation,qty){
        this.setState({
            ShowWait:true,
            WaitMsg:"Updating quantity"
        })
        fetch('/api/cart/cartQty',{
            method : 'PUT',
            body : JSON.stringify({product_id:productId,operation:operation,quantity:qty}),
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
            this.changeQuantity(Key,product_id,"INC",null);
        }
    }
    DEC_QTY(context, product_id, qty){
        if(qty > 1){
            var Key = Cookies.get("_cid");
            this.changeQuantity(Key,product_id,"DEC",null);
        }
    }
    MANUAL_qty(context,product_id,qty){
        var KEY = Cookies.get("_cid");
        this.changeQuantity(KEY,product_id,"MANUAL",qty);
    }
    orderItem(){
        var Key = Cookies.get("_cid");
        fetch("/api/product/checkavailability",{
            headers:{
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                "_cid": Key
            },
            method:'POST'
        })
        .then(res => res.json())
        .then(result => {
            if(result.length > 0){
                console.log("Some update found");
                
                console.log(result);
                this.setState({
                    unavailable:result,
                    showModal:true
                })
            }else{
                console.log("no update");
                setTimeout(() => {
                    var loggedin = this.CheckAuth();
                    if(loggedin) {
                        //check for blacklisted and process
                        this.checkBlacklist();
                    
                    }else{
                        this.props.history.push('/login/co');
                    }
                }, 100); 
            }
        })
        


        //if AUTH is empty => login else => confirmorder
        // var loggedin = this.CheckAuth();
        // if(loggedin) {
        //     //check for blacklisted and process
        //     this.checkBlacklist();
           
        // }else{
        //     this.props.history.push('/login/co');
        // }
    }
    checkBlacklist(){
        var token = Cookies.get("_token");
        var session = Cookies.get("sessionID");
        fetch("/api/user/getallblacklistbyuserid",{
            headers:{
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                "token": token,
                "sessionid":session
            },
            method:'POST'
        })
        .then(res => {
            if(res.status == 423){
                this.props.history.push('/locked');
            }else if(res.status == 200){
                this.props.history.push('/confirmOrder');
            }else if(res.status == 401){
                alert("Unauthorized User!!");
                Cookies.remove('_token', { path: '' });
                Cookies.remove('sessionID', { path: '' });
                this.props.history.push('/');
            }
        })
            
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
    goMobCart(){
        this.props.history.push('/cart');
    }

    closeModal(){
        this.setState({
            showModal : !this.state.showModal
        })
    }
    continuePurchase(){
        console.log(this.state.unavailable);
        var key = Cookies.get("_cid");
        if(this.state.unavailable !== ""&&key !== undefined){
            this.state.unavailable.map(item => {
               console.log(item.productId);
               this.deleteCartItems(key, item.productId)
            })
            this.closeModal();
            setTimeout(() => {
                var loggedin = this.CheckAuth();
                if(loggedin) {
                    //check for blacklisted and process
                    this.checkBlacklist();
                
                }else{
                    this.props.history.push('/login/co');
                }
            }, 100);  
        }
        
        //this.deleteCartItems(key,productId);
    }

    goMobCart(){
        var location = Cookies.get("_loc");
        if(location != undefined){
            //go to cart
            console.log("go to cart");
            this.props.history.push('/cart');
        }else{
            this.setState({
                locationPopup : true
            })
        }
    }

    render(){
        var C = this.state.cart;
        return(
            <React.Fragment>
                {
                    this.state.showModal ? <Showmodal continuePurchase={this.continuePurchase.bind(this)} data={this.state.unavailable} closebtn={this.closeModal.bind(this)}/> : null
                }
                
                {/* {
                    this.state.confirmplace ?
                    <Confirmlocation confirm={this.confirmlocaion.bind(this)} cancel={this.cancelPurchase.bind(this)}/>
                    :
                    null
                } */}
                <Contactinfo />
                <div className="c_respo_nav-large">
                    <Logo/>
                    <Topnav addCart={this.goMobCart.bind(this)}/>
                </div>
                <div className="c_respo_nav-small">
                    <Topnavsm addCart={this.goMobCart.bind(this)}/>
                </div>
                {
                    this.state.ShowWait ? <Popup msg={this.state.WaitMsg}/> : null
                }
                <div className="container c_cart_show_table_view">
                    <div className="col-lg-1">

                    </div>
                    <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12">
                        <h4><span style={{fontSize:'22px'}}><Link to={'/'} style={{color:'#7ac142'}}><img src={'./img/back_arrow.png'}/>Back</Link></span></h4>
                        <h2 style={{fontSize:'34px'}} className="c_cart_main_title">Your Shopping Cart 
                        {
                            C == null || C.length <= 0 ? 
                            null
                            :
                            <button style={{float:'right'}} className="cart-confirm-btn" onClick={this.orderItem.bind(this)}>Confirm Order</button>
                        }
                        </h2>
                        <table className="table table-responsive table-hover cart-table">
                            <tbody>
                                {
                                    this.state.loading ? 
                                    <tr className="cart-table-tr">
                                        <td colSpan='5' style={{fontSize: '18px',textAlign: 'center'}}>
                                            <h2 style={{fontWeight:'900'}}>Loading...</h2>
                                        </td>
                                    </tr>
                                    :
                                    <React.Fragment>
                                    {
                                        C == null|| C.length <= 0 ? <CartEmpty /> : <ShowCart cart={C} inc={this.INC_QTY.bind(this)} dec={this.DEC_QTY.bind(this)} dropdown={this.MANUAL_qty.bind(this)} remove={this.removeCartItem.bind(this)}/>
                                    }
                                    </React.Fragment>
                                }
                                
                            </tbody>
                        </table>
                        <div className="cart-table-totalrow">
                            
                            <div className="col-lg-8 col-md-8 col-sm-6 col-xs-6 text-right" style={{marginTop:'16px'}}>Total Price</div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 text-center">&#8377;<span className="cart-table-totalprice">{this.state.total}</span></div>
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
                    <Cartitem cartdata={C[item]} inc={cart.inc.bind(this)} dec={cart.dec.bind(this)} dropdown={cart.dropdown.bind(this)} remove={cart.remove.bind(this)} key={k}/>
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
            
            <td colSpan='5' style={{fontSize: '18px',textAlign: 'center'}}>
                <img src="./img/empty_cart.png"/>
                <h2 style={{fontWeight:'900'}}>Cart is empty</h2>
                <h4 style={{fontWeight:'400'}}>Click <Link to={"/"}>here</Link> to continue shopping</h4>
            </td>
        </tr>
    )
}

const Popup = (msg) => {
    return(
        <div className="popup">
                <div className="popup-inner-cart">
                    <p className="text-center popup-inner-cart-text" >{msg.msg}</p>
                </div>
            </div>
    )
}

const Showmodal = (modal) => {
    var data = modal.data;
    return(
        <div id="myModal" className="modal_c">
            <div className="modal-content_c">
                <div className="modal-header_c">
                    <span className="close_c" onClick={modal.closebtn.bind(this)}>&times;</span>
                    <h2>These item(s) are currently not available</h2>
                </div>
                <div className="modal-body_c">
                    {
                        data.map((item,i) => {
                            return(<Itemtemplate itemdetail={item.productData} key={i}/>)
                        })
                    }
                </div>
                <div className="modal-footer_c">
                    <button className="btn c_btn_un" onClick={modal.continuePurchase.bind(this)}>Continue</button>
                </div>
            </div>
        </div>
    )
}
const Itemtemplate = (data) => {
    var itemData = data.itemdetail[0];
    return(
        <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4" >
                <img src={itemData.img_url} alt={itemData.name} className="img-responsive"/>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
                <h4 style={{marginTop: '12px',marginBottom: '2px'}}>{itemData.name}</h4>
                <i style={{color:'#8e8e8e'}}>{itemData.product_id}</i>
            </div>
        </div>
    )
}

export default Cartpage;