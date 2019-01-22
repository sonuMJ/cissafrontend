import React from 'react';

class Popup extends React.Component{
    
    componentWillReceiveProps(){
        console.log(this.props);
        
    }

    render(){
        return(
            <div className="popup">
                <div className="popup-inner">
                    <h1>{"hiiiiiiiiii"}</h1>
                </div>
            </div>
        )
    }
}

export default Popup;