import React, { useEffect, useState } from 'react'
import '../assets/home.css'
import Header from '../components/Header'
import Card from '../components/Card'
import axios from 'axios'
const Home = () => {
  const [number, setNumber] = useState('')
  const [data, setData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const handleSetNumber = (e) => {
    setNumber(e.target.value);
    setSelectedCards([]);
  };
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `https://dog.ceo/api/breeds/image/random/${number}`
        );
        setData(res.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, [number]);
  const handleCardSelection = (index) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((cardIndex) => cardIndex !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };
  
  const handleClear = () => {
    setData(data.filter((item, index) => selectedCards.includes(index)));
  };

  const handleLoad = async () => {
    try {
      const res = await axios.get(
        `https://dog.ceo/api/breeds/image/random/${data.length}`
      );
      const newImages = res.data.message;
      const newData = [...data];
      newData.forEach((item, index) => {
        if (!selectedCards.includes(index)) {
          newData[index] = newImages.shift();
        }
      });
      setData(newData);
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
                <img src={item} alt='' />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home