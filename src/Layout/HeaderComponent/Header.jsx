import React from 'react'
import './Header.css'
import Headercard from '../../Cart/HeaderCard/Headercard'

function Header() {
  return (
    <nav className='header-container'>
      <div className="wrapper">
        <div className='header-text'>
            <h1>ReactMeals</h1>
        </div>
        <Headercard text="Your Cart"/>
      </div>
    </nav>
  )
}

export default Header