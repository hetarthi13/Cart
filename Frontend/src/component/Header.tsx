import React from 'react'
import Logo from "../assets/images/logo.jpg"
function Header() {

const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
}
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
        {/* <button onClick={() => window.location.href = "/"}>
            login
            </button> */}
            <button onClick={() => logout()}>
                logout
            </button>
    </div>
  </div>
  </>
  )
}

export default Header