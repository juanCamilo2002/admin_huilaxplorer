"use client";
import { useSession } from 'next-auth/react'
import React from 'react'

const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <div className=''>DashboardPage</div>
  )
}

export default DashboardPage