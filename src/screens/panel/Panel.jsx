import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { UserContext } from '../../context/useContext'
import { Link, useParams } from 'react-router-dom'
import { server } from '../../main'
import axios from 'axios'
import Swal from 'sweetalert2'

const Panel = () => {
    const { user } = useContext(UserContext)
    const [panel, setPanel] = useState(null)
    const [date, setDate] = useState('')
    const [dateload, setDateLoad] = useState(false)
    const [value, setValue] = useState('')
    const [valueload, setValueLoad] = useState(false)
    const { id } = useParams()
    const getPanel = async () => {
        try {
            const res = await axios.get(`${server}/panel/get-panel/${id}`, { withCredentials: true })
            setPanel(res.data.response)
            console.log(res.data.response)
        } catch (error) {
            console.log(error)
        }
    }

    const InitatePanels = async () => {
        try {
            setDateLoad(true)
            const res = await axios.post(`${server}/panel/initiate-panel/${id}`, { date }, { withCredentials: true })
            Swal.fire({
                title: res.data.response,
                timer: 3000,
                icon: "success"
            })
            setDateLoad(false)
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 3000,
                icon: "error"
            })
        }
    }

    const addEachValues = async (field, panelId) => {
        try {
            setValueLoad(true)
            const res = await axios.post(`${server}/panel/update-panel/${id}`, {
                panelEntryId: panelId,
                field: field,
                value: value
            }, { withCredentials: true })
            await Swal.fire({
                title: res.data.response,
                timer: 3000,
                icon: "success"
            })
            setValueLoad(false)
            window.location.reload()
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 3000,
                icon: "error"
            })
        }
    }

    const deletePanel = async (panelId) => {
        try {
            const res = await axios.delete(`${server}/panel/delete-panel/${id}/${panelId}`, { withCredentials: true });
            await Swal.fire({
                title: res.data.message,
                timer: 3000,
                icon: "success"
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Something Went Wrong",
                timer: 3000,
                icon: "error"
            })
        }

    }

    useEffect(() => {
        getPanel()
    }, [])
    return (
        <div className='panel'>
            {
                user ? <Link to={"/dashboard"} className='link-dash' style={{ textDecoration: "none", color: "#fff", padding: "10px 20px", background: "#000", }}>Go To Dashboard</Link> : null
            }

            <div className="panel-head">
                <Link className="h1" to={"/"}>World King Lottery</Link>
            </div>
            <div className="about-game">
                <h2>{panel?.game}</h2>
                {/* <h2>234-45-567</h2> */}
                {
                    user ? <div className="initiate-panels">
                        <input type="text" placeholder='Enter the date and initiate' value={date} onChange={(e) => setDate(e.target.value)} />
                        <button onClick={InitatePanels}>
                            {
                                dateload ? "Adding PLease Wait ..." : "Initiate"
                            }

                        </button>
                    </div> : null
                }

            </div>
            <div className="table-container">

                <table className='custom-table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>ThursDay</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                            {user ? <th>Action</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            panel?.panel?.map((p) => (
                                <tr>
                                    <td>{p?.date}</td>
                                    <td>
                                        <div className="numbers">
                                            <p>{p?.monday?.slice(0, 3)}</p>
                                            <p>{p?.monday?.slice(4, 6)}</p>

                                            <p>{p?.monday?.slice(7, 10)}</p>
                                        </div>
                                        {
                                            user ? <div className="updt-val">

                                                <input type="text" onChange={(e) => setValue(e.target.value)} />
                                                {
                                                    valueload ? <p>Updaing Please Wait ... </p> : <button
                                                        onClick={() => addEachValues("monday", p?.id)}
                                                    >Add</button>
                                                }

                                                {/* monday */}
                                            </div> : null
                                        }

                                    </td>

                                    <td>
                                        <div className="numbers">
                                            <p>{p?.tuesday?.slice(0, 3)}</p>
                                            <p>{p?.tuesday?.slice(4, 6)}</p>

                                            <p>{p?.tuesday?.slice(7, 10)}</p>
                                        </div>
                                        {
                                            user ? <div className="updt-val">
                                                <input type="text" onChange={(e) => setValue(e.target.value)} />
                                                {
                                                    valueload ? <p>Updaing Please Wait ... </p> : <button
                                                        onClick={() => addEachValues("tuesday", p?.id)}
                                                    >Add</button>
                                                }

                                                {/* tuesday */}
                                            </div> : null
                                        }

                                    </td>

                                    <td>
                                        <div className="numbers">
                                            <p>{p?.wednesday?.slice(0, 3)}</p>
                                            <p>{p?.wednesday?.slice(4, 6)}</p>

                                            <p>{p?.wednesday?.slice(7, 10)}</p>
                                        </div>
                                        {
                                            user ? <div className="updt-val">
                                                <input type="text" onChange={(e) => setValue(e.target.value)} />
                                                {
                                                    valueload ? <p>Updaing Please Wait ... </p> : <button
                                                        onClick={() => addEachValues("wednesday", p?.id)}
                                                    >Add</button>
                                                }

                                                {/* wednesday */}
                                            </div> : null
                                        }

                                    </td>

                                    <td>
                                        <div className="numbers">
                                            <p>{p?.thursday?.slice(0, 3)}</p>
                                            <p>{p?.thursday?.slice(4, 6)}</p>

                                            <p>{p?.thursday?.slice(7, 10)}</p>
                                        </div>
                                        {
                                            user ? <div className="updt-val">
                                                <input type="text" onChange={(e) => setValue(e.target.value)} />
                                                {
                                                    valueload ? <p>Updaing Please Wait ... </p> : <button
                                                        onClick={() => addEachValues("thursday", p?.id)}
                                                    >Add</button>
                                                }

                                                {/* thursday */}
                                            </div> : null
                                        }

                                    </td>

                                    <td>
                                        <div className="numbers">
                                            <p>{p?.friday?.slice(0, 3)}</p>
                                            <p>{p?.friday?.slice(4, 6)}</p>

                                            <p>{p?.friday?.slice(7, 10)}</p>
                                        </div>
                                        {
                                            user ? <div className="updt-val">
                                                <input type="text" onChange={(e) => setValue(e.target.value)} />
                                                {
                                                    valueload ? <p>Updaing Please Wait ... </p> : <button
                                                        onClick={() => addEachValues("friday", p?.id)}
                                                    >Add</button>
                                                }

                                                {/* friday */}
                                            </div> : null
                                        }

                                    </td>

                                    <td>
                                        <div className="numbers">
                                            <p>{p?.saturday?.slice(0, 3)}</p>
                                            <p>{p?.saturday?.slice(4, 6)}</p>

                                            <p>{p?.saturday?.slice(7, 10)}</p>
                                        </div>
                                        {
                                            user ? <div className="updt-val">
                                                <input type="text" onChange={(e) => setValue(e.target.value)} />
                                                {
                                                    valueload ? <p>Updaing Please Wait ... </p> : <button
                                                        onClick={() => addEachValues("saturday", p?.id)}
                                                    >Add</button>
                                                }

                                                {/* saturday */}
                                            </div> : null
                                        }

                                    </td>

                                    <td>
                                        <div className="numbers">
                                            <p>{p?.sunday?.slice(0, 3)}</p>
                                            <p>{p?.sunday?.slice(4, 6)}</p>

                                            <p>{p?.sunday?.slice(7, 10)}</p>
                                        </div>
                                        {
                                            user ? <div className="updt-val">
                                                <input type="text" onChange={(e) => setValue(e.target.value)} />
                                                {
                                                    valueload ? <p>Updaing Please Wait ... </p> : <button
                                                        onClick={() => addEachValues("sunday", p?.id)}
                                                    >Add</button>
                                                }

                                                {/* sunday */}
                                            </div> : null
                                        }

                                    </td>
                                    {
                                        user ? <td>
                                            <button onClick={() => deletePanel(p?.id)} className='delete-button'>Delete</button>
                                        </td> : null
                                    }

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Panel
