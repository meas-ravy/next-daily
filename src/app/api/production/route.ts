import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const product = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(
      { success: true, message: "product fetched successfully", data: product },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Fail to get production data" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        stock: body.stock,
        categoryId: body.categoryId,
        suplierId: body.suplierId,
      },
    });

    return NextResponse.json(
      { success: true, message: "Product Create sucessfullt", data: product },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Fail to Create product" },
      { status: 400 },
    );
  }
}
