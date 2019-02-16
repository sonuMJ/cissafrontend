import React from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import './Locked.css';

class Locked extends React.Component{

    state ={
        logged:false
    }

    componentDidMount(){
        var logged = this.CheckAuth();
        if(logged){
            this.setState({
                logged : true
            })
        }
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
            <div className="container _c_locked" style={{textAlign:'center',fontWeight:'200'}}>
                <h2 style={{fontWeight:'200'}}>Your account has been temporarily blocked</h2>
                <img src="./img/locked.png"/>
                <h3 style={{fontWeight:'200'}}>Please contact <a href="mailto:someone@example.com" target="_top">support</a> for further queries.</h3>
                <h3 style={{fontWeight:'200'}}><Link to={'/'} >Back</Link></h3>
            </div>
        )
    }
}

export default Locked;