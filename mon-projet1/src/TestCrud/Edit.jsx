import React from 'react'

function Edit() {
  return (
       <div className="addContainer">
        <form>
        <h2>Update</h2>
            <div className='close-btn' ></div>
            <label>Name</label>
            <input type="text" placeholder="Insert name please" name='name'/>
    
            <label>Email</label>
            <input type="text"  placeholder="insert email please" name='email'/>
    
            <label>Phone Number</label>
            <input type="text"  placeholder="insert Phone number please" name='mobile'/>
            <button className="btns"  type='submit'>Enregistrer</button>
          </form>  
        </div>
  )
}

export default Edit