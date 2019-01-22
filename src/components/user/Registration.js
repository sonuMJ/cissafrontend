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
                body : JSON.stringify({username:data.username.value, email:data.email.value,password:data.pwd.value}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(res =>{
                if(res.status === 200){
                    return res.json();
                }else{
                    throw "User already exists!!"
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
                <div class="container-fluid" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                    <div class="bg1">
                        <div class="container-fluid" style={{paddingRight: '180px'}}>
                            <div class="col-lg-9">
                        
                            </div>
                        <div class="col-lg-3 reg-form">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <h1 class="text-center">Register</h1>
                                <label for="email"><b>Username</b></label>
                                <input type="text" className="c_reg_input" placeholder="Enter Username" minLength="3" maxLength="20" name="username" required/>

                                <label for="email"><b>Email</b></label>
                                <input type="email" className="c_reg_input" placeholder="Enter Email address" maxLength="25" name="email" required/>

                                <label for="psw"><b>Password</b></label>
                                <input type="password" className="c_reg_input"  placeholder="Enter Password" name="pwd" required/>

                                <label for="psw-repeat"><b>Repeat Password</b></label>
                                <input type="password" className="c_reg_input" placeholder="Repeat Password" name="repeatpwd" required/>
                                <p>{this.state.msg}</p>
                                <hr className="c_hr"/>
                                <p class="text-center">By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                                <button type="submit" class="registerbtn">Register</button>

                                <div class="signin">
                                    <p>Already have an account? <Link to={'/login'}>Sign in</Link>.</p>
                                </div>
                            </form>
                        </div>
                        </div>
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
                    <h4 style={{textAlign: 'center',marginTop:'24px',color: '#6495ee'}}>Please click on the that has just been sent to your email account to verify your email and continue the registration process. Please allow 5-10 minutes for this message to arrive</h4>
                    <button className="btn" style={{marginTop: '20px',width: '100px',backgroundColor: 'cornflowerblue',color: 'white'}} onClick={msg.okbtn.bind(this)}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default Registration;