import React from 'react';
import Cookies from 'js-cookie';

class Orderrows extends React.Component{
    state = {
        productid:'',
        productdata:[],
        loaded:false,
        processing:false
    }

    componentDidMount(){
        
        this.setState({
            productdata:this.props.items,
            loaded:true
        })
    }

    componentWillReceiveProps(){
        this.setState({
            productdata:this.props.items,
            loaded:true
        })
    }

    removeItem(orderId, productId){
        this.props.removeitem(orderId,productId);
    }



    // removeProduct(orderId, productId){

    //     var token = Cookies.get("_token");
    //     var session = Cookies.get("sessionID");

    //     //console.log(this.state.productdata.length);
    //     if(this.state.productdata.length <= 1){
    //         var last_c = window.confirm("There is only product left in this order.by clicking OK this order will be cancelled!");
    //     }else{
    //         var c = window.confirm("Are you sure");
    //     }
        
    //     if(c){
    //         this.setState({
    //             processing:true
    //         })
    //         if(productId != ""){
    //             fetch('/api/order/removeOrderProduct',{
    //                 method:'POST',
    //                 headers:{
    //                     "Content-Type": "application/json",
    //                     "token":token,
    //                     "sessionid":session
    //                 },
    //                 body:JSON.stringify({orderid:orderId,productid:productId})
    //             }).then(res => {
    //                 if(res.status === 200){
    //                     return res.json();
    //                 }else{
                        
    //                 }
    //             }).then(result => {
    //                 var productdata = [...this.state.productdata];
    //                 var index;
    //                 productdata.map(item => {
    //                     if(item.productid == productId){
    //                         index = productdata.indexOf(item);
    //                     }
    //                 })
    //                 if(index != -1){
    //                     productdata.splice(index, 1);
    //                     this.setState({
    //                         productdata,
    //                         processing:false
    //                     })
    //                 }
    //             })
    //         }
    //     }else if(last_c){
    //         this.props.cancelBtn(orderId);
    //     }
    // }

    render(){
        var key = 0;
        return(
            <React.Fragment>
                {
                    this.state.processing ? <Popup /> : null
                }
                {
                    this.state.loaded ?
                    this.props.items.map(i => {

                        return(<LoadProduct productDetails={i} key={i.id} removeclick={this.removeItem.bind(this)}/>)
                    })
                    : <tr><td colSpan="5" style={{color:"#bbb"}}>Loading...</td></tr>
                }
            </React.Fragment>
        )
    }
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

const LoadProduct = (data) =>{
    
    var orderDetails = data.productDetails;
    return(
            <tr>
                <td style={{display:'flex'}}>
                    <div style={{width:'14%'}} className="c_order_img">
                        <img src={orderDetails.img_url} alt={orderDetails.name} className="img-responsive"/>
                    </div>
                    <div >
                        {orderDetails.name}
                        <span className="order_item_productid">{orderDetails.productid}</span>
                    </div>
                    
                </td>
                <td>{orderDetails.price }&#8377;</td>
                <td>{orderDetails.quantity +" x "+ orderDetails.order_quantity}</td>
                <td>{orderDetails.total}&#8377;</td>
                <td>
                    {
                        orderDetails.status === "Pending Delivery" ? 
                        <span className="c_item_remove_btn" onClick={data.removeclick.bind(this,orderDetails.orderid,orderDetails.productid)}>&nbsp;</span>
                        :
                        null
                    }
                    </td>
            </tr>
    )
}

export default Orderrows;