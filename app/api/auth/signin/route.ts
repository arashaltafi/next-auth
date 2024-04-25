import connectToDB from '@/configs/db';
import { comparePassword, generateToken, maxAge } from '@/utils/Utils'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const db = await connectToDB();
        const collection = db.collection('user');
        const userAgent = req.headers.get('User-Agent')

        const { email, password } = await req.json()
        if (!email || !password) {
            return Response.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }
        if (!email.trim() || !password.trim()) {
            return Response.json(
                { message: 'All fields are required' },
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

        const hashedPassword = await collection.findOne({ email }, { projection: { _id: 0, hashedPassword: 1 } })
        const hashedPass = hashedPassword?.hashedPassword
        if (!hashedPass || hashedPass === '') {
            return Response.json(
                { message: 'Email is not valid' },
                { status: 400 }
            )
        }

        const isSuccessPass = await comparePassword(password, hashedPass)
        if (!isSuccessPass) {
            return Response.json(
                { message: 'Password is not valid' },
                { status: 400 }
            )
        }

        const token = await generateToken({ email }, 1)

        await collection.updateOne(
            { email },
            { $set: { userAgent, token } }
        )

        cookies().set('Authorization', token, {
            path: '/',
            maxAge: maxAge(1),
            httpOnly: true
        })

        return Response.json(
            { message: "User Login Successfully" },
            { status: 200 }
        )
    } catch (error: any) {
        console.error("error:", error.message)
        return Response.json(
            { message: "Unknown Internal Server Error" },
            { status: 500 }
        )
    }
}