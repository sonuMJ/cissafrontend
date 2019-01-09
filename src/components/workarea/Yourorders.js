import React, { Component } from 'react';
import Contactinfo from '../headers/Contactinfo';
import Searchbar from '../headers/Searchbar';
import Topnav from '../headers/Topnav';

class Yourorders extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Contactinfo />
                <Searchbar />
                <Topnav />
                <div className="container">
                    <h1>Your Orders</h1>
                </div>
            </React.Fragment>
        )
    }
}

export default Yourorders;