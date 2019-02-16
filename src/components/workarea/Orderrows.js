import React from 'react';

class Orderrows extends React.Component{
    state = {
        productid:'',
        productdata:[],
        loaded:false
    }

    componentDidMount(){
        this.fetchOrderDetails(this.props.orderids);
    }

    componentWillReceiveProps(){
        
        this.fetchOrderDetails(this.props.orderids);
    }

    fetchOrderDetails(order_id){
        fetch("/api/order/productsbyorderid",{
            method:"POST",
            body:JSON.stringify({ orderid:order_id }),
            headers:{
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result == ""){
                console.log(result);
                
                //this.props.rmvorder(order_id);
            }else{
                this.setState({
                    productdata:result,
                    loaded:true
                })
            }
        })
    }

    removeProduct(pro_id){
        var c = window.confirm("Are you sure");
        if(c){
            if(this.props.orderids != null){
                this.props.remve(this.props.orderids, pro_id)
                }
        }
        
    }

    render(){
        var key = 0;
        return(
            <React.Fragment>
                {
                    this.state.loaded ?
                    this.state.productdata.map(i => {

                        return(<LoadProduct orderstatus={this.props.orderStatus} order={i.orderdetails} product={i.productdetails} key={key++} removeclick={this.removeProduct.bind(this)}/>)
                        
                    })
                    
                     : <tr><td colSpan="5" style={{color:"#bbb"}}>Loading...</td></tr>
                }
            </React.Fragment>
        )
    }
}

const LoadProduct = (data) =>{
    
    return(
            <tr>
                <td>{data.product.name}<span className="order_item_productid">{data.product.product_id}</span></td>
                <td>{data.order.quantity}</td>
                <td>{data.product.price}</td>
                <td>{parseInt(data.order.quantity)*parseInt(data.product.price)}</td>
                <td>
                    {
                        data.orderstatus === "Pending Delivery" ? 
                        <span className="c_item_remove_btn" onClick={data.removeclick.bind(this,data.product.product_id)}>&nbsp;</span>
                        :
                        null
                    }
                    </td>
            </tr>
    )
}

export default Orderrows;