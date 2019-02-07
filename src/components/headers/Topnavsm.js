import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Topnavsm extends React.Component{
    state = {
        authenticated:false,
        username:'User'
    }
    
    componentDidMount(){
        this.CheckAuth();
        setTimeout(() => {
            this.getUsername();
        }, 100);
    }
    componentWillReceiveProps(){
        this.CheckAuth();
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
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>Home</Link >
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>Contact Us</Link >
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>Support Us</Link >
                    <Link to={'/yourorders'} onClick={this.closeNav.bind(this)}>Orders</Link >
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>News</Link >
                    <Link to={'/'} onClick={this.closeNav.bind(this)}>Farms</Link >
                    <Link to={'/books'} onClick={this.closeNav.bind(this)}>Cissa Books</Link >
                    <ul className="nav navbar-nav navbar-right c_nav_items">
                            {
                                this.state.authenticated ? <Logged username={this.state.username} cli={this.Logout.bind(this)}/> : <NotLogged />
                            }
                        </ul>
                </div>
                <span style={{fontSize:'30px',cursor:'pointer',color:'#fff',marginLeft:'10px'}}>
                <span onClick={this.openNav.bind(this)}>&#9776;</span> 
                <img src="./img/cissa_logo.png" alt="company_logo" className="c_topnav-small-logo"/>
                <img src="./img/cart_ic.png" alt="company_logo" className="c_topnav-small-cart_ic" onClick={this.props.addCart.bind(this)}/>
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
                <li><Link to={'/settings'}>Settings</Link></li>
                <li><a href="#" onClick={l.cli.bind(this)}>Logout</a></li>
            </ul>
        </li>
    )
}

const NotLogged = () =>{
    return (
        <React.Fragment>
            <li><Link to={'/register'}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
            <li><Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
        </React.Fragment>
        
    )
}

export default Topnavsm;