import React from 'react';

class Cartitem extends React.Component{
    state = {
        data:[]
    }
    componentDidMount(){
        console.log(this.props.cartdata);
        this.setState({
            data:this.props.cartdata
        })
    }
    render(){
        var item = this.props.cartdata
        return(
            <tr className="cart-table-tr">
                <td className="cart-table-img">
                    <img src={item.productData[0].img_url} className="img-responsive"/>
                </td>
                <td className="cart-table-item">
                    <span style={{fontSize:'22px',fontWeight:'600'}}>{item.productData[0].name}</span>(<span style={{fontSize:'16px'}}>{item.productData[0].translated}</span>),<span>{item.productData[0].quantity}</span>
                    
                    <p className="cart-table-prod_id"><i>#{item.productId}</i></p>
                    <span className="cart-table-mrp">MRP</span><span className="cart-table-price">&#8377;{item.productData[0].price}</span>

                </td>
                <td className="cart-table-qty">
                    <span className="text-center">
                        <button className="c_round_btn" >-</button>
                        <input type="number" value={item.quantitiy} readOnly style={{width:"40px",textAlign: "right"}} name="qty"/>
                        <button className="c_round_btn" >+</button>
                    </span>
                </td>
                <td className="cart-table-total"><p><span style={{fontSize:'16px',fontWeight:'500'}}>&#8377;</span><span style={{fontSize:'26px',fontWeight:'500'}}>100</span></p></td>
                <td className="cart-table-action">
                    <span className="cart-table-remove">&nbsp;&nbsp;&nbsp;</span>
                </td>
            </tr>
        )
    }
}

export default Cartitem;