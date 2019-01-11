import React, { Component } from 'react';
import Contactinfo from '../headers/Contactinfo';
import Searchbar from '../headers/Searchbar';
import Topnav from '../headers/Topnav';
import "./product.css";
import Cookies from 'js-cookie';
import Order from './Order';

class Yourorders extends React.Component{
    state = {
        loggedIn:false,
        orderdata:[]
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
    ShowOrderDetails(){
        var token = Cookies.get("_token");
        var session = Cookies.get("sessionID");
        fetch("http://localhost:5000/api/order/orderbyid",{
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
                orderdata:result
            })
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

    render(){
        return(
            <React.Fragment>
                <Contactinfo />
                <Searchbar />
                <Topnav />
                <div className="container">
                <h1>My Orders</h1>
                    {
                        this.state.loggedIn&&this.state.orderdata != "" ? <Order orderdata={this.state.orderdata}/> : <h3 className="text-center">No orders Found!!</h3>
                    }
                </div>
            </React.Fragment>
        )
    }
}


export default Yourorders;