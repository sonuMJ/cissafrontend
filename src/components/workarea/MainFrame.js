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
import {Link} from 'react-router-dom';
import Listview from './Listview';
import Topnavsm from '../headers/Topnavsm';
import Topnavsmsearch from '../headers/Topnavsmsearch';
import Snackbar from '../snackbar/Snackbar';

class Mainframe extends React.Component{
    state = {
        products:[],
        cart:[],
        isFetching : false,
        searching:false,
        category: 0,
        currentPage: 1,
        todosPerPage: 24,
        locationPopup:false,
        productnotfound : false,
        storeLocator:'',
        categoryName:'All Products',
        itemsView:'block',
        updateBill:false,
        locationChange:false,
        status: '',
        description: '',
        msg_state: false,
        adding:false
    }
    componentDidMount(){
        
        this.fetchData(this.state.category);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        window.scrollTo(0, 0);
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    componentWillReceiveProps(){
        this.setState({
            currentPage:1
        })
    }

    fetchData(cate){
        this.setState({
            isFetching: false,
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
        this.setState({
            adding:true
        })
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
            //this.onResultChange("Success","Product added to cart");
            this.setState({
                adding:false
            })
            setTimeout(() => {
                this.fetchCartItems(Key)
            }, 100);
        })
        .catch(e => {
            console.log(e);
        })
        
    }
    onResultChange(status, message){
        this.setState({
            status: status,
            description: message,
            msg_state: true
        });
        setTimeout(()=>{    
            this.setState({
               msg_state:false
           });
        }, 3000);
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

    Choosecategory(cate,cate_name){
        // this.setState({
        //     categoryName:cate_name
        // })
        this.state.categoryName = cate_name;
        this.fetchData(cate);
    }

    handleSearchMain(txt){
        
        if(txt !== ""){
            this.setState({
                isFetching :false,
                searching:true,
                currentPage: 1
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
        var location = Cookies.get("_loc");
        if(location != undefined){
            this.props.history.push('/cart');
        }else{
            alert("You must choose store location to continue!!");
        }
        
    }
    goMobCart(){
        var location = Cookies.get("_loc");
        if(location != undefined){
            //go to cart
            this.props.history.push('/cart');
        }else{
            this.setState({
                locationPopup : true
            })
        }
    }
    set_loc(e){
        this.setState({
            locationPopup:false
        })
        this.setLocation(e.target.value);
    }

    setLocation(loc){
        this.setState({
            storeLocator:loc,
            locationChange:true
        })
        setTimeout(() => {
            Cookies.set("_loc", this.state.storeLocator, {expires:1});
        }, 100);
        
    }
    changeView(e){
        
        this.setState({
            itemsView:e.target.value
        })
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
                    this.state.adding ? <Popupmessage /> : null
                }
                {
                    this.state.locationPopup ? <LocationPopup clk={this.set_loc.bind(this)}/> : null
                }
                <Contactinfo locationChange={this.state.locationChange}/>
                <div className="c_respo_nav-large">
                    <Searchbar search={this.handleSearchMain.bind(this)}/>
                    <Topnav addCart={this.goMobCart.bind(this)}/>
                </div>
                <div className="c_respo_nav-small">
                    <Topnavsm addCart={this.goMobCart.bind(this)} cartItems={this.state.cart.length}/>
                    <Topnavsmsearch search={this.handleSearchMain.bind(this)}/>
                </div>
                {
                    this.state.searching ? null : <Carosel />
                }
                
                <div className="container-fluid show-products">
                    <div className="row">
                    <Categorylist selectcat={this.Choosecategory.bind(this)}/>
                    {/* <div className="col-lg-2 col-md-2">
                        <Categorylist selectcat={this.Choosecategory.bind(this)}/>
                    </div> */}
                    <div className="col-lg-10 col-md-9 col-sm-9 col-xs-12 c_show_products_list">
                    {
                        this.state.productnotfound ? 
                        <div className="text-center" style={{textAlign:'center'}} alt="search">
                            <img src="./img/diet.png" height="120"/>
                            <h3 className="text-center">PRODUCT CURRENTLY UNAVAILABLE </h3> 
                        </div>
                        :
                         null
                    }
                    {
                        this.state.isFetching ? 
                        <div>
                            <p style={{ borderBottom: '2px solid #d6d6d6'}}>
                                <span style={{ paddingBottom: '12px',fontSize:'24px',fontWeight:'500'}}>{this.state.categoryName}</span>
                                <select style={{float:'right',marginTop:'4px',width:'140px',height:'26px'}} aria-label="selectview" className="list_view_select" onChange={this.changeView.bind(this)}>
                                    <option value="block">&#9744;Block view</option>
                                    <option value="list">&#9776; List view</option>
                                </select>
                            </p>
                            {/* <div className="container-fluid">
                                <ul className="cart_items_view">
                                    <li><img src={'./img/block.png'} onClick={this.changeView.bind(this,'block')}/></li>
                                    <li><img src={'./img/list.png'} onClick={this.changeView.bind(this,'list')}/></li>
                                </ul>
                            </div> */}
                            {
                                this.state.itemsView === 'block' ? <Listitems productlist={currentTodos} addtocart={this.addToCart.bind(this)}/> : <Listview productlist={currentTodos} addtocart={this.addToCart.bind(this)}/>
                            }
                            
                        </div>
                         : <div style={{textAlign:'center',marginTop:'200px'}}>{ this.state.productnotfound ? null : <img src="../img/product_loader.gif" alt="loading_icon"/>}</div>
                    }
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-3 c_main_cart" >
                        <Mybill selectLocation={this.setLocation.bind(this)} redirecttocart={this.goCart.bind(this)} cartitems={this.state.cart} removeCartItem={this.removeCartItem.bind(this)}/>
                    </div>
                    </div>
                </div>
                {
                        this.state.productnotfound ? null : <div style={{textAlign:'center'}}>
                        <ul id="page-numbers" className="pagination">
                            {renderPageNumbers}
                        </ul>
                    </div>
                }
                
                {/* <Snackbar status={this.state.status} msg_state={this.state.msg_state} message={this.state.description}/> */}
                <Footercontent />
                <Footer />
                
            </React.Fragment>
            
        )
    }
}

const LocationPopup = (p) => {
    return(
        <div className="popup">
            <div className="popup-inner" style={{width:'230px',height:'100px'}}>
                <p className="text-center">Select location</p>
                <div className="popup-inner-location">
                    <select className="text-center" onChange={p.clk.bind(this)} name="_location">
                        <option></option>
                        <option>vazhuthacaud</option>
                        <option>kazhakottam</option>
                    </select>
                </div>
                
            </div>
        </div>
    )
}
const Popupmessage = () => {
    return(
        <div className="popup">
            <div className="popup-inner" style={{width:'230px',height:'100px',backgroundColor:'transparent',textAlign:'center',color:'#fff'}}>
                <h3>Adding to cart..</h3>
            </div>
        </div>
    )
}

export default Mainframe;