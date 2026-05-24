import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>404 Not Found</h1>
        <Link to={"/"} >press here to redirect to Home Page.</Link>
    </div>
  )
}

export default NotFound