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
    onChangeQuantity(product_id,e){
        this.props.dropdown(this,product_id,e.target.value);
    }
    render(){
        var item = this.props.cartdata
        return(
            <tr className="cart-table-tr">
                <td className="cart-table-img">
                    <img src={item.productData[0].img_url} className="img-responsive" alt="cart_item_image"/>
                </td>
                <td className="cart-table-item">
                    <div className="cart-table-item-main">
                        <span style={{fontSize:'22px',fontWeight:'600',textTransform: 'capitalize'}}>{item.productData[0].name}</span><span style={{fontSize:'16px'}} className="c_cart-translated">({item.productData[0].translated})</span>,<span>{item.productData[0].quantity}</span>
                    
                        <p className="cart-table-prod_id"><i>#{item.productId}</i></p><br/>
                        <span className="cart-table-mrp">MRP</span><span className="cart-table-price">&#8377;{item.productData[0].price}</span>
                    </div>
                </td>
                <td className="cart-table-qty">
                    <span className="text-center c_cart_counter">
                        <button className="c_round_btn" onClick={this.decrement.bind(this,item.productId, item.quantity)}>-</button>
                        <select onChange={this.onChangeQuantity.bind(this,item.productId)} value={item.quantity}>
                            {
                                <Itemnumber/>
                            }
                        </select>
                        {/* <input type="number" value={item.quantity} readOnly  name="qty" className="c_cart_count"/> */}
                        <button className="c_round_btn" onClick={this.increment.bind(this,item.productId, item.quantity)}>+</button>
                    </span>
                </td>
                <td className="cart-table-total"><p className="c_cart_price"><span style={{fontSize:'16px',fontWeight:'500'}}>&#8377;</span><span className="c_cart_price_ind_total" style={{fontSize:'26px',fontWeight:'500'}}>{item.total}</span></p></td>
                <td className="cart-table-action">
                    <span className="cart-table-remove" onClick={this.removeItem.bind(this,item.productId)}>&nbsp;&nbsp;&nbsp;</span>
                </td>
            </tr>
        )
    }
}
const Itemnumber = () => {
    var rows = [];
    for (var i = 1; i <= 10; i++) {
        rows.push(<option value={i} key={i}>{i}</option>);
    }
    return rows;
}

export default Cartitem;