import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    return Response.json({ message: 'Please Enter name in Query Params' }, { status: 400 })
}