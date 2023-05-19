/* This is global context lists that store ordered/clicked items */

import React from "react";

// Create the initialize value 
 const CartContext = React.createContext({
  //Create the initial state
  items:[],
  totalAmount:0,
  addItem:(item)=>{},
  removeItem:(id)=>{}
})

export default CartContext