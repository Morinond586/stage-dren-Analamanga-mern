import React from 'react'
import './footer.css';

function Footer() {
  return (
    <footer id="footer" className='footer'>
        <div className='copyright'>
           &copy; Copy{''}
           <strong>
            <span>VStudio Technology</span>
           </strong>
           . All Rights Reserved
        </div>
        <div className='credits'>
            Designed by <a href='#'>Morinond</a>
        </div>
    </footer>
  )
}

export default Footer