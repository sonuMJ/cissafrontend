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
            this.setState({
                productdata:result,
                loaded:true
            })
        })
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.state.loaded ?
                    this.state.productdata.map(i => {
                        return(<LoadProduct order={i.orderdetails} product={i.productdetails} key={i}/>)
                        
                    })
                    
                     : <td>no data</td>
                }
            </React.Fragment>
        )
    }
}

const LoadProduct = (data) =>{
    //console.log(data);
    
    return(
            <tr>
                <td>{data.product.product_id}</td>
                <td>{data.product.name}</td>
                <td>{data.order.quantity}</td>
                <td>{data.product.price}</td>
                <td>{parseInt(data.order.quantity)*parseInt(data.product.price)}</td>
            </tr>
    )
}

export default Orderrows;