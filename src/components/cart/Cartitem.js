import React from 'react';

class Cartitem extends React.Component{
    state = {
        data:[],
        total:'100'
    }
    componentDidMount(){
    }
    removeItem(product_id){
        this.props.remove(this,product_id);
    }
    increment(product_id,qty){
        this.props.inc(this,product_id,qty);
    }
    decrement(product_id,qty){
        this.props.dec(this,product_id,qty);
    }
    render(){
        var item = this.props.cartdata
        return(
            <tr className="cart-table-tr">
                <td className="cart-table-img">
                    <img src={item.productData[0].img_url} className="img-responsive" alt="cart_item_image"/>
                </td>
                <td className="cart-table-item">
                    <span style={{fontSize:'22px',fontWeight:'600'}}>{item.productData[0].name}</span>(<span style={{fontSize:'16px'}}>{item.productData[0].translated}</span>),<span>{item.productData[0].quantity}</span>
                    
                    <p className="cart-table-prod_id"><i>#{item.productId}</i></p>
                    <span className="cart-table-mrp">MRP</span><span className="cart-table-price">&#8377;{item.productData[0].price}</span>

                </td>
                <td className="cart-table-qty">
                    <span className="text-center">
                        <button className="c_round_btn" onClick={this.decrement.bind(this,item.productId, item.quantity)}>-</button>
                        <input type="number" value={item.quantity} readOnly style={{width:"40px",textAlign: "right"}} name="qty"/>
                        <button className="c_round_btn" onClick={this.increment.bind(this,item.productId, item.quantity)}>+</button>
                    </span>
                </td>
                <td className="cart-table-total"><p><span style={{fontSize:'16px',fontWeight:'500'}}>&#8377;</span><span style={{fontSize:'26px',fontWeight:'500'}}>{item.total}</span></p></td>
                <td className="cart-table-action">
                    <span className="cart-table-remove" onClick={this.removeItem.bind(this,item.productId)}>&nbsp;&nbsp;&nbsp;</span>
                </td>
            </tr>
        )
    }
}

export default Cartitem;