import React, { Component } from 'react'
import {storeProducts, detailProduct} from '../data'

const PContext = React.createContext();

//Provider
//Consumer
class Context extends Component {
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
      };
      componentDidMount(){
          this.setProducts();
      }
      setProducts = () =>{
          let tempproducts = [];
          storeProducts.forEach(item =>{
              const singleItem = {...item};
              tempproducts = [...tempproducts,singleItem];

          });
          this.setState(()=>{
              return {products:tempproducts};
          });
    };
     
getItem = (id) =>{
    const product = this.state.products.find(item => item.id === id);
    return product;
}
handleDetail =(id)=>{
    const product = this.getItem(id);
    this.setState(() =>{
        return{detailProduct:product}
    })
    //console.log('hello from detail');
};

addToCart =(id)=>{
    //console.log(`hello from cart.id is ${id}`);
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(() =>{
        return {products: tempProducts, cart:[...this.state.cart, product]};
    }, () =>{

        //console.log(this.state);
        this.addTotals();
    })
    
};

openModal = id =>{
    const product = this.getItem(id);
    this.setState(() =>{
        return {modalProduct:product, modalOpen: true}
    })
}

closeModal = () =>{
    this.setState(() =>{
        return {modalOpen:false}
    })
};


increment=(id)=>{
    //console.log('this is increment method');
    let tempCart =[...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id)
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count*product.price;

    this.setState(()=>{
        return {cart: [...tempCart]}
    }, () =>{ this.addTotals()})

}
decrement=(id)=>{
    //console.log('this is decrement method');
    let tempCart =[...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id)
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if(product.count === 0){
        this.removeItem(id)
    }
    else{
    product.total = product.count*product.price;

    this.setState(()=>{
        return {cart: [...tempCart]}
    }, () =>{ this.addTotals()})
}
};

removeItem = (id) =>{
    //console.log('item removed');
    let tempProducts =[...this.state.products];
    let tempCart =[...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id); // filter items and store that are not equal to selected id 
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = false;
    removedProduct.total = false;

    this.setState(()=>{
        return{
            cart:[...tempCart],
            products: [...tempProducts]
        }
    }, ()=>{
        this.addTotals();
    })
}

clearCart=()=>{
    //console.log('cart was cleared');
    this.setState(()=>{
        return{ cart:[]}
    }, ()=>{
        this.setProducts();
        this.addTotals(); // total is also updated
    })
}

addTotals =()=>{
    let subTotal=0;
    this.state.cart.map(item=>(subTotal += item.total));
    const tempTax = subTotal*0.08;
    const tax = parseFloat(tempTax.toFixed(3));
    const total = subTotal + tax
    this.setState(()=>{
        return {
            cartSubTotal:subTotal,
            cartTax:tax,
            cartTotal:total
        }
    })
}

/*tester = () =>{
    console.log('State products :', this.state.products[0].inCart);
    console.log('Data products :', storeProducts[0].inCart);
    const tempProducts = [...this.state.products];
    tempProducts[0].inCart = true
    this.setState(()=>{
        return {products: tempProducts}
    }, () =>{
        console.log('State products :', this.state.products[0].inCart);
        console.log('Data products :', storeProducts[0].inCart); 
    })
} */
    render() {
        return (
            <PContext.Provider value = {{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart

            }}>
               {/*<button onClick={this.tester}>test me</button> */}
                {this.props.children}
            </PContext.Provider>      
        )
    }
}


const ProdConsumer = PContext.Consumer;

export {Context, ProdConsumer};