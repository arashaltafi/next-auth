"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [data, setData] = useState<{
        firstName: string,
        lastName: string,
        email: string,
        role: string
    } | null>(null)

    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const router = useRouter()

    useEffect(() => {
        const apiCall = async () => {
            const response = await fetch('/api/home/dashboard', {
                next: { revalidate: 10 },
            })
            const res = await response.json()
            if (response.status === 401) {
                alert(res.message)
                router.replace('/auth/signin')
                setErrorMsg(res.message)
            } else {
                setData(res.data)
            }
        }
        apiCall()
    }, [])

    const callApiSignOut = async () => {
        const response = await fetch('/api/auth/signout', {
            method: 'GET',
            cache: 'no-store',
        })
        const res = await response.json()
        alert(res.message)

        if (response.status === 200) {
            router.push('/signin')
        }
    }

    return (
        <div className='relative w-full h-screen flex flex-col items-center justify-center gap-16 bg-yellow-900'>
            <h1 className='text-6xl font-bold absolute top-8'>Dashboard</h1>
            {
                errorMsg && <h3 className='text-2xl text-red-500'>{errorMsg}</h3>
            }
            {
                data &&
                <div className='flex flex-col gap-4 items-center justify-center text-2xl'>
                    <h3 className='self-start font-light'>firstName: <span className='font-bold'>{data?.firstName}</span></h3>
                    <h3 className='self-start font-light'>lastName: <span className='font-bold'>{data?.lastName}</span></h3>
                    <h3 className='self-start font-light'>email: <span className='font-bold'>{data?.email}</span></h3>
                    <h3 className='self-start font-light'>role: <span className='font-bold'>{data?.role}</span></h3>
                </div>
            }

            <button
                className='absolute bottom-8 transition-all bg-red-500 hover:bg-red-700 text-white rounded-lg px-8 py-4'
                onClick={() => {
                    callApiSignOut()
                }}
            >
                Sign Out
            </button>
        </div>
    )
}

export default Dashboard