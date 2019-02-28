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
        orders:[],
        orderids:[],
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
                orders:result,
                loading:true
            })
            this.showChild();
        })
    }
    showChild(){
        setTimeout(() => {
            if(this.state.orders != ""){
                var _s = new Set();
                this.state.orders.map(i => {
                    
                    _s.add(i.orderid);
                })
                this.setState({
                    orderids:_s
                })
                // setTimeout(() => {
                //     console.log(this.state.orderids);
                    
                // }, 100);
                
            }else{

            }
        }, 200);
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
            this.props.history.push('/cart');
        }else{
            this.setState({
                locationPopup : true
            })
        }
    }

    render(){
        var parent = [];
            var orderss = Array.from(this.state.orderids).map(j => {
                    var child = [];
                    this.state.orders.map(i => {
                        if(j == i.orderid){
                            //child.push(i);
                            child.push(i)
                        }
                    })
                    //console.log(child);
                    parent.push(child);
                    
                })
        
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
                        this.state.orderdata !== "" ? 
                        <React.Fragment>
                            {
                                parent != "" ?
                                <Order parentProps={this}  refresh={this.RefreshOrder.bind(this)} orderdata={parent}/>
                                :
                                <div style={{textAlign:'center',marginTop:'200px'}}>
                                    <img src="../img/product_loader.gif" alt="loading_icon" />
                                </div>
                            }
                        </React.Fragment>
                        //
                        :
                        <h3 className="text-center">No orders Found!!</h3>
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