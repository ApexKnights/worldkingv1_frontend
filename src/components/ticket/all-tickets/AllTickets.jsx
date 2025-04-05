import React, { useEffect, useState } from 'react'
import "./styles.scss"
import axios from 'axios'
import { server } from '../../../main'
import { Link } from 'react-router-dom'

const AllTickets = ({ all }) => {
    const [cpanel, setCPanel] = useState(null)

    const confirmPanel = async () => {
        try {
            const res = await axios.get(`${server}/panel/get-panel/${all._id}`, { withCredentials: true })
            setCPanel(res.data.response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        confirmPanel()
    }, [])
    return (
        <div className={all.highlight ? 'ticket-box-all-highlight' : 'ticket-box-all'}>
            <h3 className="all-date">
                {all?.updatedAt.slice(0, 10)}
            </h3>
            {
                cpanel ? <Link to={`/panel/${all._id}`} className='visit-panel'> Visit Panel</Link> : null
            }

            <h2>{all.game}</h2>
            <h1>{all.result}</h1>
            <div className="times">
                <span>From - {all.from} </span>
                <span>To -{all.to} </span>
            </div>
        </div>
    )
}

export default AllTickets
