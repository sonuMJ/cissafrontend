import React from 'react';
import { Link } from 'react-router-dom';

class Verifyaccount extends React.Component{

    state ={
        code :'',
        completed:false
    }

    componentDidMount(){
        this.setState({
            code : this.props.match.params.verif_code
        })
        setTimeout(() => {
            this.EmailVerification(this.state.code);
        }, 100);
    }

    EmailVerification(v_code){
        fetch('/api/user/verifyaccount',{
            method:'POST',
            body : JSON.stringify({verify_code:v_code}),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        .then(res => {
            
            if(res.status == 200){
                setTimeout(() => {
                    this.setState({
                        completed:true
                    })
                }, 2000);
                
            }else if(res.status == 409){
                alert("Account already verified!!")
                this.props.history.push('/login');
            }else{
                alert("Something went wrong!!")
            }
        })
    }

    render(){
        return(
            <div>
                {
                    this.state.completed ? <ProcessSuccess /> : <Processing />
                }
            </div>
        )
    }
}
const Processing = () => {
    return(
        <div className="container cart-loading">
            <h3 className="text-center" style={{color:'#7ac142',fontWeight:'200'}}>Cissa Organics</h3>
            <h1 className="text-center" style={{color:'#7ac142',fontWeight:'200'}}>Your account is verifing</h1>
            <h2 className="text-center" style={{color:'#7ac142',fontWeight:'200'}}>Please wait...</h2>
            <h4 className="text-center" style={{marginLeft: '-18px',marginTop: '24px'}}><img src="../img/loader1.gif"/></h4>
        </div>
    )
}
const ProcessSuccess = () => {
    return(
        <div className="container cart-loading-success">
            <h1 className="text-center">Successfully Verified</h1>
            <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark-circle" fill="none" cx="26" cy="26" r="25" />
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <div className="text-center">
                <Link to={'/'} style={{color: '#7ac142',fontSize: '26px',fontWeight: '200'}}>Continue Shopping</Link>
            </div>
        </div>
    )
}

export default Verifyaccount;