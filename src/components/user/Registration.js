import React from 'react';
import './Register.css';

class Registration extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div class="container-fluid" style={{paddingLeft: '0px',paddingRight: '0px'}}>
                    <div class="bg1">
                        <div class="container-fluid" style={{paddingRight: '180px'}}>
                            <div class="col-lg-9">
                        
                            </div>
                        <div class="col-lg-3 reg-form">
                            <form>
                                <h1 class="text-center">Register</h1>
                                <label for="email"><b>Username</b></label>
                                <input type="text" className="c_reg_input" placeholder="Enter Username" name="email" required/>

                                <label for="email"><b>Email or Phone</b></label>
                                <input type="text" className="c_reg_input" placeholder="Enter Email or phone" name="email" required/>

                                <label for="psw"><b>Password</b></label>
                                <input type="password" className="c_reg_input" placeholder="Enter Password" name="psw" required/>

                                <label for="psw-repeat"><b>Repeat Password</b></label>
                                <input type="password" className="c_reg_input" placeholder="Repeat Password" name="psw-repeat" required/>
                                <hr className="c_hr"/>
                                <p class="text-center">By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                                <button type="submit" class="registerbtn">Register</button>

                                <div class="signin">
                                    <p>Already have an account? <a href="#">Sign in</a>.</p>
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