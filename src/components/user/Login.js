import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Cookies from 'js-cookie';

class Login extends React.Component{
    state = {
        email:'',
        password:'',
        emailError:'',
        pwdError:''
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit(){
        var msg = "Please enter a email or phone!" 
        if(this.state.email.length == ''){
            this.setState({
                emailError:msg
            })
        }else if(this.state.email.length >50 || this.state.email.length <= 3){
            this.setState({
                emailError:'Please enter a valid email or phone'
            }) 
        }else{
            this.setState({
                emailError:''
            }) 
        }
        if(this.state.password.length == ''){
            this.setState({
                pwdError:'Please enter a password'
            })
        }else if(this.state.password.length > 30 || this.state.password.length < 8){
            this.setState({
                pwdError:'Please enter a valid password'
            })
        }else{
            this.setState({
                pwdError:''
            })
        }
        // var valid = this.state;
        // if(valid.email !== ''&& valid.password !== ''&&valid.pwdError==''&&valid.emailError==''){
        //     console.log(this.state.email + "--" + this.state.password);
        // }
        this.handleLogin(this.state.email, this.state.password);
    }

    handleLogin(email,password){
        fetch('http://localhost:5000/user/login',{
            method:'POST',
            body : JSON.stringify({email:email,password:password}),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result.message !== undefined){
                alert(result.message);
            }else{
                Cookies.set("_token", result.token, {expires:1});
                Cookies.set("sessionID", result.csrf_token, {expires:1});
            }
            
            
        })
        .catch(e => {
            console.log(e);
        })
    }
    
    render(){
        return(
            <div className="container">
                <div className="c_login">
                    <h1 className="text-center">Welcome back!</h1>
                    <h3 className="text-center">Log in to access your profile, orders and Purchase</h3>
                    <label htmlFor="email">Email/Phone</label><span className="c_error_msg">{this.state.emailError}</span>
                    <input type="text" name="email" placeholder="Email or Phone" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                    <label htmlFor="password">Password</label><span className="c_error_msg">{this.state.pwdError}</span>
                    <input type="password" name="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                    <input type="button" value="Log in to your account" className="btn btn-lg c_login_btn" onClick={this.handleSubmit.bind(this)}/>
                    <p className="text-center">Need an account? <Link to={'/register'}>Create your account</Link></p>
                </div>
            </div>
        )
    }
}

export default Login;