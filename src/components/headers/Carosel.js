import React from 'react';

class Carosel extends React.Component{
    render(){
        return(
            <div class="container-fluid home_slide">
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div class="container-fluid mypage-slide" style={{height:'400px'}}>
                        <div class="carousel-inner" style={{height:'400px'}}>
                                <div class="item active">
                                    <img src="./img/slider1.jpg" alt="Los Angeles" style={{width:'100%'}}/>
                                </div>
                                <div class="item">
                                    <img src="./img/slider2.jpg" alt="Chicago" style={{width:'100%'}}/>
                                </div>
                                <div class="item">
                                    <img src="./img/slider3.jpg" alt="New york" style={{width:'100%'}}/>
                                </div>
                        </div>

                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                        <span class="sr-only">Next</span> 
                        </a>
                    </div>
            </div>
        </div>
        )
    }
}

export default Carosel;