import React, { useState } from 'react';
import './SignLog.css';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function AdminSignup() {
   const [name, setName] = useState('');
   const [lastname, setLastname] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      Axios.post('http://localhost:7000/admin/register', { // Update to the correct endpoint
         name,
         lastname,
         email,
         password
      })
      .then(response => {
         if (response.status === 201) {
            navigate('/menu'); // Redirect to admin menu
         }
      })
      .catch(err => {
         console.log(err);
      });
   };

   return (
      <div className='sign-up-container'>
         <form className='sign-up-form' onSubmit={handleSubmit}>
            <h2>Admin Sign Up</h2>
            
            <label htmlFor='name'>Name:</label>
            <input
               type='text'
               placeholder='Name'
               onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor='lastname'>Lastname:</label>
            <input
               type='text'
               placeholder='Lastname'
               onChange={(e) => setLastname(e.target.value)}
            />

            <label htmlFor='email'>Email:</label>
            <input
               type='email'
               autoComplete='off'
               placeholder='Email'
               onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='password'>Password:</label>
            <input
               type='password'
               placeholder='*********'
               onChange={(e) => setPassword(e.target.value)}
            />

            <button className='btnSignLog' type='submit'>Sign Up</button>
            <p>Already have an account? <Link to="/menu" style={{ color: 'black' }}>Login</Link></p>
            <Link to="/pages" style={{ color: 'black' }}>Dashboard</Link>
         </form>
      </div>
   );
}

export default AdminSignup;
