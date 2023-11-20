import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Dashboard = () => {
  const userContext = useContext(UserContext);
  console.log(userContext);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard