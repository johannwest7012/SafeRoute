import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./Landing.css"
import { useNavigate } from 'react-router-dom';


function Landing() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/map');
    };
  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className='left-div'>
                
            </div>
            <div className='right-div'>
                <img className='heroimg' src='hero.svg'></img>
                <button onClick={handleClick} className='big-button'>Let's go</button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Landing