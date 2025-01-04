import React, { useState } from 'react'
import "./styles.scss"
import Update from '../update/Update'
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'

const AdminTickets = ({ tick }) => {
    const [editModal, setEditModal] = useState(false)
    const [updategame, setUpdateGame] = useState({})
    const [loading, setLoading] = useState(false)
    const editAll = (t) => {
        setEditModal(true)
        setUpdateGame(t)

    }

    const highlightGame = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`${server}/tickets/highlight/${tick._id}`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: "success"
            })
            setLoading(false)
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: "error"
            })
        }
    }
    const removefromHighlight = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`${server}/tickets/remove-highlight/${tick._id}`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: "success"
            })
            setLoading(false)
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: "error"
            })
        }
    }
    const removefromLive = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`${server}/tickets/remove-live/${tick._id}`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: "success"
            })
            setLoading(false)
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: "error"
            })
        }
    }
    const MakeLive = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`${server}/tickets/updateto-live/${tick._id}`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: "success"
            })
            setLoading(false)
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: "error"
            })
        }

    }
    const deleteGame = async () => {
        try {
            setLoading(true)
            const res = await axios.delete(`${server}/tickets/delete/${tick._id}`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: "success"
            })
            setLoading(false)
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: "error"
            })
        }
    }

    return (
        <>
            <div className={tick.highlight ? "admin-ticket-highlight" : "admin-tickets"}>
                {tick.live === true ? <h4 className='live'>Live</h4> : null}
                <h3 className="date">{tick.updatedAt.slice(0, 10)}</h3>
                <h1>{tick.game}</h1>
                <h1>{tick.result}</h1>
                <div className="times">
                    <span>{tick.from} </span>
                    <span>{tick.to}</span>
                </div>
                {
                    loading ? <h3>Working on it ......</h3> : <div className="butts">
                        <button onClick={() => editAll(tick)}>Edit All</button>
                        {
                            tick.highlight ? <button onClick={removefromHighlight} >Remove Highlight</button> : <button onClick={highlightGame}>Highlight</button>}


                        {tick.live == true ?
                            <button className='rfl' onClick={removefromLive}>Remove from live</button> : <button onClick={MakeLive}>Make It Live</button>
                        }

                        <button onClick={deleteGame}>Delete</button>
                    </div>
                }

            </div>
            {editModal ? <Update t={updategame} setEditModal={setEditModal} /> : null}
        </>
    )
}

export default AdminTickets
