import React from 'react';

class Topnav extends React.Component{
    render(){
        return(
            <div>
                <nav class="navbar c_navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>                        
                        </button>
                        </div>
                        <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav c_nav_items">
                            <li class="active"><a href="#">Home</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Support Us</a></li>
                            <li><a href="#">Orders</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right c_nav_items">
                            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                            <li class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Account <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Settings</a></li>
                                    <li><a href="#">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </nav>
            </div>
        )
    }
}

export default Topnav;