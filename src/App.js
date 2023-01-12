import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(item => {
      if (item.id === id) {
        // console.log(item)
        return {...item, quantity: item.quantity + 1}
      }
      return {...item}
    })
    // console.log(updatedList)
    this.setState({
      cartList: [...updatedList],
    })
  }

  decrementCartItemQuantity = id => {
    let {cartList} = this.state
    const item = cartList.find(eachItem => eachItem.id === id)
    console.log(item.quantity)
    if (item.quantity === 1) {
      cartList = cartList.filter(eachItem => eachItem.id !== id)
    } else {
      cartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return {...eachItem}
      })
    }

    // console.log(updatedList)

    this.setState({cartList: [...cartList]})
  }

  removeCartItem = id => {
    this.setState(prevState => {
      let {cartList} = prevState
      cartList = cartList.filter(item => item.id !== id)
      return {cartList: [...cartList]}
    })
  }

  addCartItem = product => {
    const cartList = this.state
    // console.log(cartList.cartList)
    const index = cartList.cartList.findIndex(item => item.id === product.id)

    // console.log(index)

    if (index === -1) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedList = cartList.cartList.map(item => {
        // console.log(item.quantity)
        if (item.id === product.id) {
          return {...item, quantity: item.quantity + product.quantity}
        }
        return {...item}
      })
      //   console.log(updatedList)
      this.setState({
        cartList: [...updatedList],
      })
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
