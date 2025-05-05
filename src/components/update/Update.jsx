import React, { useEffect, useState } from 'react'
import "./styles.scss"
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'
import { RxCross2 } from "react-icons/rx";

const Update = ({ t, setEditModal }) => {
    const [game, setGame] = useState('')
    const [result, setResult] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [loading, setLoading] = useState(false)
    const today = new Date();
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const todayDate = days[today.getDay()]
    const updateForm = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`${server}/tickets/update/${t._id}`, { game, result, from, to }, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: "success"
            })
            const panel = await axios.get(`${server}/tickets/panel-id-in-week/${t?._id}`, { withCredentials: true });
            console.log(panel?.data?.panelId)

            const panelupdt = await axios.post(`${server}/panel/update-panel/${t?._id}`, {
                panelEntryId: panel?.data?.panelId,
                field: todayDate,
                value: result
            }, { withCredentials: true })
            console.log(panelupdt)
            setLoading(false)
            setEditModal(false)
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: "error"
            })
        }
    }
    useEffect(() => {
        setGame(t.game)
        setResult(t.result)
        setFrom(t.from)
        setTo(t.to)
    }, [])
    return (
        <div className='update-ticket'>
            <RxCross2 className='cross' onClick={() => setEditModal(false)} />
            <h1>Update</h1>
            <input type="text" placeholder='Name Of Game' value={game} onChange={(e) => setGame(e.target.value)} />
            <input type="text" placeholder='Ticket' value={result} onChange={(e) => setResult(e.target.value)} />
            <span>From :-</span><input type="text" placeholder='Time From' value={from} onChange={(e) => setFrom(e.target.value)} />
            <span>To :-</span><input type="text" placeholder='Time To' value={to} onChange={(e) => setTo(e.target.value)} />
            {
                loading ? <h4>Updating ..please wait ..</h4> : <button onClick={updateForm}>Update Details</button>
            }

        </div>
    )
}

export default Update
