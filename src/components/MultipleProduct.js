import React, { Component } from 'react'
import Multiple from './Multiple'
import Title from './Title'
import {storeProducts} from '../data1'
import {ProdConsumer1} from './Context1'

export default class MultipleProduct extends Component {
    state={
    products: storeProducts
    }
    render() {
        console.log(this.state.products);
        return (
         <React.Fragment>
         <div className="py-5">
         <div className="container">
         <Title name="different types" title="of kurties" />

         <div className="row">
             <ProdConsumer1>
             {(value)=>{
            return value.products.map((product) =>{
              return <Multiple key={product.id} product = {product}/>;
            });
          }}
             </ProdConsumer1>
         </div>
        </div>

            </div>
            </React.Fragment>
        )
    }
}
