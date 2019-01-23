import React from 'react';
import Contactinfo from '../headers/Contactinfo';
import Topnav from '../headers/Topnav';
import "./product.css";
import Cookies from 'js-cookie';
import Order from './Order';
import Logo from '../headers/Logo';

class Yourorders extends React.Component{
    state = {
        loggedIn:false,
        orderdata:[],
        loading:false
    }
    componentDidMount(){
        var logged = this.CheckAuth();
        if(logged){
            this.setState({
                loggedIn:true
            })
            this.ShowOrderDetails();
        }
    }
    componentWillReceiveProps(){
        var logged = this.CheckAuth();
        if(logged){
            this.setState({
                loggedIn:true
            })
            this.ShowOrderDetails();
        }
    }
    ShowOrderDetails(){
        this.setState({
            loading:false
        })
        var token = Cookies.get("_token");
        var session = Cookies.get("sessionID");
        fetch("/api/order/orderbyid",{
            method:"POST",
            headers:{
                "token":token,
                "sessionid":session
            }
        })
        .then(res => {
            if(res.status === 200){
                return res.json();
            }else{
                this.setState({
                    loggedIn:false
                })
            }
        })
        .then(result => {
            this.setState({
                orderdata:result,
                loading:true
            })
        })
    }
    RefreshOrder(){
        this.ShowOrderDetails();
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
    CancelOrder(order_id){
        if(order_id !== ""){
            var token = Cookies.get("_token");
            var session = Cookies.get("sessionID");
            
            fetch("/api/order/cancelorder",{
                method:"POST",
                body:JSON.stringify({orderid:order_id}),
                headers:{
                    "Content-Type": "application/json",
                    "token":token,
                    "sessionid":session
                }
            })
            .then(res => res.json())
            .then(result => {
                this.ShowOrderDetails();
                alert(result.message);
                
            })
        }
        
    }

    render(){
        return(
            <React.Fragment>
                <Contactinfo />
                <Logo />
                <Topnav />
                <div className="container">
                <h1>My Orders</h1>
                {
                    this.state.loggedIn ?
                
                <div>
                    {
                    this.state.loading ? <div>
                    {
                        this.state.orderdata !== "" ? <Order refresh={this.RefreshOrder.bind(this)} orderdata={this.state.orderdata} cancelclick={this.CancelOrder.bind(this)}/> : null
                    }
                    </div>
                    :
                    <div style={{textAlign:'center',marginTop:'200px'}}>
                        <img src="../img/product_loader.gif" alt="loading_icon" />
                    </div>
                    }
                </div>
                :
                <div>
                    <h3 className="text-center">No orders Found!!</h3>
                </div>
                }
                
                
                    
                </div>
            </React.Fragment>
        )
    }
}


export default Yourorders;