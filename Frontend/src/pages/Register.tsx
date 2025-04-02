import React from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../redux/userReducer/UserReducer'
import { Link } from 'react-router-dom'

function Register() {

    const [formData, setFormData] = React.useState({
        name:"",
        email: "",
        password: ""
    })
    const dispatch = useDispatch()

    const handleSubmit = (e :any) => {
        e.preventDefault()  
        console.log(formData);
        dispatch(registerUser(formData))
        setFormData({
            name:"",
            email: "",
            password: ""
        })  
    }

    return (
    <>
     <h1>Register User</h1>
    <form onSubmit={handleSubmit}>
        <div className='FormMainInput'>
            <label>Name</label>
            <input type='text' value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>

        <div className='FormMainInput'>
            <label>Email</label>
            <input type='email' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>


        <div className='FormMainInput'>
            <label>Password</label>
            <input type='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        </div>

        <div>
            <button type='submit' >
                Submit register data
            </button>
        </div>
    </form>
    <Link to="/"><p>If you have an account please login</p></Link>
    </>
  )
}

export default Register