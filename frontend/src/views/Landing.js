import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./Landing.css"

function Landing() {
  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className='left-div'>
                
            </div>
            <div className='right-div'>
                <h1 className='herotext'>Explore Confidently</h1>
                <h1 className='herotext'>Find Your Route</h1>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Landing