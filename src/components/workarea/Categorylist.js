import React from 'react';
import { Link } from 'react-router-dom';

class Categorylist extends React.Component{
    state = {
        categorylist:[]
    }
    componentDidMount(){
        this.fetchCategory();
        
    }

    fetchCategory(){
        fetch("/api/category/getcategory")
        .then(res => {
            if(res.status == 200){
                return res.json();
            }
        })
        .then(result => {
            this.setState({
                categorylist:result
            })
        })
    }

    ChooseCategory(item,itemName){
        var item_name = itemName.charAt(0).toUpperCase() + itemName.slice(1)
        this.props.selectcat(item,item_name);
    }

    render(){
        // <ul class="breadcrumb">
        //             <li><a href="#">Home</a></li>
        //             <li><a href="#">Products</a></li>
        //             <li class="active">Accessories</li>
        //         </ul>
        return(

            <React.Fragment>
                {/* {
                    this.state.categorylist == "" ? <p>something went wrong</p> : <div className="list-group" style={{boxShadow: '0px 1px 24px -9px'}}><p className="list-group-item category-list" onClick={this.ChooseCategory.bind(this,0,'Fruits&Vegetables')} style={{textTransform:'capitalize'}}>all</p><Showcategory sel={this.ChooseCategory.bind(this)} cate={this.state.categorylist}/></div>
                } */}
                {
                    this.state.categorylist == "" ? <p className="text-center">Loading ...!</p> : <ul className="breadcrumb" style={{fontSize:'16px'}}><li onClick={this.ChooseCategory.bind(this,0,'All Products')} style={{textTransform:'capitalize'}}><Link to={''}>All</Link></li><Showcategory sel={this.ChooseCategory.bind(this)} cate={this.state.categorylist}/></ul>
                }
            </React.Fragment>
        )
    }
}

const Showcategory = (list) => {
    
    return(
        list.cate.map(l =>{
            return(<li  onClick={list.sel.bind(this,l.category_id,l.name)}  style={{textTransform:'capitalize'}} key={l.id}><Link to={''}>{l.name}</Link></li>)
        })
    )
}

export default Categorylist;