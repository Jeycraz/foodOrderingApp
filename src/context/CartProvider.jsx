import React, { useReducer } from "react";
import CartContext from "./CartContext";

/*
Steps Involved In CartProvider
---------------------------------------
1. Import 'CartContext' to get access to createContext()
2. Use "Cartcontext" provider to wrap all the children components
3. Create an object variable to store the data and function pointer (Just like "createContext")
4. Create two function 'addItemToCartHandler' that receives 'item' as argument & 'removeItemFromCartHandler" that receives "id" as argument
5. put value props to provider

By creating a separate context provider function component,
our app logic becomes lean and the store management is fixed to one place.

*/

//Wont need anything from that component

const defaultState = {
  items:[],
  totalAmount:0
}

/*
Reducer Function
============================
- State - the last state snapshot by the reducer function
- Action - the action we have to used in the function
*/
const cartReducer = (state,action) =>{
  switch (action.type){
    case 'ADD':{

      //The action.item.(property) is gotten from <List.jsx> cartContext.addItem({id:,name:,foodAmount:,price:,})
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.foodAmount;
      
      /* How To Solve The Problem To Determine whether the item already existed in state.items array*/
      // Solution: Return the index of the first Element in an array that meet the provided testing function
      const existingItemIndex = state.items.findIndex((item)=>{
        return item.id === action.item.id
      })

      const existingItemCart = state.items[existingItemIndex]
      let updateItem;
      let updateItems;

      if(existingItemCart){
        updateItem = {
          ...existingItemCart,
          foodAmount: existingItemCart.foodAmount + action.item.foodAmount
        }
        //Copy the existing state.items
        updateItems = [...state.items]
        updateItems[existingItemIndex] = updateItem
      }
      
      else{
        /* 
      Use concat() because it will returns a new state object with the new array 
      to prevent the object reference inequality from happening 
      */
        updateItems = state.items.concat(action.item)
      }

      // return an object with items & totalAmount property is pointed to arranged
      return {
        items:updateItems,  
        totalAmount:updatedTotalAmount,
      }
    }

    case 'REMOVE':{
      const existingItemIndex= state.items.findIndex((item)=>item.id === action.id )
      const existingItem = state.items[existingItemIndex]
      const updatedTotalAmount = state.totalAmount - existingItem.price
      let updateItems;

      if(existingItem.foodAmount === 1){
        updateItems = state.items.filter(list=>{
          // Wrong method
          // return list.id != action.id
          return action.id !== list.id 
        })
        
      }else{
        const updateItem = {
          ...existingItem,
          foodAmount: existingItem.foodAmount - 1
        }
        updateItems = [...state.items]
        // Overwrite the existing data with the newly updated data!
        updateItems[existingItemIndex] = updateItem
      }
      return {
        items:updateItems,
        totalAmount:updatedTotalAmount
      }
    }

    case "CLEAR":{
      return defaultState
    }
  }

  return defaultState
}

function CartProvider(props) {

  // the useReducer returns two value and we use array deconstructuring to "pull" out the value
   const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultState)

  const addItemToCartHandler = (item)=>{
     dispatchCartAction({type:"ADD", item:item})
  }

  const removeItemFromCartHandler = (id)=>{
    dispatchCartAction({type:"REMOVE",id:id})
  }

  const clearCartHandler = ()=>{
    dispatchCartAction({type:"CLEAR"})
  }
  
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,

    // Holds the pointer for the add item functions
    addItem:addItemToCartHandler,

    // Holds the pointer for remove item functions
    removeItem:removeItemFromCartHandler,

    clearItem:clearCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider

/*const reducer = (state, action) => {
    switch (action.type) {
      case 'addArray':
        return [...state, ...action.payload];
  
      case 'addCounter':
        const updatedData = state.map(item => {
          if (item.foodName === action.payload.name) {
            return {
              ...item,
              foodAmount: item.foodAmount += 1
            }
          }
          return item
        })
        return updatedData
           
  
      default:
        return state;
      }
    }


function CounterProvider({children}){
    const [state,dispatch] = useReducer(reducer,initialState);


    return(
        <OrderedCount.Provider value={{state,dispatch}}>
            {children}
        </OrderedCount.Provider>

    )
}

export default CounterProvider */