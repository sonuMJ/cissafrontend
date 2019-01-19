import React from 'react';
import Cookies from 'js-cookie';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import Contactinfo from '../headers/Contactinfo';
import Logo from '../headers/Logo';
import Topnav from '../headers/Topnav';

class Settings extends React.Component{
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
            <React.Fragment>
                <Contactinfo />
                <Logo />
                <Topnav />
                <div className="container">
                    {
                        this.state.logged ? 
                        <div>
                            <h2>Settings</h2>
                            <div class="row" style={{marginTop:'40px'}}>
                                <div class="col-lg-4 col-md-2 col-xs-12 row_sett">
                                    <div class="list-group">
                                        <Link to={'/settings/reset'} class="list-group-item">Change Password</Link>
                                        <Link to={'/settings/info'} class="list-group-item">User Info</Link>
                                        <Link to={'/settings/edit'} class="list-group-item">Third item</Link>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-10 col-xs-12">
                                    {
                                        <React.Fragment>
                                            <Redirect from="/" to='/settings/reset'/>
                                            <Switch>
                                                <Route exact path='/settings/reset' component={Resetpassword} />
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

const Resetpassword = () =>{
    return(
        <div>
            <h3>Change password</h3>
            <label>Old password</label>
            <input type="password" placeholder="old password" className="form-control"/>
            <label>New password</label>
            <input type="password" placeholder="new password" className="form-control"/>
            <label>Confirm password</label>
            <input type="password" placeholder="confirm password" className="form-control"/>
            <hr/>
            <input type="button" value="Reset Password" className="btn btn-primary"/>
        </div>
    )
}

const Userinfo = () => {
    return <h2>User Info</h2>
}

export default Settings;