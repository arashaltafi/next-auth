import connectToDB from '@/configs/db'
import { NextRequest } from 'next/server'
import { generateToken, hashPassword, maxAge } from '@/utils/Utils'
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const db = await connectToDB();
        const collection = db.collection('user');

        const userAgent = req.headers.get('User-Agent')
        const { firstName, lastName, email, password } = await req.json()

        if (!firstName || !lastName || !email || !password) {
            return Response.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            return Response.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }
        if (firstName.length < 2) {
            return Response.json(
                { message: 'First name must be at least 2 characters' },
                { status: 400 }
            )
        }
        if (lastName.length < 4) {
            return Response.json(
                { message: 'Last name must be at least 4 characters' },
                { status: 400 }
            )
        }
        if (password.length < 5) {
            return Response.json(
                { message: 'Password must be at least 5 characters' },
                { status: 400 }
            )
        }
        if (!email.includes('@')) {
            return Response.json(
                { message: 'Email is not valid' },
                { status: 400 }
            )
        }
        if (!userAgent) {
            return Response.json(
                { message: 'User Agent is not valid' },
                { status: 400 }
            )
        }

        const isUserExist = await collection.findOne({ email })
        if (isUserExist) {
            return Response.json({ message: 'User Already Exist' }, { status: 400 })
        }

        const hashedPassword = await hashPassword(password)
        const token = await generateToken({ email }, 1)

        const users = await collection.find({}).toArray()
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1
        const role = users.length > 0 ? 'USER' : 'ADMIN'

        cookies().set('Authorization', token, {
            path: '/',
            maxAge: maxAge(1),
            httpOnly: true
        })

        await collection.insertOne({
            id, firstName, lastName, email, hashedPassword, token, userAgent, role
        })

        return Response.json({ message: "User Created Successfully" }, { status: 201 })
    } catch (error: any) {
        console.error("error:", error.message)
        return Response.json(
            { message: "Unknown Internal Server Error" },
            { status: 500 }
        )
    }
}