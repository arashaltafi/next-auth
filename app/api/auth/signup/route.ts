import connectToDB from '@/configs/db'
import UserModel from '@/models/User'
import { NextRequest } from 'next/server'
import { generateToken, hashPassword } from '@/utils/Auth'

export async function POST(req: NextRequest) {
    try {
        connectToDB()

        try {
            const body = await req.json()
            if (!body) {
                return Response.json(
                    { message: 'All fields are required' },
                    { status: 400 }
                )
            }
        } catch (error) {
            return Response.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }

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

        const isUserExist = await UserModel.findOne({ email })
        if (isUserExist) {
            return Response.json({ message: 'User Already Exist' }, { status: 400 })
        }

        const hashedPassword = await hashPassword(password)
        console.log('hashedPassword:', hashedPassword)
        const token = await generateToken({ email })

        const users = await UserModel.find({})

        await UserModel.create({
            firstName, lastName, email, hashedPassword, token, userAgent, role: users.length > 0 ? 'USER' : 'ADMIN'
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