import React, { Component } from 'react';
import './App.css';
import { Switch , Route, Redirect } from 'react-router-dom';
import Mainframe from './components/workarea/MainFrame';
import Cartpage from './components/cart/Cartpage';
import Cookies from 'js-cookie';
import Confirmorder from './components/cart/Confirmorder';
import Yourorders from './components/workarea/Yourorders';
import Login from './components/user/Login';
import Registration from './components/user/Registration';



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
        
        <Switch>
          {/* <Route path="/cart" exact  component={Cartpage}/> */}
          {/* <Route path="/" exact addtocart component={Mainframe} /> */}
          <Route path="/cart" exact component={Cartpage}/>
          <Route path="/" exact component={Mainframe}/>
          <Route path="/login/:path" exact component={Login}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Registration}/>
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
