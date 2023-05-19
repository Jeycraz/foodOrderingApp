import React, { forwardRef } from 'react'
import './Input.css'

const Input = forwardRef((props,ref)=> {
  return (
    <div className="input-container">
        <label htmlFor={props.label} className='label-text'>{props.label}</label>
        <input className="input-style"

        // Receive forward ref //
        ref={ref} {...props.input}
        // value={amount} 
        // Use onchange to update the amount value
        // onChange={(e)=>setAmount(e.target.value)} 
        />
    </div>
  )
})

export default Input