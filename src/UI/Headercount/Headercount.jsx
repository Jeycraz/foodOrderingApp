import React from 'react'
import './Headercount.css'

function Headercount(props) {
  return (
    <div className='headercount-container'>
        {props.count}
    </div>
  )
}
export default Headercount