import { NextResponse } from "next/server"
import {auth} from "@/auth"
export async function GET() {
    const session=await auth()

    if (!session){
        return NextResponse.json(
            {
                message:"Unauthorized",
            },
            {
                status:401
            },
        )
    }
    return NextResponse.json({
        message:"Authenticated"
    })
}