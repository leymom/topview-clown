import { type NextRequest, NextResponse } from "next/server"
import { uploadToBlob } from "@/lib/storage"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload file to blob storage
    const uploadResult = await uploadToBlob(file)

    if (!uploadResult.success) {
      return NextResponse.json({ error: uploadResult.error }, { status: 500 })
    }

    // Save file metadata to database
    const asset = await prisma.asset.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        url: uploadResult.url,
        folderId: folder ? Number.parseInt(folder) : null,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      asset,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 })
  }
}

