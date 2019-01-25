import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Topnav extends React.Component{
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
        Cookies.remove('_token', { path: '' });
        Cookies.remove('sessionID', { path: '' });
    }

    render(){
        return(
            <div>
                <nav className="navbar c_navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav c_nav_items">
                            <li className="active"><Link to={'/'}>Home</Link></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Support Us</a></li>
                            <li><Link to={'/yourorders'}>Orders</Link></li>
                            <li><a href="#">News</a></li>
                            <li><a href="#">Farms</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right c_nav_items">
                            {
                                this.state.authenticated ? <Logged username={this.state.username} cli={this.Logout.bind(this)}/> : <NotLogged />
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

export default Topnav;