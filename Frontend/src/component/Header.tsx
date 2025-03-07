import React from 'react'
import Logo from "../assets/images/logo.jpg"
function Header() {
  return (<>
  <div className='header'>
    <div className='headerLeft'>
        <img src={Logo} alt='' width={50} height={50}/>
    </div>
    <div >
        <button>
            product
        </button>
    </div>

    <div>
        <button>
            login
        </button>
    </div>

  </div>
  </>
  )
}

export default Header