import React from 'react';
import Item from './Item';
import Purchaseditem from './Purchaseditem';

class Listitems extends React.Component{
    state = {
        products:[],
        output:[],
        update:false
    }

    componentDidMount(){
        console.log(this.props);
        console.log("items");
        this.setState({
            products:this.props.productlist,
            update:true
        })
    }
    componentWillReceiveProps(){
        this.setState({
            update:false
        })
        console.log(this.props);
        console.log("changed");
        setTimeout(() => {
            this.setState({
                products:this.props.productlist,
                update:true
            })
        }, 100);
    }


    cartButtonAction(product_ID, product_item, qty){
        this.props.addtocart(product_ID, product_item, qty);
    }

    render(){
        var op ="";
        return(
            <div>
                {
                    this.state.update ?
                    Object.keys(this.state.products).map((item,i) => {
                        return <Item item={this.state.products[item]} cart={this.props.cart} key={i} cartbtnaction={this.cartButtonAction.bind(this)}/>
                    })
                    :
                    <h3 className="text-center"><img src="../img/product_loader.gif"/></h3>
                }
            </div>
        )
    }
}

export default Listitems;