import React from 'react'
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div>
        <Head>
            <title>Pro Shop</title>
        </Head>
        <div className='flex-1 h-full flex flex-col justify-start items-center'>
            {children}
        </div>
    </div>
  )
}

export default Layout