import React from 'react';
import Item from './Item';
import Listviewitems from './Listviewitems';

class Listview extends React.Component{
    state = {
        products:[],
        output:[],
        update:false
    }

    componentDidMount(){
        this.setState({
            products:this.props.productlist,
            update:true
        })
    }
    componentWillReceiveProps(){
        // this.setState({
        //     update:false
        // })
        setTimeout(() => {
            this.setState({
                products:this.props.productlist,
                update:true
            })
        }, 100);
    }


    cartButtonAction(product_ID, product_item, qty){
        this.props.addtocart(product_ID, product_item, qty);
    }
    render(){
        var op ="";
        return(
            <div style={{marginTop:'14px'}}>
                {
                    this.state.update ?
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 c_listview_table">
                            <table className="table table-striped table-responsive">
                            <thead className="c_show_list_thead">
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th style={{width:'10%'}}>Action</th>
                                </tr>
                            </thead>
                                <tbody className="c_show_list_tbody">
                                    {
                                        Object.keys(this.state.products).map((item,i) => {
                                            //return <Item item={this.state.products[item]} cart={this.props.cart} key={i} cartbtnaction={this.cartButtonAction.bind(this)}/>
                                            return (<Listviewitems item={this.state.products[item]} cart={this.props.cart} key={i} cartbtnaction={this.cartButtonAction.bind(this)}/>)
                                        })
                                    }
                                    </tbody>
                                    </table>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                </div>
                            </div>
                    :
                    <h3 className="text-center"><img src="../img/product_loader.gif"/></h3>
                }
            </div>
        )
    }
}

export default Listview;