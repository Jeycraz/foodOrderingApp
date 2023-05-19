import React, { useContext, useEffect, useState } from 'react'
import './Headercard.css'
import {FaShoppingCart} from 'react-icons/fa'
import Headercount from '../../UI/Headercount/Headercount'
import Popup from '../Popup/Popup'
import CartContext from '../../context/CartContext'

function Headercard(props) {
  const [isBump,setIsBump] = useState(true)

  // Reducer function
  /* const {state} = useContext(OrderedCount)
  const updatedList = state */
  const [active,setIsActive] = useState(false)

  const cartCtx = useContext(CartContext)
  const {items} = cartCtx

  /* To get the foodAmount of the data - we use reducer function - to transform an array 
  of data into a single value - single data in this case. */

  /* 

  1. Reduce takes up two argument([function],[startingValue]) 
  2. first argument [function] -takes up two [arguments] inside - ([curNumber,item])
  *curNumber = the initial number value(accumulator) - in this case is 0
  *item = the list of Items

  */
  const numberOfCartItems = items.reduce((curNumber,item)=>{
    return curNumber + item.foodAmount

  },0);

  // use global state.items array to become the dependencies to depend on so that the useEffect only runs the function whenever
  //global.items.array changes
  useEffect(()=>{
    if(items.length === 0){
      return;
    }else{
      setIsBump(false)
      const timer = setTimeout(()=>{
        setIsBump(true)
      },300)

      //have a cleaning function so that it will not look buggy when you add item rapidly
      return ()=>{clearTimeout(timer)}
    }
  },[items])
  
  return (
        <>
        <div className={`headercard-container ${isBump?"":" bump"}`}
        onClick={()=>setIsActive(true)}>
    
            <div className="headercard-icon">
            <FaShoppingCart/>
                </div>
            <div className="headercard-text">{props.text}</div>
            {/* Put the total number into count props */}
            <Headercount count={numberOfCartItems}/>
        </div>
        <Popup open={active} onClose={()=>setIsActive(false)}/>
        </>
      )
}

export default Headercard

//My attempt - all wrong
  // const listAmount = updatedList.map((listEl)=>{
  //   return (
  //     listEl.foodAmount
  //   )
  // })
  
  // let sum = 0
  // for(let i=0;i<listAmount.length;i++){
  //   const eachItem = list[i]
  //   sum += eachItem
  // }

   // Reducer function
  /* const {state} = useContext(OrderedCount)
  const updatedList = state 
  const listAmount = updatedList.map((listEl)=>{
    return (
      listEl.foodAmount
    )
  })
  
  let sum = 0
  for(let i=0;i<listAmount.length;i++){
    const eachItem = listAmount[i]
    sum += eachItem
  } */