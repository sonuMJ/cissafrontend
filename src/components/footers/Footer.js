import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <div className="col-lg-4">
                        <h4>Download App</h4>
                        <img src="../img/googleplay.png" width="140"/>
                    </div>
                    <div className="col-lg-8">
                        <h4>About us</h4>
                        <ul style={{listStyleType:'none',paddingInlineStart:'0px'}}>
                            <li><a>About us</a></li>
                            <li><a>Our Vision & Purpose</a></li>
                            <li><a>Quality standards</a></li>
                            <li><a>Awards</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <h5 className="text-center">&copy; 2019 Cissaorganic.com. All Rights Reserved</h5>
                </div>
            </React.Fragment>
        )
    }
}

export default Footer;