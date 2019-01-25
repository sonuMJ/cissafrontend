import React from 'react';
import Orderrows from './Orderrows';
import Cookies from 'js-cookie';

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

    Reorder(order_id){
        if(order_id !== ""){
            var token = Cookies.get("_token");
            var session = Cookies.get("sessionID");
            fetch("/api/product/reorder", {
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "token":token,
                    "sessionid":session
                },
                body:JSON.stringify({orderid:order_id})
            })
            .then(res =>{
                if(res.status === 200){
                    return res.json();
                }else{

                }
            })
            .then(result => {
                alert(result.message);
                this.props.refresh();
            }) 
        }
        
    }

    removeProduct(orderId, productId){
        fetch('/api/order/removeOrderProduct',{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({orderid:orderId,productid:productId})
        }).then(res => {
            if(res.status === 200){
                return res.json();
            }else{

            }
        }).then(result => {
            console.log(result);
            setTimeout(() => {
                this.props.refresh();
            }, 200);
            
        })
    }

    rmvUnwantOrders(orderId){
        fetch('/api/order/rmvunwantedorder',{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({orderid:orderId})
        }).then(res => {
            if(res.status == 200){
                return res.json();
            }else{

            }
        }).then(result => {
            this.props.refresh();
        })
    }


    render(){
        var key =0;
        return(
            <React.Fragment>
                
                {
                    this.state.loaded ?
                    this.state.orderdetail.map(i => {
                        return(<OrderTemplate rmvorder={this.rmvUnwantOrders.bind(this)} cancelProduct={this.removeProduct.bind(this)} reorder={this.Reorder.bind(this)} itemdetail={i} key={key++} click={this.Cancel.bind(this)}/>)
                       
                    })
                    :
                    <p>invalid</p>
                }
            </React.Fragment>
        )
    }
}



const OrderTemplate = (data) =>{
    //console.log(data.itemdetail);
    
    var d = new Date();
    var scheduledDate = new Date();
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    d.setTime(data.itemdetail.date);
    scheduledDate.setTime(data.itemdetail.scheduled_date)
    var month = months[d.getMonth()];
    var sMonth = months[scheduledDate.getMonth()];
    return(
        <div className="container">
            <div className="card">
                    <h4>OrderNo: {data.itemdetail.orderid} <span style={{float:'right'}}>{d.getDate()+" "+month+" "+d.getFullYear()}</span></h4>
                    <h5>Scheduled for: <span>{scheduledDate.getDate()+" "+sMonth+" "+scheduledDate.getFullYear()}</span></h5>
                    <table className="table table-hover  table-bordered table-responsive" style={{marginTop:'30px'}}>
                    <thead>
                        <tr className="active" style={{color:'#000'}}>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <thead>
                        {
                             <Orderrows orderids={data.itemdetail.orderid} remve={data.cancelProduct.bind(this)} rmvorder={data.rmvorder.bind(this)}/>
                        }
                    </thead>
                    </table>
                    {
                        data.itemdetail.status === 'Delivered' ? <img src="./img/de.png" alt="delivered" style={{transform: 'rotate(-20deg)',height: '50px',opacity: '0.8'}}/> :''
                    }
                    {
                        data.itemdetail.status === 'Cancelled' ? <img src="./img/cancel.png" alt="cancelled" style={{transform: 'rotate(-20deg)',height: '38px',opacity: '0.8'}}/> :''
                    }
                    <p>Status: {data.itemdetail.status}{
                        data.itemdetail.status === 'Delivered' ? <span><button className="btn" style={{float:'right',backgroundColor: '#12cc1a',color: 'white',fontWeight: '600'}} onClick={data.reorder.bind(this,data.itemdetail.orderid)}>Re order</button></span>: ''
                    }
                    {
                         data.itemdetail.status === 'Cancelled' ? <span><button className="btn" style={{float:'right',backgroundColor: '#12cc1a',color: 'white',fontWeight: '600'}} onClick={data.reorder.bind(this,data.itemdetail.orderid)}>Re order</button></span> :''
                    }
                    {
                        data.itemdetail.status === 'Pending Delivery' ? <span><button className="btn" style={{float:'right',backgroundColor: '#ffc107',color: 'white',fontWeight: '600'}} onClick={data.click.bind(this,data.itemdetail.orderid)}>Cancel Order</button></span> :''
                    }
                    </p>
                    
                </div>
        </div>
    )
}

export default Order;