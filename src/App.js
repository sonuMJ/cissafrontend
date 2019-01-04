import React, { Component } from 'react';
import './App.css';
import { Switch , Route } from 'react-router-dom';
import Searchbar from './components/headers/Searchbar';
import Topnav from './components/headers/Topnav';
import Mainframe from './components/workarea/MainFrame';
import Cartpage from './components/cart/Cartpage';

class App extends Component {
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
