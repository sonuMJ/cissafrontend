import React, { Component } from 'react';
import './App.css';
import { Switch , Route, Redirect } from 'react-router-dom';
import Searchbar from './components/headers/Searchbar';
import Topnav from './components/headers/Topnav';
import Mainframe from './components/workarea/MainFrame';
import Cartpage from './components/cart/Cartpage';
import Cookies from 'js-cookie';
import Confirmorder from './components/cart/Confirmorder';
import Yourorders from './components/workarea/Yourorders';


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
          <PrivateRoute path='/confirmorder' component={Confirmorder} />
          <PrivateRoute path='/yourorders' component={Yourorders} />
        </Switch>
      </div>
    );
  }
}
const fakeAuth = {
  isAuthenticated: true
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default App;
