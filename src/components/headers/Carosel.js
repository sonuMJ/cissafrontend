import React from 'react';

class Carosel extends React.Component{
    render(){
        return(
            <div className="container-fluid home_slide">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="container-fluid mypage-slide" style={{height:'400px'}}>
                        <div className="carousel-inner" style={{height:'400px'}}>
                                <div className="item active">
                                    <img src="./img/slider1.jpg" alt="Los Angeles" style={{width:'100%'}}/>
                                </div>
                                <div className="item">
                                    <img src="./img/slider2.jpg" alt="Chicago" style={{width:'100%'}}/>
                                </div>
                                <div className="item">
                                    <img src="./img/slider3.jpg" alt="New york" style={{width:'100%'}}/>
                                </div>
                        </div>

                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span> 
                        </a>
                    </div>
            </div>
        </div>
        )
    }
}

export default Carosel;