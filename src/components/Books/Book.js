import React from 'react';

class Book extends React.Component{

    state = {
        book:[]
    }

    componentDidMount(){
        this.setState({
            book:this.props.bookdetail
        })
    }

    render(){
        var title = this.state.book.name;
        //var s_title = title.substring(0,14)+"...";

        var au_name= this.state.book.author;
        var price = this.state.book.price;
        var img_url = this.state.book.img_url;

        return(
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={{maxHeight: '468px'}}>
                <div className="" style={{padding: '28px'}}>
                    {
                        img_url == "" ? <img src="cover_not_found.jpg" className="img-responsive" style={{minHeight:'326px'}}/> : <img src={this.state.book.img_url} className="img-responsive" style={{minHeight:'326px'}}/>
                    }
                    
                    <h4 title={title}>{title}</h4>
                    <h5>{au_name}</h5>
                    <h4 className=""> &#8377; {price}</h4>
                </div>
            </div>
        )
    }
}

export default Book;