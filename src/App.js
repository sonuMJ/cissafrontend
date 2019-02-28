import React, { Component } from 'react';
import './App.css';
import { Switch , Route, Redirect } from 'react-router-dom';
import Mainframe from './components/workarea/MainFrame';
import Cartpage from './components/cart/Cartpage';
import Cookies from 'js-cookie';
import Confirmorder from './components/cart/Confirmorder';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import Verifyaccount from './components/user/Verifyaccount';
import Settings from './components/user/Settings';
import Forgotpwd from './components/user/Forgotpwd';
import Resetpassword from './components/user/Resetpassword';
import Filenotfound from './components/workarea/Filenotfound';
import Books from './components/Books/Books';
import Locked from './components/user/Locked';
import Cissatest from './components/Test/Cissatest';
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
        
        <Switch>
          {/* <Route path="/cart" exact  component={Cartpage}/> */}
          {/* <Route path="/" exact addtocart component={Mainframe} /> */}
          <Route path="/test" exact component={Cissatest}/>
          <Route path="/cart" exact component={Cartpage}/>
          <Route path="/" exact component={Mainframe}/>
          <Route path="/login/:path" exact component={Login}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/books" exact component={Books}/>
          <Route path="/forgotpassword" exact component={Forgotpwd}/>
          <Route path="/resetpassword/:verif_code?/:email" exact component={Resetpassword}/>
          <Route path="/register" exact component={Registration}/>
          <Route path="/verifyaccount/:verif_code" exact component={Verifyaccount}/>
          <PrivateRoute path='/confirmorder' component={Confirmorder} />
          <PrivateRoute path='/settings' component={Settings} />
          <PrivateRoute path='/yourorders' component={Yourorders} />
          <PrivateRoute path='/locked' component={Locked} />
          <Route component={Filenotfound}/>
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
