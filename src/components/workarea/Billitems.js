import React from 'react';

class Billitems extends React.Component{
    state ={

    }

    componentDidMount(){
        //console.log(this.props.itemDetail);
        
    }
    componentWillReceiveProps(){
        
    }

    incrementQty(prod_id,qty){
        this.props.increment(this,prod_id,qty);
    }
    decrementQty(prod_id,qty){
        this.props.decrement(this,prod_id,qty);
    }
    removeItem(prod_id){
        this.props.remove(this,prod_id);
    }

    render(){
        var item = this.props.itemDetail;
        return(
            <React.Fragment>
                
                <div className="row" key={item.productId} style={{marginBottom:'10px'}}>
                    <div className="col-lg-4 c_bill_itemimage ">
                        <img src={item.productData[0].img_url} className="img-responsive"/>
                    </div>
                    <div className="col-lg-8 c_bill_itemdetails">
                        <p className="c_bill_text"><b>{item.productData[0].name}({item.productData[0].translated})</b></p>
                        <p className="c_bill_text"><b style={{color:'#909090'}}>MRP : {item.productData[0].price}</b></p>
                        <p className="c_bill_text">{item.productData[0].quantity} x {item.quantity}<span className="c_item_remove_btn" onClick={this.removeItem.bind(this,item.productId)}>&nbsp;</span></p>
                        <p className="c_bill_text">&#8377; {item.total} &nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p>
                            <span className="text-center">
                                <button className="c_round_btn" onClick={this.decrementQty.bind(this,item.productId,item.quantity)}>-</button>
                                <input type="number" value={item.quantity} readOnly style={{width:"40px",textAlign: "right"}} name="qty"/>
                                <button className="c_round_btn" onClick={this.incrementQty.bind(this,item.productId,item.quantity)}>+</button>
                            </span>
                        </p>
                    </div>
                </div>
               
                <hr className="c_bill_linebreak"/>
            </React.Fragment>
        )
    }
}

export default Billitems;