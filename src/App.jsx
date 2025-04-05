import React, { useContext } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './screens/home/Home'
import Login from './screens/login/Login'
import Dashboard from './screens/dashboard/Dashboard'
import AddTicket from './screens/tickets/AddTicket'
import { UserContext } from './context/useContext'
import Panel from './screens/panel/Panel'
import AddNotice from './screens/addnotice/AddNotice'

const App = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='/login-admin' element={<Login />} />
        {user ? <Route path='/dashboard' element={<Dashboard />} /> : null}
        {user ? <Route path='/add-ticket' element={<AddTicket />} /> : null}
        {user ? <Route path='/add-notice' element={<AddNotice />} /> : null}
        <Route path='/panel/:id' element={<Panel />} />
      </Routes>
    </>
  )
}

export default App
