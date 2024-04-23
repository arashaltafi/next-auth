import { hashPassword, comparePassword, generateToken, verifyToken, decodeToken } from "@/utils/Auth"
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
        const token = req.headers.get('Authorization')
        const userAgent = req.headers.get('User-Agent')

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
        const isVerifyToken = await verifyToken(token)

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