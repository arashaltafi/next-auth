import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/Utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDB();
        const collection = db.collection('user');
        const userAgent = req.headers.get('User-Agent')
        const token = cookies().get('Authorization')?.value

        if (!userAgent) {
            return Response.json(
                { message: 'User Agent is not valid' },
                { status: 400 }
            )
        }
        if (!token || token === '') {
            return Response.json(
                { message: 'Token is not valid' },
                { status: 400 }
            )
        }

        await collection.updateOne(
            { token, userAgent },
            { $set: { token: '', userAgent: '' } }
        )

        cookies().delete('Authorization')

        return Response.json(
            { message: "SignOut successfully" },
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