import React from 'react';
import './Register.css';
import {Link} from 'react-router-dom';

class Registration extends React.Component{
    state = {
        msg:'',
        popupMessage:false
    }
    handleSubmit(e){
        e.preventDefault();
        var data = e.target;
        if(data.pwd.value === data.repeatpwd.value){
            fetch('/api/user/register',{
                method:'POST',
                body : JSON.stringify({username:data.username.value, email:data.email.value,password:data.pwd.value,referral:data.referral.value}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(res =>{
                if(res.status === 200){
                    return res.json();
                }else{
                    throw "Already registered with this Email ID!!"
                }
            })
            .then(result => {
                //alert(result.message);
                this.setState({
                    msg:result.message,
                    popupMessage : true
                })
                setTimeout(() => {
                    
                }, 5000);
            })
            .catch(e => {alert(e);})
        }else{
            this.setState({msg:"Password Mismatch!!!"})
        }
    }

    handleMessage(){
        //console.log("clicked");
        this.setState({
            popupMessage:false
        })
        this.props.history.push('/');
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.state.popupMessage ? <Message okbtn={this.handleMessage.bind(this)}/> : null
                }
                <div>
                    <p className="cart_back_btn"><Link to={'/'}><img src={'./img/back_btn.png'}/></Link></p>
                    <div className="container" style={{paddingLeft: '4px',paddingRight: '4px'}}>
                        
                        <div className="c_login">
                            <div style={{textAlign:'center'}}>
                                <Link to={'/'}><img src="./img/cissa_logo.png" alt="cissa_logo" style={{height:'80px'}}/></Link>
                            </div>
                            <h1 className="text-center">Welcome!</h1>
                            <h3 className="text-center">Account Registration</h3>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                            <label htmlFor="email" className="c_label"><b>Username</b></label>
                            <input type="text" className="form-control c_input" placeholder="Enter Username" minLength="3" maxLength="40" name="username" required/>

                            <label htmlFor="email" className="c_label"><b>Email</b></label>
                            <input type="email" className="form-control c_input" placeholder="Enter Email address" maxLength="50" name="email" required/>

                            <label htmlFor="psw" className="c_label"><b>Password</b></label>
                            <input type="password"  name="pwd" placeholder="Password"  minLength="8" maxLength="25" className="form-control c_input"  required/>

                            <label htmlFor="psw-repeat" className="c_label"><b>Repeat Password</b></label>
                            <input type="password" className="form-control c_input" minLength="8" maxLength="25" placeholder="Repeat Password" name="repeatpwd" required/>
                            <p>{this.state.msg}</p>
                            <label htmlFor="referral" className="c_label"><b>Referral Code</b></label>
                            <input type="password" className="form-control c_input" placeholder="Referral code" name="referral"/>
                        
                            <input type="submit" value="Register" className="btn btn-lg c_login_btn" />
                            </form>
                            <p className="text-center" style={{marginTop:'20px'}}>Already registered? <Link to={'/login'}>Login</Link></p>
                            <h6 className="text-center">&copy; 2019 Cissaorganics.com. All Rights Reserved</h6>
                        </div>
                                {/* <form onSubmit={this.handleSubmit.bind(this)}>
                                    <h1 className="text-center">Register</h1>
                                    <label htmlFor="email"><b>Username</b></label>
                                    <input type="text" className="c_reg_input" placeholder="Enter Username" minLength="3" maxLength="20" name="username" required/>

                                    <label htmlFor="email"><b>Email</b></label>
                                    <input type="email" className="c_reg_input" placeholder="Enter Email address" maxLength="25" name="email" required/>

                                    <label htmlFor="psw"><b>Password</b></label>
                                    <input type="password" className="c_reg_input"  placeholder="Enter Password" name="pwd" required/>

                                    <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                                    <input type="password" className="c_reg_input" placeholder="Repeat Password" name="repeatpwd" required/>
                                    <p>{this.state.msg}</p>
                                    <hr className="c_hr"/>
                                    <p className="text-center">By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                                    <button type="submit" className="registerbtn">Register</button>

                                    <div className="signin">
                                        <p>Already have an account? <Link to={'/login'}>Sign in</Link>.</p>
                                    </div>
                                </form> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const Message = (msg) => {
    return(
        <div className="popup">
            <div className="popup-inner" style={{width:'725px',height:'240px'}}>
                <div style={{padding:'20px',textAlign:'center'}}>
                    <h2 className="text-center" style={{color:'#6495ed',borderBottom: '2px solid #6495ed',paddingBottom:' 12px',fontSize:'26px'}}>
                        <img src={"./img/success_tick.png"}/>&nbsp;{"A verification link has been sent to your email account "}
                    </h2>
                    <h4 style={{textAlign: 'center',marginTop:'24px',color: '#6495ee'}}>Please click on the link that has just been sent to your email account to verify your email and continue the registration process. You will recieve a verification email from us within 10 minutes</h4>
                    <button className="btn" style={{marginTop: '20px',width: '100px',backgroundColor: 'cornflowerblue',color: 'white'}} onClick={msg.okbtn.bind(this)}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default Registration;