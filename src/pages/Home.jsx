import React, { useEffect, useState } from 'react'
import '../assets/home.css'

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

const Home = () => {
  const [number, setNumber] = useState('')
  const [data, setData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  
  const handleSetNumber = (e) => {
    setNumber(e.target.value);
    setSelectedCards([]);
  };

  
  const handleCardSelection = (index) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((cardIndex) => cardIndex !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };
  
  const handleClear = () => {
    setData(data.filter((item, index) => selectedCards.includes(index)));
    setSelectedCards([]);
  };

  const handleLoad = async () => {
    try {
      const res = await axios.get(
        `https://dog.ceo/api/breeds/image/random/${number}`
      );
      const newImages = res.data.message;
      let newData = [...data];
  
      selectedCards.forEach((index) => {
        newData[index] = newImages.shift();
      });
  
      const additionalCards = newImages.slice(0, number - selectedCards.length);
      newData = newData.concat(additionalCards);
  
      setData(newData);
      setSelectedCards([]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='home'>
      <div className='header'>
        <input
          className='numberInput'
          type='text'
          onChange={handleSetNumber}
          value={number}
        />
        <button className='load' onClick={handleLoad}>
          LOAD
        </button>
        <button className='clear' onClick={handleClear}>
          CLEAR
        </button>
      </div>
      <hr />
      <div className='main'>
        <div className='card'>
          {data.length > 0 &&
            data.map((item, index) => (
              <div
                className={`item ${selectedCards.includes(index) ? 'selected' : ''}`}
                key={index}
                onClick={() => handleCardSelection(index)}
              >
                <img src={item} alt='dog' />
                {
                  selectedCards.includes(index) ? <div className="overlay"><FontAwesomeIcon className='icon' icon={faCheckCircle}/></div> : ""
                }
                
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home