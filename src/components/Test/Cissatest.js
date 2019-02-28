import React from 'react';

class Cissatest extends React.Component{
    state = {
        orders:[],
        orderids:[]
    }

    componentDidMount(){
        this.fetchData();
        this.showChild();
    }
    fetchData(){
        fetch('http://localhost:5000/api/order/ordersbyuserid',{
            method:'POST'
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                orders:result
            })
        })
    }

    showChild(){
        setTimeout(() => {
            if(this.state.orders != ""){
                var _s = new Set();
                this.state.orders.map(i => {
                    
                    _s.add(i.orderid);
                })
                this.setState({
                    orderids:_s
                })
                // setTimeout(() => {
                //     console.log(this.state.orderids);
                    
                // }, 100);
                
            }else{
                console.log("no orders");
            }
        }, 200);
    }

    render(){
            var parent = [];
            var orderss = Array.from(this.state.orderids).map(j => {
                    var child = [];
                    this.state.orders.map(i => {
                        if(j == i.orderid){
                            //child.push(i);
                            child.push(i)
                        }
                    })
                    //console.log(child);
                    console.log("---");
                    parent.push(child);
                    // console.log(parent);
                    
                })
        
        return(
           <div>
               <Tableview itemss={parent}/>
           </div>
        )
    }
}

const Child = (c) => {
    console.log(c.items);
    
    return(
        <React.Fragment>
            {
                c.items.map(item => {
                    return(
                        <div>
                            <ul>
                                <li>{item.name}</li>
                            </ul>
                        </div>
                        
                    )
                })
            }
        </React.Fragment>
    )
}

const Tableview = (item) => {
    console.log(item.itemss);
    
    return(
        <div>
            <h3>Table view</h3>
            {
                item.itemss.map(item => {
                    return(
                        <div>
                            <h4>{(item[0].orderid)}</h4>
                             <Child items={item}/>
                        </div>
                    ) 
                    
                   
                })
            }
        </div>
    )
}

export default Cissatest;