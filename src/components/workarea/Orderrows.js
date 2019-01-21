import React from 'react';

class Orderrows extends React.Component{
    state = {
        productid:'',
        productdata:[],
        loaded:false
    }

    componentDidMount(){
        //console.log(this.props.orderids);
        this.fetchOrderDetails(this.props.orderids);
        setTimeout(() => {
            //console.log(this.state.productdata);
            
        }, 100);
    }

    componentWillReceiveProps(){
        //console.log(this.props.orderids);
        this.fetchOrderDetails(this.props.orderids);
        setTimeout(() => {
            //console.log(this.state.productdata);
            
        }, 100);
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
                    
                     : <th>no data</th>
                }
            </React.Fragment>
        )
    }
}

const LoadProduct = (data) =>{
    //console.log(data);
    
    return(
        
            <tr>
                <th>{data.product.product_id}</th>
                <th>{data.product.name}</th>
                <th>{data.order.quantity}</th>
                <th>{data.product.price}</th>
                <th>{parseInt(data.order.quantity)*parseInt(data.product.price)}</th>
            </tr>
    )
}

export default Orderrows;