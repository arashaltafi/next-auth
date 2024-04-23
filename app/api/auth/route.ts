import { comparePassword, hashPassword } from "@/utils/Auth"
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const password = req.nextUrl.searchParams.get('password');
    const hashedPassword = await hashPassword(password!!)
    return Response.json({ hashedPassword, password }, { status: 200 })
}

export async function POST(req: NextRequest) {
    const { password, hashedPassword } = await req.json()
    const isSuccessPass = await comparePassword(password, hashedPassword)
    return Response.json({ isSuccessPass }, { status: 200 })
}

export async function DELETE() {
    return Response.json({ message: 'Api Auth Route Not Found!' }, { status: 200 })
}

export async function PUT() {
    return Response.json({ message: 'Api Auth Route Not Found!' }, { status: 200 })
}

export async function PATCH() {
    return Response.json({ message: 'Api Auth Route Not Found!' }, { status: 200 })
}

export async function UPDATE() {
    return Response.json({ message: 'Api Auth Route Not Found!' }, { status: 200 })
}