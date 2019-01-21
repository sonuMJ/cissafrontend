import React from 'react';

class Logo extends React.Component{
    render(){
        return(
            <div className="container-fluid c_home_searchbar" style={{paddingLeft:'200px',paddingRight:'200px'}}>
                <div className="row">
                    <div className="col-lg-2" style={{paddingBottom:'20px'}}>  
                        <img src="./img/cissa_logo.png" width="100" alt="company_logo"/>
                        </div>
                        <div className="col-lg-10">
                        
                        <div className="input-group c_home_search_all">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logo;