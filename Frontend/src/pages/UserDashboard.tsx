import React, { useEffect } from 'react'
import UserHeader from '../component/User/UserHeader'
import UserProduct from '../component/User/UserProduct'

function UserDashboard() {
    const Token = localStorage.getItem("token")
    useEffect(() => {
        if(!Token){ 
            window.location.href = "/"
        }
    })
  return (<>{Token &&(<>   <UserHeader /><UserProduct /> </>)}
  </>
  )
}

export default UserDashboard