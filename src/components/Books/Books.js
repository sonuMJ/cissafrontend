import React from 'react';
import Logo from '../headers/Logo';
import Topnav from '../headers/Topnav';
import Topnavsm from '../headers/Topnavsm';
import "./books.css";
import Book from './Book';

class Books extends React.Component{

    state = {
        loading:true,
        books:[],
        errorMsg:""
    }

    componentDidMount(){
        this.fetchBooks();
    }

    fetchBooks(){
        fetch('/api/books/getBookdata')
        .then(res => {
            if(res.status == 200){
                return res.json();
            }else{
                this.setState({
                    errorMsg:"Something went wrong!!"
                })
            }
        })
        .then(result => {
            this.setState({
                books:result,
                loading:false
            })
        })
    }

    goMobCart(){
        this.props.history.push('/cart');
    }
    render(){
        
        return(
            <React.Fragment>
                <div className="c_respo_nav-large">
                    <Logo/>
                    <Topnav />
                </div>
                <div className="c_respo_nav-small">
                    <Topnavsm addCart={this.goMobCart.bind(this)}/>
                </div>
                <div className="container">
                    <h2>Publications</h2>
                    {
                        this.state.loading ? <div style={{textAlign:'center'}}><img src="./img/product_loader.gif" alt="loading"/></div> : <Bookdetails data={this.state.books}/>
                    }
                </div>
            </React.Fragment>
        )
    }
}

const Bookdetails = (data) => {
    
    return(
        <React.Fragment>
        <div className="row">
            <Booksubtitle name="Malayalam"/>
            {
                data.data.map((book,i) => {
                    if(book.lang == "ML"){
                        return(<Book bookdetail={book} key={i}/>)
                    }
                })
            }
            </div>
            <Booksubtitle name="English"/>
            <div className="row">
            
            {
                data.data.map((book,i) => {
                    if(book.lang == "EN"){
                        return(<Book bookdetail={book} key={i}/>)
                    }
                })
            }
        </div>
        </React.Fragment>
    )
}

const Booksubtitle = (title) => {
    return(
        <h4 className="c_book_lang_title">{title.name}</h4>
    )
}

export default Books;