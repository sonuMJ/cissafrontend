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
        
        setTimeout(() => {
            this.setState({
                orderdetail:this.props.orderdata,
                loaded:true
            })
        }, 100);
    }
    Cancel(a){
        this.props.cancelclick(a);
    }


    render(){
        console.log(this.state.orderdetail)
        return(
            <React.Fragment>
                
                {
                    this.state.loaded ?
                    this.state.orderdetail.map(i => {
                        return(<OrderTemplate itemdetail={i} key={i} click={this.Cancel.bind(this)}/>)
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
                    {
                        data.itemdetail.status == 'delivered' ? <img src="./img/de.png" style={{transform: 'rotate(-20deg)',height: '50px',opacity: '0.8'}}/> :''
                    }
                    {
                        data.itemdetail.status == 'cancelled' ? <img src="./img/cancel.png" style={{transform: 'rotate(-20deg)',height: '38px',opacity: '0.8'}}/> :''
                    }
                    <p>Status: {data.itemdetail.status}{
                        data.itemdetail.status == 'delivered' ? <span><button className="btn" style={{float:'right',backgroundColor: '#12cc1a',color: 'white',fontWeight: '600'}}>Re order</button></span>: ''
                    }
                    {
                         data.itemdetail.status == 'cancelled' ? <span><button className="btn" style={{float:'right',backgroundColor: '#12cc1a',color: 'white',fontWeight: '600'}}>Re order</button></span> :''
                    }
                    {
                        data.itemdetail.status == 'not delivered' ? <span><button className="btn" style={{float:'right',backgroundColor: '#ffc107',color: 'white',fontWeight: '600'}} onClick={data.click.bind(this,data.itemdetail.orderid)}>Cancel Order</button></span> :''
                    }
                    </p>
                    
                </div>
        </div>
    )
}

export default Order;