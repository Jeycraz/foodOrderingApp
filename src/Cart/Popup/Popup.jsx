import React, { useState,useEffect, useContext } from 'react'
import './Popup.css'
import ReactDOM from 'react-dom'
import Updatelist from '../../UI/Updatelist/Updatelist'
import CartContext from '../../context/CartContext'
import Checkout from './Checkout'

function Popup(props) {
  const [isOrdered,setIsOrdered] = useState(false)

  //Get the context value with state
  //Get the dispatch value with "dispatch"
  const contextCtx = useContext(CartContext)
  const updatedList = contextCtx.items

  const ctxTotalAmount = parseFloat(contextCtx.totalAmount.toFixed(2));

  // Verify whether it's length is bigger than 0
  const hasItem = contextCtx.items.length>0

  const [isOpen,setIsOpen] = useState(props.open)

  //set Up isLoading state 
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [isSubmitted,setIsSubmitted] = useState(false)
  const [isClick,setIsClick] = useState(false)

  //After initialized on first rendered, continue to listen to props.open//
  useEffect(()=>{
    setIsOpen(props.open)
  },[props.open])
  
  const onOrderHandler = ()=>{
    //Open the details container
    setIsOrdered(true)
    console.log('ordering...')
  }
  
  //When Onclose//
  const onCloseHandler=()=>{
    setIsOpen(false)
    props.onClose()
  }

  //Copy the whole list itself but change the foodAmount to 1
    const onCounterAdd = (list)=>{
      contextCtx.addItem({...list,foodAmount:1})
    }

  //callBack to get the id value
  const onRemove=(id)=>{
    contextCtx.removeItem(id)
  }
  
  const onCloseCheckoutHandler=()=>{
    setIsOrdered(false)
  }

  const onSubmitHandler = (value)=>{
      setIsClick(true)
      setIsSubmitted(false)
      setIsSubmitting(true)
      async function submitData(){
      
      //"gets" the value and put the value inside the fullArr object
      const fullArr = [{
        orderedMeal:updatedList,
        users:value
      }]
          
        try{
        const response = await fetch('https://food-menu-d90f8-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(fullArr)
          })
        setIsSubmitting(false)
        setIsSubmitted(true)
        contextCtx.clearItem()

        if(!response.ok){

        }
      }

        catch(err){
            setIsSubmitting(false)
            setIsSubmitted(false)
            throw new Error(err)
        }
    }

      submitData()
    }
  

  console.log(contextCtx.items)

  return (
    ReactDOM.createPortal(
      <div className={`popup-container-black ${isOpen?'active':''}`}>
        <div className="popup-inner-container">
          {updatedList.map((listEl,index)=>{
            return(
              <Updatelist
              isOrdered={isOrdered}
              key={listEl.id}
              name={listEl.name}
              price={listEl.price}
              count={listEl.foodAmount}
              onCounterAdd={onCounterAdd.bind(null,listEl)}
              onRemove={onRemove.bind(null,listEl.id)}
              />
            )
          })}

        <div className="total-amount">
          <h1>Total Amount</h1>
          <h1>${ctxTotalAmount}</h1>
        </div>
        
        {/*When order button is clicked, then the checkout form will show up */}
          {isOrdered?<Checkout isShow={isOrdered} onCloseCheckOut={onCloseCheckoutHandler} onSubmit={onSubmitHandler}/>:""}

        <div className="popup-button-container">
          <div className="button-close-container" onClick={onCloseHandler}>
            Close
          </div>

          {hasItem && <div className="button-order-container" onClick={onOrderHandler}>
            {isSubmitting?<p>data is submitting</p>:
            !isSubmitting && isSubmitted ? <p>Item submitted</p>
            :<p>Order</p>}
          </div>}

        </div>  

          <div className={`order-finish ${isClick?"active":""}`}>
            <p>Item successfully sent to Firebase database.</p>
            <div className="button-close-container" onClick={onCloseHandler}>
              Close
            </div>
          </div>

        </div>

      </div>
      
      ,document.getElementById("popup")
    )
  )
}

export default Popup