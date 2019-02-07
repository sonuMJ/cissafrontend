import React from 'react';
import Cookies from 'js-cookie';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import Contactinfo from '../headers/Contactinfo';
import Logo from '../headers/Logo';
import Topnav from '../headers/Topnav';

class Settings extends React.Component{
    state ={
        logged:false,
        errormsg:''
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

    changePassword(e){
        e.preventDefault();
        var token = Cookies.get("_token");
        var session = Cookies.get("sessionID");
        var oldpwd = e.target.oldpwd.value;
        var newpwd = e.target.newpwd.value;
        var confirmpwd = e.target.confirmpwd.value;
        if(oldpwd !== ""){
            if(newpwd !== ""){
                if(confirmpwd !== ""){
                    if(newpwd === confirmpwd){
                        fetch("/api/user/resetpasswordbyloggeduser",{
                            headers:{
                                "Content-Type": "application/json",
                                // "Content-Type": "application/x-www-form-urlencoded",
                                "token":token,
                                "sessionid":session
                            },
                            method:'POST',
                            body:JSON.stringify({oldpassword:oldpwd, newpassword:newpwd})
                        })
                        .then(res => {
                            if(res.status == 200){
                                return res.json();
                            }else if(res.status == 401){
                                alert("Unauthorized User!!");
                                Cookies.remove('_token', { path: '' });
                                Cookies.remove('sessionID', { path: '' });
                                this.props.history.push('/');
                            }else{
                                alert("Something went Wrong!!")
                            }
                        })
                        .then(result => {
                            alert(result.message);
                        })
                    }else{
                        alert("Confirm password Incorrect!!");
                    }
                }else{
                    alert("Please enter confirm password");
                }
            }else{
                alert("Please enter new password");
            }
        }else{
            alert("Please enter old password");
        }
    }

    render(){
        return(
            <React.Fragment>
                <Contactinfo />
                <Logo />
                <Topnav />
                <div className="container">
                    {
                        this.state.logged ? 
                        <div>
                            <h2>Settings</h2>
                            <div className="row" style={{marginTop:'40px'}}>
                                <div className="col-lg-4 col-md-2 col-xs-12 row_sett">
                                    <div className="list-group">
                                        <Link to={'/settings/reset'} className="list-group-item">Change Password</Link>
                                        <Link to={'/settings/info'} className="list-group-item">User Info</Link>
                                        <Link to={'/settings/edit'} className="list-group-item">Third item</Link>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-10 col-xs-12">
                                    {
                                        <React.Fragment>
                                            <Redirect from="/" to='/settings/reset'/>
                                            <Switch>
                                                <Route exact path='/settings/reset' component={() => <Resetpassword change={this.changePassword.bind(this)} error={this.state.errormsg}/>} />
                                                <Route exact path='/settings/info' component={Userinfo} />
                                            </Switch>
                                        </React.Fragment>
                                        
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div style={{marginTop:'200px'}}>
                            <h4 className="text-center">You need to login to continue...! <Link to={'/login'}>Login</Link></h4>
                        </div>
                    }
                </div>
                
            </React.Fragment>
        )
    }
}

const Resetpassword = (c) =>{
    console.log(c);
    
    return(
        <div>
            <h3>Change password</h3>
            <form name="resetpwd" onSubmit={c.change.bind(this)}>
                <label>Old password</label>
                <input type="password" placeholder="old password" className="form-control" name="oldpwd"/>
                <label>New password</label>
                <input type="password" placeholder="new password" className="form-control"  name="newpwd"/>
                <label>Confirm password</label>
                <input type="password" placeholder="confirm password" className="form-control" name="confirmpwd"/>
                <i>{c.error}</i>
                <hr/>
                
                <input type="submit" value="Reset Password" className="btn btn-primary" />
            </form>
        </div>
    )
}

const Userinfo = () => {
    return <h2>User Info</h2>
}

export default Settings;