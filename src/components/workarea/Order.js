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
        console.log(order_id);
        if(order_id != ""){
            var token = Cookies.get("_token");
            var session = Cookies.get("sessionID");
            fetch("http://localhost:5000/product/reorder", {
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
                if(res.status == 200){
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


    render(){
        console.log(this.state.orderdetail)
        return(
            <React.Fragment>
                
                {
                    this.state.loaded ?
                    this.state.orderdetail.map(i => {
                        return(<OrderTemplate reorder={this.Reorder.bind(this)} itemdetail={i} key={i} click={this.Cancel.bind(this)}/>)
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
                        data.itemdetail.status == 'delivered' ? <span><button className="btn" style={{float:'right',backgroundColor: '#12cc1a',color: 'white',fontWeight: '600'}} onClick={data.reorder.bind(this,data.itemdetail.orderid)}>Re order</button></span>: ''
                    }
                    {
                         data.itemdetail.status == 'cancelled' ? <span><button className="btn" style={{float:'right',backgroundColor: '#12cc1a',color: 'white',fontWeight: '600'}} onClick={data.reorder.bind(this,data.itemdetail.orderid)}>Re order</button></span> :''
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