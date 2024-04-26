"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SingUp = () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !password || !firstName || !lastName) {
            alert('Please enter all fields')
        } else if (email.trim() === '' || password.trim() === '' || firstName.trim() === '' || lastName.trim() === '') {
            alert('Please fill all fields')
        } else if (firstName.length < 2) {
            alert('FirstName must be at least 2 characters')
        } else if (lastName.length < 4) {
            alert('LastName must be at least 4 characters')
        } else if (email.length < 6) {
            alert('Email must be at least 6 characters')
        } else if (password.length < 4) {
            alert('Password must be at least 4 characters')
        } else {
            callApi()
        }
    }

    const callApi = async () => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
            cache: 'no-store',
        })
        const data = await response.json()
        alert(data.message)
        if (response.status === 201) {
            router.replace('/')
        }
    }

    return (
        <div className='flex flex-col w-full h-screen justify-center items-center gap-16 py-8 px-16 bg-blue-900 text-white'>
            <h1 className='text-6xl font-bold'>SignUp</h1>

            <form
                onSubmit={handleSubmit}
                className='w-2/3 h-screen flex flex-col gap-6 items-center justify-center'
            >
                <label
                    htmlFor="firstName"
                    className='text-2xl font-bold'
                >
                    FirstName
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    placeholder='arash'
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    className='px-4 py-2 rounded-lg text-lg text-black' />

                <label
                    htmlFor="lastName"
                    className='text-2xl font-bold'
                >
                    LastName
                </label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    placeholder='altafi'
                    onChange={(e) => setLastName(e.currentTarget.value)}
                    className='px-4 py-2 rounded-lg text-lg text-black' />

                <label
                    htmlFor="email"
                    className='text-2xl font-bold'
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
                    className='px-4 py-2 rounded-lg text-lg text-black' />

                <label
                    htmlFor="password"
                    className='mt-4 text-2xl font-bold'
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
                    className='px-4 py-2 rounded-lg text-lg text-black' />

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
                href={'/auth/signin'}
                className='bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-8 py-4'
            >
                SignIn
            </Link>
        </div>
    )
}

export default SingUp