import React from 'react';
import './Register.css';
import {Link} from 'react-router-dom';

class Registration extends React.Component{
    state = {
        errmsg:''
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
                alert(result.message);
                this.props.history.push('/');
            })
            .catch(e => {alert(e);})
        }else{
            this.setState({errmsg:"Password Mismatch!!!"})
        }
    }

    render(){
        return(
            <React.Fragment>
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
                                <p>{this.state.errmsg}</p>
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

export default Registration;