import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

const Dashboard = async () => {
    const data = apiCall()

    return (
        <div className='flex flex-col items-center justify-center gap-8'>
            <h1 className='text-6xl font-bold'>Dashboard</h1>
            {
                <p>{data}</p>
            }
        </div>
    )
}

export default Dashboard

const apiCall = async () => {
    const response = await fetch('http://localhost:3000/api/home/dashboard', {
        next: { revalidate: 10 },
    })
    const res = await response.json()
    if (response.status === 401) {
        redirect('/signin', RedirectType.replace)
    } else {
        return res.data
    }
}