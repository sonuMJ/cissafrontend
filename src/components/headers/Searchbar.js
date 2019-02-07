import React from 'react';
import './header.css';

class Searchbar extends React.Component{

    componentDidMount(){

    }

    handleSearch(e){
        this.props.search(e.target.value);
    }

    render(){
        return(
            <div className="container c_home_searchbar">
                <div className="row c_searchbar">
                    <div className="col-lg-2">  
                        <img src="./img/cissa_logo.png" width="100" alt="company_logo" className="img-responsive"/>
                            {/* <strong style={{fontFamily:'fantasy',color:'#086d45',fontSize:'20px'}}>ORGANIC GARDEN</strong> */}
                        </div>
                        <div className="col-lg-10">
                        
                        <div className="input-group c_home_search_all">
                            <input type="text" onChange={this.handleSearch.bind(this)} className="form-control searching" placeholder="Search our products" name="search"/>
                            <div className="input-group-btn home_search_icon">
                                <button className="btn btn-default home_search_icon" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Searchbar;