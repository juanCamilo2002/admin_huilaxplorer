"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Layout = ({children}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // if (status === 'loading') {
  //   return <Loading />

  // }
  if (status === 'authenticated' && session.user.user.is_staff) {
    return router.push("/dashboard");
  }


  return (
    <div>{children}</div>
  )
}

export default Layout