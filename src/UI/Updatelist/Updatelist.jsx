import React, { useState } from 'react'
import './Updatelist.css'


function Updatelist(props) {
    const [count,setCount] = useState(props.count)
     

    const onCounterAdd =()=>{
        setCount(prev=>prev+1)
        props.onCounterAdd()
    }   

    const onCounterDeduct =()=>{
        setCount(prev=>prev-1)
        props.onRemove()
    }

    return (
    <div className={`updatelist-container ${props.isOrdered?"active":""}`}>
        
        <div className="updatelist-name">
            <h1>{props.name}</h1>
            <div className="updatelist-price-count">
                <div className="updatelist-price">
                    <p>${props.price}</p>
                </div>

                <div className="updatelist-count">
                    <p>x{props.count}</p>
                </div>
            </div>
        </div>

        <div className="button-container">
            <button className="button-click" 
            onClick={onCounterDeduct}>
                {`-`}
            </button>

            <button className="button-click" onClick={onCounterAdd}>
                {`+`}
            </button>
        </div>
    </div>
  )
}

export default Updatelist