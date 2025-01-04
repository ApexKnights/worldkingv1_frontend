import React from 'react'
import "./styles.scss"

const AllTickets = ({ all }) => {
    return (
        <div className={all.highlight ? 'ticket-box-all-highlight' : 'ticket-box-all'}>
            <h3 className="all-date">
                {all?.updatedAt.slice(0, 10)}
            </h3>
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
