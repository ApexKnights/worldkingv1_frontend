import React, { useState } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'

const AddTicket = () => {
    const [game, setGame] = useState('')
    const [result, setResult] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [live, setLive] = useState(false)
    const [loading, setLoading] = useState(false)

    const makeLive = () => {
        setLive(true)
        alert("This game is set to Live")
    }
    const addTicket = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${server}/tickets/post-ticket`, {
                game,
                result,
                from,
                to,
                live
            }, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                icon: 'success',
                timer: 1500,
            })
            setLoading(false)
        } catch (error) {
            Swal.fire({
                title: "Something went wrong",
                icon: 'error',
                timer: 1500,
            })
        }
    }


    return (
        <div className='add-ticket'>
            <h2>Add Game</h2>
            <form onSubmit={addTicket}>
                <input type="text" placeholder='Enter Game Name' onChange={(e) => setGame(e.target.value)} />
                <input type="text" placeholder='Enter Result' onChange={(e) => setResult(e.target.value)} />
                <div className="from">
                    <label className='text-from'>From : -</label>
                    <input type="time" onChange={(e) => setFrom(e.target.value)} />
                </div>
                <div className="to">
                    <label className='text-to'>to : -</label>
                    <input type="time" onChange={(e) => setTo(e.target.value)} />
                </div>
                <span className='make-live' onClick={makeLive}>Make It Live</span>
                {
                    loading ? <h4 style={{ color: "#fff" }}>Uploading Game .....</h4> : <button>Add Game</button>
                }

            </form>
            <Link to={"/dashboard"}>Return Home</Link>
        </div>
    )
}

export default AddTicket
