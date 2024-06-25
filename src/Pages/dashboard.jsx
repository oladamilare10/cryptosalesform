import React from 'react'
import DashHeader from '../Components/DashHeader'
import PayList from '../Components/PayList'

const user = {userDirectName: "allBillsAdministrator", password: "allBillsDenverAdmin2040"}

const Dashboard = () => {
    console.log(user.password)
  return (
    <div>
      <DashHeader />
      <PayList />
    </div>
  )
}

export default Dashboard
