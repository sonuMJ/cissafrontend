import React from 'react';
import Cookies from 'js-cookie';

class Contactinfo extends React.Component{
    state ={
        popup:false,
        location:''
    }
    componentDidMount(){
        this.getLocation();
    }
    getLocation(){
        var _loc = Cookies.get("_loc");
        if(_loc == undefined || _loc === null){
            
            this.setState({
                location:"Store location"
            })
        }else{
            this.setState({
                location:_loc
            })
        }
    }

    componentWillReceiveProps(){
        setTimeout(() => {
            this.getLocation();
        }, 200);
        
    }

    changeLocation(){
        this.setState({
            popup:true
        })
    }

    setLocation(e){
        this.setState({
            popup:false,
            location:e.target.value
        })
        setTimeout(() => {
            Cookies.set("_loc", this.state.location, {expires:1});
        }, 100);
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.state.popup ? <LocationPopup clk={this.setLocation.bind(this)}/> : null
                }
                <div className="text-center">
                    <span  className="c_location_change">
                        <span className="glyphicon glyphicon-map-marker"></span>{this.state.location} &nbsp;
                        <span className="c_location_change_btn" onClick={this.changeLocation.bind(this)}>Change</span>
                    </span>
                    <span>&nbsp;&nbsp;&nbsp; <span className="glyphicon glyphicon-earphone"></span>+0 9999 999 999</span>
                </div>
            </React.Fragment>
        )
    }
}

const LocationPopup = (p) => {
    return(
        <div className="popup">
            <div className="popup-inner" style={{width:'230px',height:'100px'}}>
                <p className="text-center" style={{fontSize:'18px'}}>Select location</p>
                <div className="popup-inner-location">
                    <select className="text-center" onChange={p.clk.bind(this)} name="_location">
                        <option></option>
                        <option>vazhuthacaud</option>
                        <option>kazhakottam</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Contactinfo;