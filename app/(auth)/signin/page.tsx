"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !password) {
            alert('Please enter email and password')
        } else if (email.trim() === '' || password.trim() === '') {
            alert('Please enter email and password')
        } else if (email.length < 6) {
            alert('Email must be at least 6 characters')
        } else if (password.length < 4) {
            alert('Password must be at least 4 characters')
        } else {
            callApi()
        }
    }

    const callApi = async () => {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
            cache: 'no-store',
        })
        const data = await response.json()
        alert(data.message)
        if (response.status === 200) {
            router.replace('/')
        }
    }

    return (
        <div className='flex flex-col w-full h-screen justify-center items-center gap-16 py-8 px-16 bg-blue-900 text-white'>
            <h1 className='text-6xl font-bold'>SignIn</h1>

            <form
                onSubmit={handleSubmit}
                className='w-2/3 h-screen flex flex-col gap-8 items-center justify-center'
            >
                <label
                    htmlFor="email"
                    className='text-3xl font-bold'
                >
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder='arash@gmail.com'
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    className='px-8 py-4 rounded-lg text-xl text-black' />

                <label
                    htmlFor="password"
                    className='mt-4 text-3xl font-bold'
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder='123456'
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    className='px-8 py-4 rounded-lg text-xl text-black' />

                <div className='flex gap-8 mt-12'>
                    <button
                        className='bg-green-500 hover:bg-green-700 transition-all rounded-lg px-8 py-4'
                        type="submit"
                    >
                        Submit
                    </button>

                    <button
                        className='bg-red-500 hover:bg-red-700 transition-all rounded-lg px-8 py-4'
                        type="reset"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <Link
                href={'/signup'}
                className='bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-8 py-4'
            >
                SignUp
            </Link>
        </div>
    )
}

export default SignIn