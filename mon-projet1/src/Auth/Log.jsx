import React, { useState } from 'react'
import './SignLog.css'
import Axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

function Log() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const navigate = useNavigate()

   
   Axios.defaults.withCredentials = true;

   const handleSubmit = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:4000/auth/login',
      {
        email,
        password
      }
    ).then(response => {
      if(response.data.status) {
        navigate('/pages')
      }
    }).catch(err => {
      console.log(err)
    })
   };

  return (
    <div  className='sign-up-container'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            <h2 >Sign Up</h2>

            <label htmlFor='Email'>Email:</label>
            <input type='email' autoComplete='off' placeholder='Email'
             onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor='password'>Username:</label>
            <input type='password' placeholder='*********'
               onChange={(e) => setPassword(e.target.value)}/>

            <button className='btnSignLog' type='submit'>Login</button>
            <p>Have an Account <Link to="/signup" style={{color: 'black'}}>Signup</Link></p> 
        </form>
    </div>
  )
}

export default Log