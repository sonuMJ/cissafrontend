import React from 'react';
import Item from './Item';
import Purchaseditem from './Purchaseditem';

class Listitems extends React.Component{
    state = {
        products:[],
        output:[]
    }

    componentDidMount(){
        this.setState({
            products:this.props.productlist
        })
    }
    componentWillReceiveProps(){
        console.log("changed");
    }


    cartButtonAction(product_ID, product_item, qty){
        this.props.addtocart(product_ID, product_item, qty);
    }

    render(){
        var op ="";
        return(
            <div>
                {
                    Object.keys(this.state.products).map((item,i) => {
                        return <Item item={this.state.products[item]} cart={this.props.cart} key={i} cartbtnaction={this.cartButtonAction.bind(this)}/>
                    })
                }
            </div>
        )
    }
}

export default Listitems;