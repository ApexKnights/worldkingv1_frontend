import React, { useState } from 'react'
import "./styles.scss"
import axios from "axios"
import { server } from '../../main'
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigateTo = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${server}/auth/login`, { userId, password }, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: 'success'
            })
            setLoading(false)
            navigateTo("/")
        } catch (error) {
            await Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: 'error'
            })
        }
    }
    return (
        <div className='login'>
            <div className="box">
                <h1>Login to Admin Portal</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Enter Admin UserId' onChange={(e) => setUserId(e.target.value)} />
                    <input type="Password" placeholder='Enter Admin Password' onChange={(e) => setPassword(e.target.value)} />
                    {
                        loading ? <h4 style={{ color: "#fff" }}>Loggin in.....</h4> : <button>Login</button>
                    }

                </form>
            </div>

        </div>
    )
}

export default Login
