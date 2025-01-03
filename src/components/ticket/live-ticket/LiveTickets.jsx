import React from 'react'
import "./styles.scss"

const LiveTickets = ({ lives }) => {
    return (
        <div className='ticket-box'>
            <h3 className="date">
                {lives?.createdAt?.slice(0, 10)}
            </h3>
            <h2>{lives.game}</h2>
            <h1>{lives.result}</h1>
            <div className="times">
                <span>From - {lives.from}  {lives.from.charAt(1) > 2 ? "Pm" : "Am"}</span>
                <span>To - {lives.to}  {lives.from.charAt(1) > 2 ? "Pm" : "Am"}</span>
            </div>
        </div>
    )
}

export default LiveTickets
