import React, { useEffect, useState } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'

const AddNotice = () => {
    const [notices, setNotices] = useState(null)
    const [noticealert, setNoticeAlert] = useState(false)
    const [notice1, setNotice1] = useState('')
    const [notice2, setNotice2] = useState('')
    const [notice3, setNotice3] = useState('')
    const getNotice = async () => {
        try {
            const res = await axios.get(`${server}/notice/get-notice`, { withCredentials: true })
            setNotices(res?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }
    const updateNotice = async () => {
        try {
            const res = await axios.put(`${server}/notice/update-notice`, { notice1, notice2, notice3 }, { withCredentials: true })
            Swal.fire({
                title: "Updated Successfully",
                timer: 2000,
                icon: "success"
            })
            setNoticeAlert(!noticealert)
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 2000,
                icon: "error"
            })
        }
    }
    // const deleteNotice = async () => {
    //     try {
    //         const res = await axios.get(`${server}/notice/get-notice`, { withCredentials: true })
    //         setNotices(res?.data?.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    useEffect(() => {
        getNotice()
    }, [noticealert])
    useEffect(() => {
        setNotice1(notices?.notice1)
        setNotice2(notices?.notice2)
        setNotice3(notices?.notice3)
    }, [notices, noticealert])
    return (
        <div className='add-notice'>
            <div className="head">
                <Link className='w'> World King</Link>
            </div>
            <div className="add-no">
                <input type="text" placeholder='Add First Notice' value={notice1} onChange={(e) => setNotice1(e.target.value)} />
                <input type="text" placeholder='Add Second Notice' value={notice2} onChange={(e) => setNotice2(e.target.value)} />
                <input type="text" placeholder='Add Thired Notice' value={notice3} onChange={(e) => setNotice3(e.target.value)} />
                <div className="butts">
                    <button onClick={() => updateNotice()}>Update</button>
                    {/* <button>Delete</button> */}
                </div>
            </div>
        </div>
    )
}

export default AddNotice
