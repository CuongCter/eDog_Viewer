import React, { useState } from 'react'
import '../assets/home.css'
import Header from '../components/Header'
import Card from '../components/Card'
const Home = () => {
    const [number,setNumber] = useState('')
    const handleNumberChange = (number) => {
        setNumber(number)
      }
    
    
  return (
    <div className='home'>
        <Header onNumberChange={handleNumberChange}></Header>
        <hr />
        <div className='main'>
            <Card number={number}></Card>
        </div>
    </div>
  )
}

export default Home