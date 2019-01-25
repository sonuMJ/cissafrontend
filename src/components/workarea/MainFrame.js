import React from 'react';
import Categorylist from './Categorylist';
import Mybill from './Mybill';
import Listitems from './Listitems';
import './product.css';
import Cookies from 'js-cookie';
import Contactinfo from '../headers/Contactinfo';
import Carosel from '../headers/Carosel';
import Searchbar from '../headers/Searchbar';
import Topnav from '../headers/Topnav';
import Footercontent from '../footers/Footercontent';
import Footer from '../footers/Footer';
import Popup from './Popup';

class Mainframe extends React.Component{
    state = {
        products:[],
        cart:[],
        isFetching : false,
        searching:false,
        category: 0,
        currentPage: 1,
        todosPerPage: 30,
        popup:false,
        productnotfound : false,
        storeLocator:''
    }
    componentDidMount(){
        
        this.fetchData(this.state.category);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    componentWillReceiveProps(){
        
    }

    fetchData(cate){
        this.setState({
            isFetching: true,
            currentPage:1
        })
        fetch('/api/product/getall/'+ cate)
        .then(res => res.json())
        .then(result => {
            if(result.length == 0){
                this.setState({
                    isFetching: false,
                    productnotfound:true,
                })
            }else{
                this.setState({
                    products:result,
                    isFetching: true,
                    searching:false,
                    productnotfound:false
                })
            }
            
            
        })
    }

    addToCart(product_ID, product_item, qty){
        var Key = Cookies.get("_cid");
        fetch('/api/cart/addCart',{
            method:'POST',
            body : JSON.stringify({product_id:product_ID}),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                "_cid":Key
            }
        })
        .then(res => res.json())
        .then(result => {
            //alert(result.message);
            setTimeout(() => {
                this.fetchCartItems(Key)
            }, 100);
        })
        .catch(e => {
            console.log(e);
        })
        
    }
    removeCartItem(prod_id){

    }   
    fetchCartItems(key){
        fetch('/api/cart/showCart',{
            method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "_cid":key
                }
            })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    cart:result.result
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    Choosecategory(cate){
        this.fetchData(cate);
    }

    handleSearchMain(txt){
        
        if(txt !== ""){
            this.setState({
                isFetching :false,
                searching:true
            })
            fetch('/api/product/search_p/'+txt)
            .then(res => {
                if(res.status === 200){
                    return res.json();
                }else{
                    alert("no result found!!")
                }
            })
            .then(result => {
                if(result.length == 0){
                    this.setState({
                        productnotfound:true,
                    })
                }else{
                   this.setState({
                        productnotfound:false,
                        products:result,
                        isFetching :true
                    }) 
                }
                
            })
        }else{
            setTimeout(() => {
                this.fetchData(this.state.category)
            }, 100);
        }
        
    }
    goCart(){
        if(this.state.storeLocator !== ""){
            this.props.history.push('/cart');
        }else{
            alert("You must choose store location to continue!!");
        }
        
    }

    setLocation(loc){
        this.setState({
            storeLocator:loc
        })
        setTimeout(() => {
            Cookies.set("_loc", this.state.storeLocator, {expires:1});
        }, 100);
        
    }

    render(){
        const { products, currentPage, todosPerPage } = this.state;

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = products.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className={(this.state.currentPage === number ? 'active ' : '') + 'controls'} key={number}><span  key={number} id={number} onClick={this.handleClick}>{number}</span></li>
            );
        });
        
        
        return(
            <React.Fragment>
                {
                    this.state.popup ? <Popup /> : ''
                }
                <Contactinfo />
                <Searchbar search={this.handleSearchMain.bind(this)}/>
                <Topnav />
                {
                    this.state.searching ? null : <Carosel />
                }
                
                <div className="container-fluid show-products">
                    <div className="col-lg-2 col-md-2">
                        <Categorylist selectcat={this.Choosecategory.bind(this)}/>
                    </div>
                    <div className="col-lg-8 col-md-8">
                    {
                        this.state.productnotfound ? <h3 className="text-center">PRODUCT NOT FOUND</h3> : null
                    }
                    {
                        this.state.isFetching ? <Listitems productlist={currentTodos} addtocart={this.addToCart.bind(this)}/> : <div style={{textAlign:'center',marginTop:'200px'}}>{ this.state.productnotfound ? null : <img src="../img/product_loader.gif" alt="loading_icon"/>}</div>
                    }
                    </div>
                    <div className="col-lg-2 col-md-2">
                        <Mybill selectLocation={this.setLocation.bind(this)} redirecttocart={this.goCart.bind(this)} cartitems={this.state.cart} removeCartItem={this.removeCartItem.bind(this)}/>
                    </div>
                </div>
                {
                        this.state.productnotfound ? null : <div style={{textAlign:'center'}}>
                        <ul id="page-numbers" className="pagination">
                            {renderPageNumbers}
                        </ul>
                    </div>
                }
                
                
                <Footercontent />
                <Footer />
                
            </React.Fragment>
            
        )
    }
}

export default Mainframe;