import React from 'react'
import "./styles.scss"

const AllTickets = ({ all }) => {
    return (
        <div className='ticket-box-all'>
            <h3 className="all-date">
                {all?.createdAt.slice(0, 10)}
            </h3>
            <h2>{all.game}</h2>
            <h1>{all.result}</h1>
            <div className="times">
                <span>From - {all.from} {all.from.charAt(1) > 2 ? "Pm" : "Am"}</span>
                <span>To -{all.to} {all.from.charAt(1) > 2 ? "Pm" : "Am"}</span>
            </div>
        </div>
    )
}

export default AllTickets
