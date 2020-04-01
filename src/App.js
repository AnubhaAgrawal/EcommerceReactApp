import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import MultipleProduct from './components/MultipleProduct';
import Default from './components/Default';
import Cart from './components/Cart/Cart';
import Details from './components/Details';
import Modal from './components/Modal'
import SignInScreen from './components/SignInScreen'
function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Switch>
      <Route exact path="/" component={MultipleProduct}/>
        <Route path="/productlist" component={ProductList}/>
        <Route path="/signin" component={SignInScreen}/>
        <Route path="/details" component={Details}></Route>
        <Route path="/cart" component={Cart}/>
        {/*<Route path="/" component={ProductList}/>  // Place Here or use exact keyword*/} 
        <Route component={Default}/>
      </Switch>
      <Modal></Modal>
    </React.Fragment>
  );
}

export default App;
