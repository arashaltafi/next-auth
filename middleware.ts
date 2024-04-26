import { verifyToken } from '@/utils/Utils';
import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
    try {
        if (req.cookies.has('Authorization') == false) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }
        
        const userAgent = req.headers.get('User-Agent')
        const token = req.cookies.get('Authorization')?.value

        if (!userAgent) {
            return NextResponse.json(
                { message: 'User Agent is not valid' },
                { status: 400 }
            )
        }
        if (!token || token === '') {
            req.cookies.delete('Authorization')
            return NextResponse.json(
                { message: 'Token is not valid' },
                { status: 401 }
            )
        }

        return NextResponse.next()
    } catch (error: any) {
        console.error("error:", error.message)
        return NextResponse.json(
            { message: "Unknown Internal Server Error" },
            { status: 500 }
        )
    }
}

export const config = {
    matcher: [
        '/api/home/:path*', // /api/home/dashboard, /api/home/posts
    ]
}