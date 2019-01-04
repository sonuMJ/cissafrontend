import React from 'react';

class Categorylist extends React.Component{
    render(){
        return(
            <div className="list-group">
                <a href="#" className="list-group-item">Vegitables</a>
                <a href="#" className="list-group-item">Fruits</a>
                <a href="#" className="list-group-item">Grains</a>
            </div>
        )
    }
}

export default Categorylist;