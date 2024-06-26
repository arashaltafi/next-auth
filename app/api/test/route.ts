import { hashPassword, comparePassword, generateToken, verifyToken, decodeToken } from "@/utils/Utils"
import { cookies } from "next/headers";
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email');
        const password = req.nextUrl.searchParams.get('password');
        if (!password || !email) {
            return Response.json(
                { message: 'Please Enter email and password in Query Params' },
                { status: 400 }
            )
        }
        const hashedPassword = await hashPassword(password)
        const token = await generateToken({
            email: email
        }, 1)

        cookies().set('Authorization', token, {
            path: '/',
            maxAge: Date.now() + 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        return Response.json(
            {
                hashedPassword,
                password,
                token
            },
            { status: 200 }
        )
    } catch (error: any) {
        return Response.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { password, hashedPassword } = await req.json()
        const token = cookies().get('Authorization')?.value
        const userAgent = req.headers.get('User-Agent')

        console.log('userAgent:', userAgent)

        if (!password || !hashedPassword) {
            return Response.json(
                { message: 'Please Enter password and hashedPassword in Query Params' },
                { status: 400 }
            )
        }
        if (!token) {
            return Response.json(
                { message: 'Please Enter token in header with Authorization' },
                { status: 400 }
            )
        }

        const isSuccessPass = await comparePassword(password, hashedPassword)
        const isVerifyToken = verifyToken(token)

        if (isVerifyToken === false) {
            return Response.json(
                { message: "Token is inValid" },
                { status: 401 })
        }

        const { email } = await decodeToken(token)

        return Response.json(
            {
                isSuccessPass,
                isVerifyToken,
                decodedToken: email
            },
            { status: 200 }
        )
    } catch (error: any) {
        return Response.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 })
    }
}