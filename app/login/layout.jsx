"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Layout = ({children}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  if (status === 'authenticated' && session.user.user.is_staff) {
    return router.push("/dashboard");
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }


  return (
    <div>{children}</div>
  )
}

export default Layout