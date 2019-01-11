import React from 'react';
import Orderrows from './Orderrows';

class Order extends React.Component{

    state = {
        orderdetail:[],
        loaded:false
    }

    componentDidMount(){
        this.setState({
            orderdetail:this.props.orderdata,
            loaded:true
        })
        setTimeout(() => {
        }, 100);
    }

    componentWillReceiveProps(){

    }


    render(){
        return(
            <React.Fragment>
                
                {
                    this.state.loaded ?
                    this.state.orderdetail.map(i => {
                        return(<OrderTemplate itemdetail={i} key={i}/>)
                    })
                    :
                    <p>invalid</p>
                }
            </React.Fragment>
        )
    }
}

const OrderTemplate = (data) =>{
    console.log(data.itemdetail);
    
    var d = new Date();
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    d.setTime(data.itemdetail.date);
    var month = months[d.getMonth()];
    return(
        <div className="container">
            <div className="card">
                    <h4>OrderNo: {data.itemdetail.orderid} <span style={{float:'right'}}>{d.getDate()+" "+month+" "+d.getFullYear()}</span></h4>
                    <h5>Scheduled for: 12*45-45</h5>
                    <table className="table table-hover  table-bordered table-responsive" style={{marginTop:'30px'}}>
                    <tbody>
                        <tr className="active" style={{color:'#000'}}>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                        {
                             <Orderrows orderids={data.itemdetail.orderid}/>
                        }
                    </tbody>
                    </table>
                    <p>Status: {data.itemdetail.status}</p>
                </div>
        </div>
    )
}

export default Order;