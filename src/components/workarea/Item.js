import React from 'react';

class Item extends React.Component{
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


    increment(){
        this.setState({
            purchase_qty: this.state.purchase_qty + 1
        })
    }

    decrement(){
        var qty = this.state;
        if(qty.purchase_qty === 1){
            this.setState({
                purchased : false
            })
        }else{
            this.setState({
                purchase_qty: qty.purchase_qty - 1
            })
        }
    }

    render(){
        return(
            <div className="col-lg-3 c_product_col">

            <div className="c_product text-center">
                <img src={this.state.item.img_url} className="img-responsive" style={{height:"200px",margin:"auto"}}/>
                <h3 className="c_product_name">{this.state.item.name}</h3>
                <h5>({this.state.item.translated})</h5>
                <h4 style={{fontSize:'16px',marginBottom:'0px'}}>{this.state.item.quantity}</h4>
                <p><b>M.R.P <span style={{fontSize:"20px"}}>&#8377; {this.state.item.price}</span></b></p>
                {/* {
                    this.state.purchased ? 
                    // <div style={{marginTop:'28px'}}>
                    //     <span className="text-center">
                    //     <button className="c_round_btn" onClick={this.decrement.bind(this)}>-</button>
                    //     <input type="number" value={this.state.purchase_qty} readOnly style={{width:"40px",textAlign: "right"}} name="qty"/>
                    //     <button className="c_round_btn" onClick={this.increment.bind(this)}>+</button></span><br/>
                    // </div>
                    <div className="c_cart_remove">
                        <a><span className="c_cart_removeicon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Remove</a>
                    </div>
                    :
                    <button className="btn btn-success btn-block c_cart_btn" onClick={this.cart.bind(this,this.state.item.product_id, this.state.item)}>Add to Cart</button>
                } */}
                <button className="btn btn-success btn-block c_cart_btn" onClick={this.cart.bind(this,this.state.item.product_id, this.state.item)}>Add to Cart</button>
            </div>
            
        </div>
        )
    }
}

export default Item;