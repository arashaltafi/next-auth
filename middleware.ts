import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
    if (req.nextUrl.pathname.startsWith('/api/home/')) {
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

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (req.cookies.has('Authorization') == false) {
            return NextResponse.redirect(new URL('/auth/signin', req.url))
        } else {
            return NextResponse.next()
        }
    }

    if (req.nextUrl.pathname.startsWith('/auth')) {
        if (req.nextUrl.pathname == '/auth') {
            return NextResponse.redirect(new URL('/auth/signin', req.url))
        } else if (req.cookies.has('Authorization') == true) {
            return NextResponse.redirect(new URL('/', req.url))
        } else {
            return NextResponse.next()
        }
    }
}

export const config = {
    matcher: [
        '/api/home/:path*', // /api/home/dashboard, /api/home/posts
        '/dashboard',
        '/auth',
    ]
}