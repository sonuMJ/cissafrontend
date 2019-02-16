import React from 'react';
import Orderrows from './Orderrows';
import Cookies from 'js-cookie';

class Order extends React.Component{

    state = {
        orderdetail:[],
        loaded:false,
        showModal:false,
        available:[],
        choosedOrderid:'',
        wait:false
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
    CheckAuth(){
        var token = Cookies.get("_token");
        var session = Cookies.get("sessionID");
        if(token !== undefined&&session !== undefined){
            return true;
        }else{
            return false;
        }
    }

    ReorderByOrderId(data){
        if(data !== ""){
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
                body:JSON.stringify({data:data})
            })
            .then(res =>{
                if(res.status === 200){
                    return res.json();
                }else{
                    alert("Something went wrong!!")
                }
            })
            .then(result => {
                alert(result.message);
                this.setState({
                    wait:false,
                    showModal:false
                })
                this.props.refresh();
            }) 
        }
    }

    Reorder(order_id){
        
        //show wait
        this.setState({
            wait:true
        })

        // var token = Cookies.get("_token");
        // var session = Cookies.get("sessionID");

        //get all product by order id
        fetch('/api/product/getproductsbyorderid',{
            method:'POST',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                body:JSON.stringify({orderid:order_id})
        })
        .then(res => res.json())
        .then(result => {
            if(result.length > 0){
                this.setState({
                    available:result,
                    showModal:true,
                    choosedOrderid:order_id,
                    wait:false
                })
            }else{
                //this.ReorderByOrderId(order_id);
            }
        })

        // var token = Cookies.get("_token");
        // var session = Cookies.get("sessionID");
        // fetch("/api/user/getallblacklistbyuserid",{
        //     headers:{
        //         "Content-Type": "application/json",
        //         // "Content-Type": "application/x-www-form-urlencoded",
        //         "token": token,
        //         "sessionid":session
        //     },
        //     method:'POST'
        // })
        // .then(res => {
        //     if(res.status == 423){
        //         this.props.parentProps.props.history.push('/locked');
        //     }else if(res.status == 200){
        //         this.ReorderByOrderId(order_id);
        //     }else if(res.status == 401){
        //         alert("Unauthorized User!!");
        //         Cookies.remove('_token', { path: '' });
        //         Cookies.remove('sessionID', { path: '' });
        //         this.props.parentProps.props.history.push('/');
        //     }
        // })
        
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
            setTimeout(() => {
                this.props.refresh();
            }, 200);
            
        })
    }

    rmvUnwantOrders(orderId){
        console.log("unwanted");
        
        // var token = Cookies.get("_token");
        // var session = Cookies.get("sessionID");
        fetch('/api/order/rmvunwantedorder',{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                // "token": token,
                // "sessionid":session
            },
            body:JSON.stringify({orderid:orderId})
        }).then(res => {
            if(res.status == 200){
                return res.json();
            }else if(res.status == 422){
                alert("Something went wrong!!")
            }else{
                Cookies.remove('_token', { path: '' });
                Cookies.remove('sessionID', { path: '' });
                this.props.history.push('/login');
            }
        }).then(result => {
            this.props.refresh();
        })
    }

    continuePurchase(){
        //wait
        this.setState({
            wait:true
        })
        var token = Cookies.get("_token");
        var session = Cookies.get("sessionID");
        fetch("/api/user/getallblacklistbyuserid",{
            headers:{
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                "token": token,
                "sessionid":session
            },
            method:'POST'
        })
        .then(res => {
            if(res.status == 423){
                this.props.parentProps.props.history.push('/locked');
            }else if(res.status == 200){
                this.ReorderByOrderId(this.state.available);
            }else if(res.status == 401){
                alert("Unauthorized User!!");
                Cookies.remove('_token', { path: '' });
                Cookies.remove('sessionID', { path: '' });
                this.props.parentProps.props.history.push('/');
            }
        })
    }

    closeModal(){
        this.setState({
            showModal:false
        })
    }

    changeQty(product_id,e){
        var available = [...this.state.available];
        
        var index;
        available.map(item => {
            if(item.product.product_id == product_id){
                index = available.indexOf(item);
            }
        })
        available[index].qty = e.target.value;
        this.setState({
            available
        })
    }
    
    CancelOrder(order_id){
        if(order_id !== ""){
            var token = Cookies.get("_token");
            var session = Cookies.get("sessionID");
            
            fetch("/api/order/cancelorder",{
                method:"POST",
                body:JSON.stringify({orderid:order_id}),
                headers:{
                    "Content-Type": "application/json",
                    "token":token,
                    "sessionid":session
                }
            })
            .then(res => res.json())
            .then(result => {
                //this.ShowOrderDetails();
                alert(result.message);
                console.log(this.props.orderdata);
                if(this.state.orderdetail != ""){
                    var orderdetail = [...this.state.orderdetail];
                    var index = orderdetail.findIndex(e => e.orderid === order_id );
                    orderdetail[index].status = "Cancelled";
                    this.setState({
                        orderdetail
                    })
                }
            })
        }
        
    }

    render(){
        var key =0;
        return(
            <React.Fragment>
                {
                    this.state.wait ? <Popup /> : 
                    <div>
                        {
                            this.state.showModal ? <Showmodal qtychange={this.changeQty.bind(this)} continuePurchase={this.continuePurchase.bind(this)} data={this.state.available} closebtn={this.closeModal.bind(this)}/> : null
                        }
                        {
                            this.state.loaded ?
                            
                            this.state.orderdetail.map(i => {
                                var cancelBtn = false;
                                var _today = new Date();
                                var EndDate = new Date();
                                var _d = new Date(parseInt(i.date));
                                EndDate.setDate(_d.getDate() + + (5 - 1 - _d.getDay() + 7) % 7 + 1);  // friday
                                if(new Date(_today) < new Date(EndDate)){
                                    //
                                    cancelBtn = true
                                }
                                return(<OrderTemplate rmvorder={this.rmvUnwantOrders.bind(this)} cancelBtn={cancelBtn}  cancelProduct={this.removeProduct.bind(this)} reorder={this.Reorder.bind(this)} itemdetail={i} key={key++} click={this.CancelOrder.bind(this)}/>)
                            
                            })
                            :
                            <p>invalid</p>
                        }
                    </div>
                }
                
            </React.Fragment>
        )
    }
}



const OrderTemplate = (data) =>{
   // console.log(data.cancelBtn);
    
    var d = new Date();
    var scheduledDate = new Date();
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    d.setTime(data.itemdetail.date);
    // //get end date
    // var EndDate = new Date();
    // EndDate.setDate(d.getDate() + + (5 - 1 - d.getDay() + 7) % 7 + 1);  // friday
    // //get today 
    // var today = new Date();
     scheduledDate.setTime(data.itemdetail.scheduled_date);
    // //compare date
    //     if(new Date(today) > EndDate){
    //         console.log(EndDate);
    //     }
        
        
    // //
    var month = months[d.getMonth()];
    var sMonth = months[scheduledDate.getMonth()];
    return(
        <div className="container c_order_row">
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
                             <Orderrows orderids={data.itemdetail.orderid} orderStatus={data.itemdetail.status} remve={data.cancelProduct.bind(this)} rmvorder={data.rmvorder.bind(this)}/>
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
                        data.itemdetail.status === 'Pending Delivery'&&data.cancelBtn ? <span><button className="btn" style={{float:'right',backgroundColor: '#ffc107',color: 'white',fontWeight: '600'}} onClick={data.click.bind(this,data.itemdetail.orderid)}>Cancel Order</button></span> :''
                    }
                    </p>
                    
                </div>
        </div>
    )
}

const Showmodal = (modal) => {
    var data = modal.data;
    return(
        <div id="myModal" className="modal_c">
            <div className="modal-content_c">
                <div className="modal-header_c">
                    <span className="close_c" onClick={modal.closebtn.bind(this)}>&times;</span>
                    <h2>These item(s) are only available</h2>
                </div>
                <div className="modal-body_c">
                    {
                        data.map((item,i) => {
                            return(<Itemtemplate itemdetail={item} qtychange={modal.qtychange.bind(this)} key={i}/>)
                        })
                    }
                </div>
                <div className="modal-footer_c">
                    <button className="btn c_btn_un" onClick={modal.continuePurchase.bind(this)}>Continue</button>
                </div>
            </div>
        </div>
    )
}

const Itemtemplate = (data) => {
    var itemData = data.itemdetail.product;
    var _html=[];
    for(var i=1; i<=10;i++){
        _html.push(<option value={i} key={i}>{i}</option>)
    }
    return(
        <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4" >
                <img src={itemData.img_url} alt={itemData.name} className="img-responsive"/>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
                <h4 style={{marginTop: '12px',marginBottom: '2px',textTransform:'capitalize'}}>{itemData.name}</h4> 
                <i style={{color:'#8e8e8e'}}>{itemData.product_id}</i>
                <h5>Quantity: 
                    <select value={data.itemdetail.qty} onChange={data.qtychange.bind(this, itemData.product_id)}>
                        {
                           _html
                        }
                    </select>
                </h5>
            </div>
        </div>
    )
}

const Popup = (p) => {
    return(
        <div className="popup">
            <div className="popup-inner" style={{width:'230px',height:'100px',backgroundColor:'transparent',textAlign:'center',color:'#fff'}}>
                <h3>Please wait...</h3>
            </div>
        </div>
    )
}


export default Order;