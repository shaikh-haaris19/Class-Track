"use client"
import { useAuth } from '@clerk/nextjs';
import React from 'react'

const Dashboard = () => {

    //Get User ID from Clerk
    const { userId } = useAuth();
    console.log("User ID : ", userId);

  return (
    <div>
      DashBoard
    </div>
  )
}

export default Dashboard
