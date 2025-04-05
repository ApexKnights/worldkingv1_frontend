import React, { useEffect, useState } from 'react'
import "./styles.scss"
import AdminTickets from '../../components/admin-ticket/AdminTickets'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main'

const Dashboard = () => {
    const [loading, setLoading] = useState(false)
    const [allticket, setAllTicket] = useState([])
    const fetchAllTickets = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${server}/tickets/get-tickets`, { withCredentials: true })
            setAllTicket(res.data.response)

            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(allticket)
    useEffect(() => {
        fetchAllTickets()
    }, [])
    return (
        <div className='dashboard'>
            <Link to={"/"} className="backtohome">Back TO Home</Link>
            <div className="header">
                <h2>WorldKing</h2>
                <span>Welcome, Admin</span>
                <div className="butt">
                    <Link className='add' to={"/add-ticket"}>Add Game</Link>
                    <Link className='add' to={"/add-notice"}>Add Notice</Link>
                </div>

            </div>
            <div className="all-games">
                <h1>Your Games and Their Results</h1>
                <div className="game-sec">
                    {
                        allticket.length === 0 ? <h4 style={{ color: "#fff" }}>No Results to show</h4> :
                            allticket?.map((all) => (
                                <AdminTickets key={all._id} tick={all} />
                            ))
                    }


                </div>
            </div>
        </div>
    )
}

export default Dashboard
