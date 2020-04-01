import React, { Component } from 'react'
import {storeProducts, detailProduct} from '../data1'
const PContext1 = React.createContext();



class Context1 extends Component {
    state={
        products: storeProducts,
        detailProduct: detailProduct,
        
      };
    render() {
        return (
            <PContext1.Provider value = {{
                ...this.state,
                

            }}>
             
                {this.props.children}
            </PContext1.Provider>      
        );
    }
}
const ProdConsumer1 = PContext1.Consumer;

export {Context1, ProdConsumer1};