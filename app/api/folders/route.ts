import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, parentId } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 })
    }

    const folder = await prisma.folder.create({
      data: {
        name,
        parentId: parentId ? Number.parseInt(parentId) : null,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      folder,
    })
  } catch (error) {
    console.error("Error creating folder:", error)
    return NextResponse.json({ error: "Error creating folder" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const folders = await prisma.folder.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        assets: true,
        children: true,
      },
    })

    return NextResponse.json({
      success: true,
      folders,
    })
  } catch (error) {
    console.error("Error fetching folders:", error)
    return NextResponse.json({ error: "Error fetching folders" }, { status: 500 })
  }
}

