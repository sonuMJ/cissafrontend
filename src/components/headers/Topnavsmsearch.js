import React from 'react';
import './header.css';
import Topnavsm from '../headers/Topnavsm';

class Topnavsmsearch extends React.Component{

    componentDidMount(){

    }

    handleSearch(e){
        this.props.search(e.target.value);
    }

    render(){
        return(
            <div >
                        
                <div className="input-group" style={{width:'100%',padding:'10px 5px',backgroundColor: '#46b300'}}>
                    <input style={{borderRadius:'5px'}} type="text" aria-label="search" onChange={this.handleSearch.bind(this)} className="form-control" placeholder="Search our products" name="search"/>
                    
                </div>
            </div>
        )
    }
}

export default Topnavsmsearch;