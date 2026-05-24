import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-20'>
      <div className="">Your Logo</div>

      <div className='flex gap-5'>
        <Link to="/">HomePage</Link>
        <Link to="/news">News</Link>
        <Link to="/economy">Economy</Link>
        <Link to="/technology">Technology</Link>
        <Link to="/entertainment">Entertainment</Link>
        <Link to="/lifestyle">Lifestyle</Link>
        <Link to="/sports">Sports</Link>
        <Link to="/motivation">Motivation</Link>
        <Link to="/education">Education</Link>
        <Link to="/world">World</Link>
        <Link to="/others">Others</Link>
      </div>
    </div>
  )
}

export default Navbar