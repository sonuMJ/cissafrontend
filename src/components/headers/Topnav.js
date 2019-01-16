import React from 'react';
import Cookies from 'js-cookie';
import { Link,Redirect } from 'react-router-dom';

class Topnav extends React.Component{
    state = {
        authenticated:false
    }
    
    componentDidMount(){
        console.log("did mount from topnav");
        this.CheckAuth();
    }
    componentWillReceiveProps(){
        this.CheckAuth();
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
        Cookies.remove('_token', { path: '' });
        Cookies.remove('sessionID', { path: '' });
    }

    render(){
        return(
            <div>
                <nav class="navbar c_navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>                        
                        </button>
                        </div>
                        <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav c_nav_items">
                            <li class="active"><Link to={'/'}>Home</Link></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Support Us</a></li>
                            <li><Link to={'/yourorders'}>Orders</Link></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right c_nav_items">
                            {
                                this.state.authenticated ? <Logged cli={this.Logout.bind(this)}/> : <NotLogged />
                            }
                        </ul>
                        </div>
                    </div>
                    </nav>
            </div>
        )
    }
}

const Logged = (l) =>{
    return (
        <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><img src={'./img/user_head.png'}/>Account <span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li><a href="#">Settings</a></li>
                <li><a href="#" onClick={l.cli.bind(this)}>Logout</a></li>
            </ul>
        </li>
    )
}

const NotLogged = () =>{
    return (
        <React.Fragment>
            <li><Link to={'/register'}><span class="glyphicon glyphicon-user"></span> Sign Up</Link></li>
            <li><Link to={'/login'}><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
        </React.Fragment>
        
    )
}

export default Topnav;