import React from 'react'
import { MdClose } from 'react-icons/md'

function FormData({handleOnChange,handleSubmit,handleclose,rest}) {
  return (
    <div className="addContainer">
    <form onSubmit={handleSubmit}>
    <h2>Insert user</h2>
        <div className='close-btn' onClick={handleclose}><MdClose /></div>
        <label>Name</label>
        <input type="text" placeholder="Insert name please" name='name' onChange={handleOnChange} value={rest.name}/>

        <label>Email</label>
        <input type="text"  placeholder="insert email please" name='email' onChange={handleOnChange} value={rest.email}/>

        <label>Phone Number</label>
        <input type="text"  placeholder="insert Phone number please" name='mobile' onChange={handleOnChange} value={rest.mobile}/>
        <button className="btns"  type='submit'>Enregistrer</button>
      </form>  
    </div>
  )
}

export default FormData