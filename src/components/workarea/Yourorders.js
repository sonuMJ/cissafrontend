import React from 'react';
import Contactinfo from '../headers/Contactinfo';
import Topnav from '../headers/Topnav';
import "./product.css";
import Cookies from 'js-cookie';
import Order from './Order';
import Logo from '../headers/Logo';
import Topnavsm from '../headers/Topnavsm';

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
        }else{
            this.props.history.push('/login');
        }
    }
    ShowOrderDetails(){
        // this.setState({
        //     loading:false
        // })
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
    goMobCart(){
        this.props.history.push('/cart');
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
        return(
            <React.Fragment>
                <Contactinfo />
                <div className="c_respo_nav-large">
                    <Logo/>
                    <Topnav addCart={this.goMobCart.bind(this)}/>
                </div>
                <div className="c_respo_nav-small">
                    <Topnavsm addCart={this.goMobCart.bind(this)}/>
                </div>
                <div className="container c_orders">
                <h1>My Orders</h1>
                {
                    this.state.loggedIn ?
                
                <div>
                    {
                    this.state.loading ? <div>
                    {
                        this.state.orderdata !== "" ? <Order parentProps={this}  refresh={this.RefreshOrder.bind(this)} orderdata={this.state.orderdata}/> : null
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