import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import feature from "../../assets/worldking.png"
import LiveTickets from '../../components/ticket/live-ticket/LiveTickets'
import AllTickets from '../../components/ticket/all-tickets/AllTickets'
import { TiRefreshOutline } from "react-icons/ti";
import { MdDashboard } from "react-icons/md";
import { UserContext } from '../../context/useContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'



const Home = () => {
    const [liveticket, setLiveTicket] = useState([])
    const [allticket, setAllTicket] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const { user } = useContext(UserContext)
    const fetchliveTickets = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${server}/tickets/get-live-tickets`, { withCredentials: true })
            setLiveTicket(res.data.response)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchAllTickets = async () => {
        try {
            setLoading2(true)
            const res = await axios.get(`${server}/tickets/get-tickets`, { withCredentials: true })
            setAllTicket(res.data.response)
            setLoading2(false)
        } catch (error) {
            console.log(error)
        }
    }

    const logoutUser = async () => {
        try {
            const res = await axios.get(`${server}/auth/logout`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: "success"
            })
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1200,
                icon: "error"
            })
        }
    }

    useEffect(() => {
        fetchliveTickets();
        fetchAllTickets();
    }, [])
    return (
        <section className='home'>
            <div className="refresh" onClick={() => window.location.reload()}>
                <TiRefreshOutline className='r-icon' />
                <span>Refresh</span>
            </div>
            {
                user ? <Link to={"/dashboard"} className="dashboard-link" >
                    <MdDashboard className='r-icon' />
                    <span>Dashboard</span>
                </Link> : null
            }
            {
                user ? <button className="logout-link" onClick={logoutUser}>
                    Logout
                </button> : null
            }

            <div className="first">
                <h2>worldkingofficial.com</h2>
                <img src={feature} alt="" />
                <h1>Welcome to World King, Fastest Satta Result Site</h1>
                <div className="contact">
                    <span>Mobile No. - 9374937238</span>
                    <span>Address. - Tarkeswar</span>
                    <span>Email. - worldkingofficial@gmail.com</span>
                </div>
            </div>
            <div className="live-tickets">
                <h2 className='t-head'>Get All Your Live Tickets Here</h2>
                <div className="live-ticket-box">
                    {
                        loading ? <h2 style={{ color: "#fff" }}>Loading Live results ....</h2> :
                            liveticket.length === 0 ? <h4 style={{ color: "#fff" }}>No Live Results</h4> :
                                liveticket?.map(lives => (
                                    <LiveTickets key={lives._id} lives={lives} />
                                ))
                    }
                </div>
            </div>
            <div className="all-tickets">
                <h2 className='t-head'>Get All Your Results Here</h2>
                <div className="all-ticket-box">
                    {
                        loading2 ? <h2>Loading results ....</h2> :
                            allticket.length === 0 ? <h4 >No Live Results</h4> :
                                allticket?.map(all => (
                                    <AllTickets key={all._id} all={all} />
                                ))
                    }

                </div>
            </div>

        </section>
    )
}

export default Home
