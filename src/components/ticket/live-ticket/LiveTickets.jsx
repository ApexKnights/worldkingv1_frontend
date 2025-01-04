import React from 'react'
import "./styles.scss"

const LiveTickets = ({ lives }) => {
    return (
        <div className={lives.highlight ? 'highlight-ticket-box' : 'ticket-box'}>
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
