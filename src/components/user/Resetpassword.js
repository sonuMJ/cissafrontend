import React from 'react';
import { Link } from 'react-router-dom';

class Resetpassword extends React.Component{

    state = {
        password:"",
        confirmpassword:"",
        v_code:'',
        email:'',
        errorMessage:false
    }

    componentDidMount(){
        this.setState({
            v_code:this.props.match.params.verif_code,
            email:this.props.match.params.email
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit(){
        const {password, confirmpassword} = this.state;
        if(password !== confirmpassword){
            this.setState({
                errorMessage :true
            })
        }else{
            this.setState({
                errorMessage:false
            })
            fetch('/api/user/resetpassword',{
                method:'POST',
                body : JSON.stringify({verify_code:this.state.v_code,email:this.state.email,password:this.state.password}),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            .then(res => {
                if(res.status === 200){
                    return res.json();
                }else{
                    throw "We were unable to find an account linked to this email";
                    
                }
            })
            .then(result => {
                alert(result.message);
                this.props.history.push('/login');
            })
            .catch(e => {alert(e);})
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <div className="c_login">
                        <div style={{textAlign:'center'}}>
                            <Link to={'/'}><img src="../../img/cissa_logo.png" alt="cissa_logo" style={{height:'80px'}}/></Link>
                        </div>
                        <h1 className="text-center">Reset password!</h1>
                        <h3 className="text-center">Enter your new password</h3>
                        <label htmlFor="password" className="c_label">Enter Password</label><span className="c_error_msg">{this.state.pwdError}</span>
                        <input type="password" name="password" placeholder="Password" className="form-control c_input" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                        <label htmlFor="password" className="c_label">Confirm Password</label><span className="c_error_msg">{this.state.pwdError}</span>
                        <input type="password" name="confirmpassword" placeholder="Confirm Password" className="form-control c_input" value={this.state.confirmpassword} onChange={this.handleChange.bind(this)}/>
                        {
                            this.state.errorMessage ? <span style={{color:'red'}}>{"Please make sure your passwords match!"}</span> : null
                        }
                        <input type="button" value="Reset password" className="btn btn-lg c_login_btn" onClick={this.handleSubmit.bind(this)}/>
                        <h6 className="text-center">&copy; 2019 Cissaorganic.com. All Rights Reserved</h6>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Resetpassword;