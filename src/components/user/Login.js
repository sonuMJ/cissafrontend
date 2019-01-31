import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Cookies from 'js-cookie';

class Login extends React.Component{
    state ={
        prePath:'',
        email:'',
        password:'',
        emailError:'',
        pwdError:'',
        errorMessage:false
    }
    componentDidMount(){
        //console.log(this.props.match);
        var prePath = this.props.match.params.path;
        this.setState({prePath:prePath})
        
        var logged = this.CheckAuth();
        if(logged){
            this.props.history.push('/');
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

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit(){
        // var msg = "Please enter a email or phone!" 
        // if(this.state.email.length == ''){
        //     this.setState({
        //         emailError:msg
        //     })
        // }else if(this.state.email.length >50 || this.state.email.length <= 3){
        //     this.setState({
        //         emailError:'Please enter a valid email or phone'
        //     }) 
        // }else{
        //     this.setState({
        //         emailError:''
        //     }) 
        // }
        // if(this.state.password.length == ''){
        //     this.setState({
        //         pwdError:'Please enter a password'
        //     })
        // }else if(this.state.password.length > 30 || this.state.password.length < 8){
        //     this.setState({
        //         pwdError:'Please enter a valid password'
        //     })
        // }else{
        //     this.setState({
        //         pwdError:''
        //     })
        // }
        // var valid = this.state;
        // if(valid.email !== ''&& valid.password !== ''&&valid.pwdError==''&&valid.emailError==''){
        //     console.log(this.state.email + "--" + this.state.password);
        // }
        this.handleLogin(this.state.email, this.state.password);
    }

    handleLogin(email,password){
        if(email !== ""&&password !== ""){
            var status;
            fetch('/api/user/login',{
                method:'POST',
                body : JSON.stringify({email:email,password:password}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }else{
                    this.setState({
                        errorMessage :true
                    })
                    throw "User does not exists! If you already have an account with us please check your mail !";
                }
            })
            .then(result => {
                console.log(result);
                
                if(result.message !== undefined){
                    alert(result.message);
                }else{
                    Cookies.set("_token", result.token, {expires:1});
                    Cookies.set("sessionID", result.csrf_token, {expires:1});
                    if(this.state.prePath === "co"){
                        this.props.history.push('/confirmOrder');
                    }else{
                        this.props.history.push('/');
                    }
                    
                }
            })
            .catch(e => {
                console.log(e);
            })
        }else{
            alert("Please enter email & password")
        }
    }
    
    render(){
        return(
            <React.Fragment>
                <div>
                    <p className="cart_back_btn"><Link to={'/'}><img src={'./img/back_btn.png'}/></Link></p>
                    <div className="container">
                        <div className="c_login">
                            <div style={{textAlign:'center'}}>
                                <Link to={'/'}><img src="./img/cissa_logo.png" alt="cissa_logo" style={{height:'80px'}}/></Link>
                            </div>
                            <h1 className="text-center">Welcome back!</h1>
                            <h3 className="text-center">Log in to access your profile, orders and Purchase</h3>
                            <label htmlFor="email" className="c_label">Email</label><span className="c_error_msg">{this.state.emailError}</span>
                            <input type="text" name="email" placeholder="Email" className="form-control c_input" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                            <label htmlFor="password" className="c_label">Password</label><span className="c_error_msg">{this.state.pwdError}</span>
                            <input type="password" name="password" placeholder="Password" className="form-control c_input" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                            {
                                this.state.errorMessage ? <span style={{color:'red'}}>{"Your username or password is incorrect"}</span> : null
                            }
                            <input type="button" value="Log in to your account" className="btn btn-lg c_login_btn" onClick={this.handleSubmit.bind(this)}/>
                            <div style={{textAlign:'right'}}>
                                <Link to={'/forgotpassword'}>Forgot Password?</Link>
                            </div>
                            <p className="text-center" style={{marginTop:'20px'}}>Need an account? <Link to={'/register'}>Create your account</Link></p>
                            <h6 className="text-center">&copy; 2019 Cissaorganic.com. All Rights Reserved</h6>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}


export default Login;