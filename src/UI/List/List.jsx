import React, { useEffect, useState,useRef,useContext } from 'react'
import Input from './InputComponent/Input'
import CartContext from '../../context/CartContext'
import './List.css'

const List = (props)=> {
    const cartContext = useContext(CartContext)

    // Create an inputRef - So that we can get access to the input through refs
    const inputRef = useRef()

    //Create a state variable
    const [isEnteredAmountValid,setIsEnteredAmountValid] = useState(true)

   const onSubmitHandler=(e)=>{
    e.preventDefault()
    //The inputed data is always returned as "string"
    const enteredAmount = inputRef.current.value
    
    // Add "+" to make it a number
    const enteredAmoungNum = +enteredAmount
    
    // Check form validation 
    if(inputRef.current.value.trim().length ===0 || 
        enteredAmoungNum < 0 || 
        enteredAmoungNum > 5)
    {
        setIsEnteredAmountValid(false)
        return;
    }

    const addItemToCartHandler = (enteredNum) => {

        cartContext.addItem({
            id:props.id,
            name:props.name,
            foodAmount:enteredNum,
            price:props.price,
        })
    }
    addItemToCartHandler(enteredAmoungNum)

    // const listItem = 
    //     {
    //         foodName:props.name,
    //         foodAmount:+amount,
    //         foodPrice:props.price,
    //       }
    
    /* To pass this '[listItem] as an argument and not listItem,
    so that new array that contains a single element' */
    // props.updateListHandler([listItem])

    /*Aim To Do Next:
    Create a global context variable and store the item list into the context variable ONCE ADDED.*/
}

  return (
    <div className='list-container'>
        <div className="list-detail-container">
            <h1 className='list-name'>{props.name}</h1>
            <h3 className='list-description'>{props.description}</h3>
            <h1 className='list-price'>${props.price}</h1>

        </div>
        <form onSubmit={onSubmitHandler} className='form-container'>
            <Input
            ref={inputRef}
            label="Amount"
            input={{
                id:props.id,
                type:'number',
                min:'1',
                max:'5',
                defaultValue:'1',
                step:"1",
            }}>
            </Input>

            {/* 
                My Attempt!
                <div className="input-container">
                <label htmlFor="amount" className='label-text'>Amount</label>
                <input type="number"
                // Receive forward ref //
                ref={ref}  
                id={props.name}
                min='1' 
                max='5'
                defaultValue="1"
                step="1"
                value={amount} 
                className="input-style"
                // Use onchange to update the amount value
                onChange={(e)=>setAmount(e.target.value)} 
                />
            </div> */}

            <button type="submit" className='add-button'>{`+ Add`}</button>
            {!isEnteredAmountValid && <p>Please enter value between 1-5</p>}
        </form>
    </div>
  )
}

export default List