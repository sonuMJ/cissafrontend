import React from 'react';
import './header.css';

class Searchbar extends React.Component{

    componentDidMount(){
        
    }

    render(){
        return(
            <div className="container-fluid c_home_searchbar" style={{paddingLeft:'200px',paddingRight:'200px'}}>
                <div class="row">
                    <div class="col-lg-2">  
                        <img src="img/cissa-logo.png" width="100"/>
                            <strong style={{fontFamily:'fantasy',color:'#086d45',fontSize:'20px'}}>ORGANIC GARDEN</strong>
                        </div>
                        <div class="col-lg-10">
                        
                        <div class="input-group c_home_search_all">
                            <input type="text" class="form-control searching" placeholder="Search our products" name="search"/>
                            <div class="input-group-btn home_search_icon">
                                <button class="btn btn-default home_search_icon" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Searchbar;