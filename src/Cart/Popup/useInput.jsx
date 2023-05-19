import React, { useState } from 'react'

function useInput(validateFunction) {
    const [enteredValue,setEnteredValue]=useState("")
    const [isTouched,setIsTouched]=useState(false)

    const isValueValid = validateFunction(enteredValue)

    const onChangeHandler = (e)=>{
        setEnteredValue(e.target.value)
    }

    const onFocusHandler =()=>{
        setIsTouched(true)
    }

    const onLeaveHandler =()=>{
        setIsTouched(false)
    }

    const onReset = ()=>{
        setEnteredValue("")
        setIsTouched(false)
    }

  return {
        isTouched,
        enteredValue,
        isValueValid,
        onChangeHandler,
        onFocusHandler,
        onLeaveHandler,
        onReset,
    }
}

export default useInput