import React, { useEffect, useState } from 'react'
import '../assets/header.css'

const Header = (props) => {
  const [number, setNumber] = useState('')

  const handleSetNumber = (e) => {
    setNumber(e.target.value)
  }

  useEffect(() => {
    // Gọi callback function để truyền giá trị number khi nó thay đổi
    props.onNumberChange(number);
  }, [number, props.onNumberChange]);

  return (
    <div className='header'>
      <input
        className='numberInput'
        type="text"
        onChange={handleSetNumber}
        value={number} />
      <button className='load' >LOAD</button>
      <button className='clear' >CLEAR</button>
    </div>
  )
}

export default Header