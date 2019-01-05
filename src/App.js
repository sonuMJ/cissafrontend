import React, { Component } from 'react';
import './App.css';
import { Switch , Route } from 'react-router-dom';
import Searchbar from './components/headers/Searchbar';
import Topnav from './components/headers/Topnav';
import Mainframe from './components/workarea/MainFrame';
import Cartpage from './components/cart/Cartpage';
import Cookies from 'js-cookie';

class App extends Component {
  componentDidMount(){
    var cacheId = Cookies.get('_cid');
    if(cacheId == null){
      this.setCookie();
    }
  }
  setCookie(){
    var ran = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15)).toUpperCase();
    Cookies.set('_cid', ran, { expires: 7 });
  }
  render() {
    return (
      <div>
        <Searchbar />
        <Topnav />
        <Switch>
          {/* <Route path="/cart" exact  component={Cartpage}/> */}
          {/* <Route path="/" exact addtocart component={Mainframe} /> */}
          <Route path="/cart" exact component={Cartpage}/>
          <Route path="/" exact component={Mainframe}/>
        </Switch>
      </div>
    );
  }
}


export default App;
