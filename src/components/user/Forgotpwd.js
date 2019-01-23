import React from 'react';
import { Link } from 'react-router-dom';

class Forgotpwd extends React.Component{
    state = {
        email:''
    }

    handleChange(e){
        this.setState({
            email:e.target.value
        })
    }
    handleSubmit(){
        if(this.state.email !== ""){
            fetch('/api/user/resetpasswordmail',{
                method:'POST',
                body : JSON.stringify({email:this.state.email}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            }).then(res => res.json())
            .then(result => {
                alert(result.message);
            })
        }else{
            alert("Please enter email address associated with your Cissa account");
        }
        
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <div className="c_login">
                        <div style={{textAlign:'center'}}>
                            <Link to={'/'}><img src="./img/cissa_logo.png" alt="cissa_logo" style={{height:'80px'}}/></Link>
                        </div>
                        <h1 className="text-center">Reset password!</h1>
                        <h3 className="text-center">Enter the email address associated with your Cissa account.</h3>
                        <label htmlFor="email" className="c_label">Email</label>
                        <input type="text" name="email" placeholder="Email" className="form-control c_input" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                        
                        {
                            this.state.errorMessage ? <span style={{color:'red'}}>{"Your username or password is incorrect"}</span> : null
                        }
                        <input type="button" value="Continue" className="btn btn-lg c_login_btn" onClick={this.handleSubmit.bind(this)}/>
                        <h6 className="text-center">&copy; 2019 Cissaorganic.com. All Rights Reserved</h6>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Forgotpwd;