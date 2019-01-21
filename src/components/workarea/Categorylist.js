import React from 'react';
import { Link } from 'react-router-dom';

class Categorylist extends React.Component{
    state = {
        categorylist:[]
    }
    componentDidMount(){
        this.fetchCategory();
        setTimeout(() => {
            console.log(this.state.categorylist);
            
        }, 100);
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

    ChooseCategory(item){
        console.log(item);
        
        this.props.selectcat(item);
    }

    render(){
        return(

            <React.Fragment>
                {
                    this.state.categorylist == "" ? <p>something went wrong</p> : <div className="list-group"><p className="list-group-item category-list" onClick={this.ChooseCategory.bind(this,0)} style={{textTransform:'capitalize'}}>all</p><Showcategory sel={this.ChooseCategory.bind(this)} cate={this.state.categorylist}/></div>
                }
            </React.Fragment>
        )
    }
}

const Showcategory = (list) => {
    console.log(list);
    
    return(
        list.cate.map(l =>{
            return(<p  onClick={list.sel.bind(this,l.category_id)} className="list-group-item category-list" style={{textTransform:'capitalize'}} key={l.id}>{l.name}</p>)
        })
    )
}

export default Categorylist;