import React, { useEffect, useState } from 'react'
import '../assets/card.css'
import axios from 'axios'
const Card = (props) => {

    const [data, setData] = useState([])
    console.log(props.number);
    useEffect(() => {

        const fetchImage = async () => {
            try {
                const res = await axios.get(`https://dog.ceo/api/breeds/image/random/${props.number}`)
                setData(res.data.message)
                console.log(res);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchImage()
    }, [props.number])
    console.log(data[0]);
    return (
        <div className='card'>
            {
                data.map((item, index) => (
                    <div className='item'>
                        <img src={item} alt="" />
                    </div>

                ))
            }

        </div>
    )
}

export default Card