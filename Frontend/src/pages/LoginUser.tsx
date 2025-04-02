import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/userReducer/UserReducer'
import { AppDispatch } from '../redux/store'
import { Link } from 'react-router-dom'

function LoginUser() {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: ""
  })
    // const {users} = useSelector((state : any) => state)
    // console.log(users,"users data");

//   useEffect(() => {
//     // const token = localStorage.getItem("token")
//     // if(token){
//     //   window.location.href = "/Home"
//     // }
//     const {users} = useSelector((state : any) => state)
//     console.log(users,"users data");
//     if(users){
//   // localStorage.setItem("token", users.users.token)
// }
//   },[loginData])
    
const dispatch = useDispatch<AppDispatch>()
  const handleSumitData = (e :any) => {
    e.preventDefault()
    dispatch(loginUser(loginData))
//     const {users} = useSelector((state : any) => state.users)
//     console.log(users,"users data");
    
// if(users){
// window.location.href = "/Home"
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
    <Link to="/register">
    <p>If you are not registered then please register</p></Link>
  </div>
  </>
  )
}

export default LoginUser