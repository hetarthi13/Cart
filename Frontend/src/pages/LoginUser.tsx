import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/userReducer/UserReducer'

function LoginUser() {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: ""
  })

  const {users} = useSelector((state : any) => state)
  console.log(users.user.token);
  localStorage.setItem("token", users.user.token)
const dispatch = useDispatch()
  const handleSumitData = (e :any) => {
    e.preventDefault()
    dispatch(loginUser(loginData))
window.location.href = "/"
  }
  return (<>
  <div>
    <h1>
      Login User
    </h1>
    <form onSubmit={handleSumitData}>
      <div className='FormMainInput' >
        <label>
          Email : 
        </label>
        <input type='email' value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
      </div>

      <div className='FormMainInput'>
        <label>
          Password : 
        </label>
        <input type='password' value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})}  />
      </div>
      <button type='submit'>Login </button>
    </form>
  </div>
  </>
  )
}

export default LoginUser