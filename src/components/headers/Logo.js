import React from 'react';

class Logo extends React.Component{
    render(){
        return(
            <div className="container-fluid c_home_searchbar" style={{paddingLeft:'200px',paddingRight:'200px'}}>
                <div class="row">
                    <div class="col-lg-2" style={{paddingBottom:'20px'}}>  
                        <img src="img/cissa-logo.png" width="100"/>
                            <strong style={{fontFamily:'fantasy',color:'#086d45',fontSize:'20px'}}>ORGANIC GARDEN</strong>
                        </div>
                        <div class="col-lg-10">
                        
                        <div class="input-group c_home_search_all">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logo;