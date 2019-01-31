import React from 'react';

class Listviewitems extends React.Component{
    state = {
        purchased : false,
        item:[],
        purchase_qty : 1
    }
    componentDidMount(){
        this.setState({
            item : this.props.item
        })
    }

    componentWillReceiveProps(){
        this.setState({
            item : this.props.item
        })
    }

    cart(product_ID, product){
        this.props.cartbtnaction(product_ID, product, this.state.purchase_qty);
    }
    render(){
        return(<tr>
            <td style={{textTransform:'capitalize'}}>{this.state.item.name}</td>
            <td>{this.state.item.quantity}</td>
            <td>&#8377; {this.state.item.price}</td>
            <td><button className="btn btn-success c_cart_btn" onClick={this.cart.bind(this,this.state.item.product_id, this.state.item)}>Add to Cart</button></td>
        </tr>)
    }
}

export default Listviewitems;