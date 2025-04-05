import React, { useEffect, useState } from 'react'
import "./styles.scss"
import axios from 'axios'
import { server } from '../../../main'
import { Link } from 'react-router-dom'

const LiveTickets = ({ lives }) => {
    const [cpanel, setCPanel] = useState(null)

    const confirmPanel = async () => {
        try {
            const res = await axios.get(`${server}/panel/get-panel/${lives._id}`, { withCredentials: true })
            setCPanel(res.data.response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        confirmPanel()
    }, [])
    return (
        <div className={lives.highlight ? 'highlight-ticket-box' : 'ticket-box'}>
            {
                cpanel ? <Link to={`/panel/${lives._id}`} className='visit-panel'> Visit Panel</Link> : null
            }

            <h3 className="date">
                {lives?.updatedAt?.slice(0, 10)}
            </h3>
            <h2>{lives.game}</h2>
            <h1>{lives.result}</h1>
            <div className="times">
                <span>From - {lives.from}  </span>
                <span>To - {lives.to}</span>
            </div>
        </div>
    )
}

export default LiveTickets
