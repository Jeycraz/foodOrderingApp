import React, { useState } from 'react'
import './Checkout.css'
import useInput from './useInput'

function Checkout(props) {
// A form to get all the available data needed to send items
const isShow = props.isOrdered

const onSubmitHandler =(e)=>{
    e.preventDefault()
    console.log('item is submitted')

    //Each value is extracted from each useState //
    const users = {
        name:nameValue,
        street:streetValue,
        city:cityValue,
        postal:postalValue,
    }
    props.onSubmit(users)
    onNameReset()   
    onStreetReset()
    onCityReset()
    onPostalReset()
}

const {enteredValue:nameValue,
    isTouched:nameTouched,
    isValueValid:isNameValueValid,
    onChangeHandler:onNameValueHandler,
    onFocusHandler:onNameFocusHandler,
    onLeaveHandler:onNameLeaveHandler,
    onReset:onNameReset,
    } = useInput(value => value.trim() === "")

const {enteredValue:streetValue,
    isTouched:streetTouched,
    isValueValid:isStreetValueValid,
    onChangeHandler:onStreetValueHandler,
    onFocusHandler:onStreetFocusHandler,
    onLeaveHandler:onStreetLeaveHandler,
    onReset:onStreetReset,
    } = useInput(value => value.trim() === "")

const {enteredValue:cityValue,
    isTouched:cityTouched,
    isValueValid:isCityValueValid,
    onChangeHandler:onCityValueHandler,
    onFocusHandler:onCityFocusHandler,
    onLeaveHandler:onCityLeaveHandler,
    onReset:onCityReset,
    } = useInput(value => value.trim() === "")

const {enteredValue:postalValue,
    isTouched:postalTouched,
    isValueValid:isPostalValueValid,
    onChangeHandler:onPostalValueHandler,
    onFocusHandler:onPostalFocusHandler,
    onLeaveHandler:onPostalLeaveHandler,
    onReset:onPostalReset,
    } = useInput(value => value.trim() === "")

const formIsValid = isCityValueValid || isNameValueValid || isPostalValueValid || isStreetValueValid

  return (
    <form className={`checkout-form-container ${formIsValid?"invalid":"valid"} ${isShow?"active":""}`} action="" method="post" onSubmit={onSubmitHandler}>
        <div className="checkout-input-field">
            <label htmlFor="name">Name</label>
            <input 
            type="text" 
            name="name" 
            id="name"
            value={nameValue}
            onChange={onNameValueHandler}
            onFocus={onNameFocusHandler}
            onBlur={onNameLeaveHandler}
            />
            {nameTouched && isNameValueValid ? <p className='text-error'>name cannot be empty</p>:""}
        </div>

        <div className="checkout-input-field">
            <label htmlFor="street">Street</label>
            <input 
            type="text" 
            name="street" 
            id="street" 
            value={streetValue}
            onChange={onStreetValueHandler}
            onFocus={onStreetFocusHandler}
            onBlur={onStreetLeaveHandler}
            />
            {streetTouched && isStreetValueValid ? <p className='text-error'>Street cannot be empty</p>:""}
        </div>

        <div className="checkout-input-field">
            <label htmlFor="postalcode">Postal Code</label>
            <input
            type="text" 
            name="postalCode" 
            id="postalCode"
            value={postalValue}
            onChange={onPostalValueHandler}
            onFocus={onPostalFocusHandler}
            onBlur={onPostalLeaveHandler}
            />
            {postalTouched && isPostalValueValid ? <p className='text-error'>Postal Code cannot be empty</p>:""}
        </div>

        <div className="checkout-input-field">
            <label htmlFor="city">City</label>
            <input type="text" 
            name="City" 
            id="City" 
            value={cityValue}
            onChange={onCityValueHandler}
            onFocus={onCityFocusHandler}
            onBlur={onCityLeaveHandler}
            />
            {cityTouched && isCityValueValid ? <p className='text-error'>City cannot be empty</p>:""}
            
        </div>
        <div className="checkout-cta-button">
            <button className="cancel-but" onClick={()=>props.onCloseCheckOut()}>Cancel</button>
            <button type="submit" disabled={formIsValid}>Confirm</button>
            {!formIsValid && <p className='form-approve'>Form is Valid</p>}
        </div>
    </form>
  )
}

export default Checkout