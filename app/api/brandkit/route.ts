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

    const brandKit = await prisma.brandKit.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        fonts: true,
        music: true,
        voices: true,
        avatars: true,
      },
    })

    if (!brandKit) {
      return NextResponse.json({ error: "Brand kit not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      brandKit,
    })
  } catch (error) {
    console.error("Error fetching brand kit:", error)
    return NextResponse.json({ error: "Error fetching brand kit" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const brandKit = await prisma.brandKit.update({
      where: {
        userId: session.user.id,
      },
      data: {
        videoFormat: data.videoFormat,
        language: data.language,
        hasEndcard: data.hasEndcard,
        endcardUrl: data.endcardUrl,
        hasWatermark: data.hasWatermark,
        watermarkUrl: data.watermarkUrl,
        backgroundColor: data.backgroundColor,
      },
    })

    return NextResponse.json({
      success: true,
      brandKit,
    })
  } catch (error) {
    console.error("Error updating brand kit:", error)
    return NextResponse.json({ error: "Error updating brand kit" }, { status: 500 })
  }
}

