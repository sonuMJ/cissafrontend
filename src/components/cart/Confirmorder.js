import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Confirmorder extends React.Component{
    state = {
        success:false,
        emptyData:true,
        popup:false,
        timeOutInterval:null
    }
    componentDidMount(){
        this.timeOutError = setInterval(()=>{this.setState({popup:true})},15000)
        var logged = this.CheckAuth();
        if(!logged){
            alert("You need to login to visit this page!!");
            clearInterval(this.state.timeOutInterval)
            this.props.history.push('/login/co');
        }else{
                this.getAllProductByCartId();
                setTimeout(() => {
                    
                    if(!this.state.emptyData){
                        this.submitOrders();
                    }
                }, 500); 
            
        }
        //cart id
        //user id 
        //
        //this.submitOrders();
        
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
    
    getAllProductByCartId(){
        var key = Cookies.get('_cid');
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
                setTimeout(() => {
                    if(result.result == null || result.result.length <= 0){
                        
                        this.props.history.push('/');
                    }else{
                        this.setState({
                            emptyData:false
                        })
                        
                    }  
                }, 100);
                
            })
            .catch(e => {
                console.log(e);
            })
    }
    submitOrders(){
        var cartId = Cookies.get('_cid');
        var token = Cookies.get('_token');
        var session = Cookies.get('sessionID');
        if(cartId !== undefined && token !== undefined && session !== undefined){
            fetch('/api/product/orderproducts',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                "_cid": cartId,
                "token": token,
                "sessionid":session
            }
            })
            .then(res => {
                if(res.status === 200){
                    return res.json();
                }else{
                    alert("You are not authorised to confirm orders. Please login again!!!");
                    Cookies.remove('_token', { path: '' });
                    Cookies.remove('sessionID', { path: '' });
                    this.props.history.push('/login');
                }
            })
            .then(result => {
                if(result.statuscode === 200){
                    clearInterval(this.timeOutError)
                    this.setState({
                        success:true,

                    })
                    Cookies.remove('_cid', { path: '' });
                }else{
                    this.setState({
                        popup:true
                    })
                }
            })
            .catch(e => console.log(e));
        }
        
    }

    schedulePickupDate(){
        const SCHEDULED_DAY = 1; //1 => monday
        var d = new Date();
        var sDate = new Date();
        var scheduledDate = sDate.setDate(d.getDate() + + (SCHEDULED_DAY - 1 - d.getDay() + 7) % 7 + 1);
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var s_date = new Date(scheduledDate); 
        var s_month = months[s_date.getMonth()];
        var full_s_date = s_date.getDate() + " " + s_month + " " +s_date.getFullYear();
        return full_s_date;
    }

    cancelFailedPurchase(){
        clearInterval(this.timeOutError);
        this.setState({
            popup: !this.state.popup
        })
        this.props.history.push('/');
    }
    render(){
        var sch_date  = this.schedulePickupDate();
        
        return(
            <React.Fragment>
                {
                    this.state.popup ? <FailedPopup cancel={this.cancelFailedPurchase.bind(this)} /> : null
                }
                {
                    !this.state.success ? <Processing /> : <ProcessSuccess s_date={sch_date}/>
                }
            </React.Fragment>
        )
    }
}
const Processing = () => {
    return(
        <div className="container cart-loading">
            <h1 className="text-center">Your order is Processing</h1>
            <h2 className="text-center">Please wait...</h2>
            <h4 className="text-center" style={{marginLeft: '-18px',marginTop: '24px'}}><img src="./img/loader1.gif" alt="loading_icon"/></h4>
        </div>
    )
}
const ProcessSuccess = (p) => {
    return(
        <div className="container cart-loading-success">
            <h1 className="text-center">Successfully Purchased</h1>
            <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark-circle" fill="none" cx="26" cy="26" r="25" />
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <div className="text-center">
                <Link to={'/'} style={{color: '#7ac142',fontSize: '26px',fontWeight: '200'}}>Continue Shopping</Link>
                <div style={{paddingTop:'20px'}}>
                    <Link to={'/yourorders'} style={{color: '#7ac142',fontSize: '20px',fontWeight: '200'}}>Your orders</Link>
                </div>
                <div className="alert alert-danger" style={{width: '50%',margin: 'auto',marginTop: '22px',fontSize: '20px'}}>
                    <strong>Scheduled pickup date : </strong><p className="alert-link">{p.s_date}</p>
                </div>
            </div>
        </div>
    )
}

const FailedPopup = (p) => {
    return(
        <div className="popup">
        <div className="popup-inner">
            <div style={{padding: '4px 22px',borderBottom:' 5px solid #4e9cff',textAlign:'center'}}>
                <h2 style={{color:'#4e9cff'}}>Something went wrong!!</h2>
            </div>
            <div style={{padding:' 14px 22px',fontSize: '18px',textAlign:'center'}}>
                <p>Please try agin later</p>
            </div>
            
            <div style={{textAlign:'center',paddingTop: '30px'}}>
                <button className="btn btn-popup" onClick={p.cancel.bind(this)}>OK</button>
            </div>
        </div>
    </div>
    )
}
export default Confirmorder;