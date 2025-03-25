import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const folderId = searchParams.get("folderId")

    const assets = await prisma.asset.findMany({
      where: {
        userId: session.user.id,
        folderId: folderId ? Number.parseInt(folderId) : null,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      assets,
    })
  } catch (error) {
    console.error("Error fetching assets:", error)
    return NextResponse.json({ error: "Error fetching assets" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Asset ID is required" }, { status: 400 })
    }

    // Check if the asset belongs to the user
    const asset = await prisma.asset.findUnique({
      where: {
        id: Number.parseInt(id),
      },
    })

    if (!asset || asset.userId !== session.user.id) {
      return NextResponse.json({ error: "Asset not found or unauthorized" }, { status: 404 })
    }

    // Delete the asset
    await prisma.asset.delete({
      where: {
        id: Number.parseInt(id),
      },
    })

    // In a real implementation, you would also delete the file from blob storage

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Error deleting asset:", error)
    return NextResponse.json({ error: "Error deleting asset" }, { status: 500 })
  }
}

