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
        fetch("http://localhost:5000/api/category/getcategory")
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
        this.props.selectcat(item);
    }

    render(){
        return(

            <React.Fragment>
                {
                    this.state.categorylist == "" ? <p>something went wrong</p> : <div className="list-group"><a href="#" className="list-group-item" onClick={this.ChooseCategory.bind(this,"all")} style={{textTransform:'capitalize'}}>all</a><Showcategory sel={this.ChooseCategory.bind(this)} cate={this.state.categorylist}/></div>
                }
            </React.Fragment>
        )
    }
}

const Showcategory = (list) => {
    return(
        list.cate.map(l =>{
            return(<a href="#" onClick={list.sel.bind(this,l.name)} className="list-group-item" style={{textTransform:'capitalize'}}>{l.name}</a>)
        })
    )
}

export default Categorylist;