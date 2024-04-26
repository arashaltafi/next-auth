import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/Utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const db = await connectToDB();
        const collection = db.collection('post');
        const userAgent = req.headers.get('User-Agent')
        const token = cookies().get('Authorization')?.value || ''

        const isValidToken = verifyToken(token)
        if (!isValidToken) {
            cookies().delete('Authorization')
            return Response.json(
                { message: "Token is inValid" },
                { status: 401 }
            )
        }

        const postData = await collection.find({}).limit(10).toArray()
        if (!postData) {
            cookies().delete('Authorization')
            return Response.json(
                { message: "User is not exist" },
                { status: 401 }
            )
        }

        return Response.json(
            { data: postData },
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