
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
       const product = await prisma.product.findMany({
        include : {
            category: true,
        }
       })
       return NextResponse.json({
          success: true, message : "sucessfully", product
       })
    } catch (error){
       return NextResponse.json({success: false ,error: "fail to feat product"}, {status: 500});
    }
}