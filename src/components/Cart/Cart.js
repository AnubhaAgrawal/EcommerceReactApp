import React, { Component } from 'react';
import Title from '../Title';
import Cartcol from './Cartcol';
import EmptyCart from './EmptyCart'
import {ProdConsumer} from '../Context';
import CartListItem from './CartListItem'
import CartTotals from './CartTotals'


export default class Cart extends Component {
  render() {
    return (
    <section>
      <ProdConsumer>
        {value =>{
          const {cart} = value;
          if(cart.length > 0){
            return(
              <React.Fragment>
              <Title name="your" title="cart"/>
              <Cartcol/>
              <CartListItem value={value}/>
              <CartTotals value = {value} history = {this.props.history}/>
              </React.Fragment>
              );
          }
          else{
            return (<EmptyCart />);
          }
        }}
      </ProdConsumer>
     
    </section>
    
     
    );
  }
}
