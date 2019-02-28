import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Topnavsm extends React.Component{
    state = {
        authenticated:false,
        username:'User',
        cartCount:0
    }
    
    componentDidMount(){
        this.CheckAuth();
        setTimeout(() => {
            this.getUsername();
        }, 100);
        setTimeout(() => {
            this.getCartCount();
        }, 100);
        
        
    }
    componentWillReceiveProps(){
        this.CheckAuth();
        setTimeout(() => {
            this.getCartCount();
        }, 100);
        
    }
    
    
    getCartCount(){
        var _cart_id = Cookies.get('_cid');
        if(_cart_id != undefined){
            fetch('/api/cart/showCart',{
                method : 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        // "Content-Type": "application/x-www-form-urlencoded",
                        "_cid":_cart_id
                    }
                })
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        cartCount:result.result.length
                    })
                })
                .catch(e => {
                    //console.log(e);
                })
        }else{
            this.setState({
                cartCount:0
            })
        }
            
    }

    getUsername(){
        if(this.state.authenticated){
            var token = Cookies.get('_token');
            fetch('/api/user/getusernamebytoken',{
                headers:{
                    "token" : token
                }
            })
            .then(res => {
                if(res.status === 200){
                    return res.json();
                }
            })
            .then(result => {
               this.setState({
                   username:result.name
               })
            })
        }
    }

    CheckAuth(){
        var token = Cookies.get("_token");
        var session = Cookies.get("sessionID");
        if(token !== undefined&&session !== undefined){
            //validate user from BE
            this.setState({
                authenticated : true
            })
        }else{
            this.setState({
                authenticated : false
            })
        }

    }
    Logout(){
        document.getElementById("mySidenav").style.width = "0";
        Cookies.remove('_token', { path: '' });
        Cookies.remove('sessionID', { path: '' });
    }
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    render(){
        return(
            <React.Fragment>
                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}><span style={{float:'right'}}>&times;</span></a>
                    {
                        this.state.authenticated ? <LoggedUser username={this.state.username}/> : null
                    }
                    
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>Home</Link >
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>Contact Us</Link >
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>Support Us</Link >
                    <Link to={'/yourorders'} onClick={this.closeNav.bind(this)}>Orders</Link >
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>News</Link >
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>Farms</Link >
                    <Link to={'/books'} onClick={this.closeNav.bind(this)}>Cissa Books</Link >
                            {
                                this.state.authenticated ? <LoggedMob username={this.state.username} cli={this.Logout.bind(this)}/> : <NotLogged />
                            }
                </div>
                <span style={{fontSize:'30px',cursor:'pointer',color:'#fff',marginLeft:'10px'}}>
                <span onClick={this.openNav.bind(this)}>&#9776;</span> 
                <img src="./img/cissa_logo.png" alt="company_logo" className="c_topnav-small-logo"/>
                <span className="badge">{this.state.cartCount}</span>
                <img src="./img/cart_ic.png" alt="company_logo" className="c_topnav-small-cart_ic"  onClick={this.props.addCart.bind(this)}/>
                </span>
            </React.Fragment>
        )
    }
}

const Logged = (l) =>{
    return (
        <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#"><img src={'../img/user_head.png'}/><span>{l.username}</span> <span className="caret"></span></a>
            <ul className="dropdown-menu">
                <li><Link to={'/settings'} >Settings</Link></li>
                <li><a href="#" onClick={l.cli.bind(this)}>Logout</a></li>
            </ul>
        </li>
    )
}

const LoggedUser = (l) => {
    return(
        <React.Fragment>
            <Link to=""><img src={'../img/user_head.png'} style={{height:'50px'}}/></Link>
            <Link to="" style={{borderBottom:'1px solid #333'}}><span style={{fontWeight:'700'}}>{l.username}</span></Link>
        </React.Fragment>
    )
}

const LoggedMob = (l) => {
    return(
        <React.Fragment>
            <Link to={'/settings'} style={{borderTop: '1px solid #333'}}>Settings</Link>
            <a href="#" onClick={l.cli.bind(this)}>Logout</a>
        </React.Fragment>
    )
}

const NotLogged = () =>{
    return (
        <React.Fragment>
            <Link to={'/register'} style={{borderTop: '1px solid #333'}}><span className="glyphicon glyphicon-user"></span> Sign Up</Link>
            <Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span> Login</Link>
        </React.Fragment>
        
    )
}

export default Topnavsm;