import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { generateVideoScript, generateVoiceOver, generateAvatarVideo } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { url, type, settings } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Check if user has enough credits
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

    if (!user || user.credits < 1) {
      return NextResponse.json({ error: "Not enough credits" }, { status: 402 })
    }

    // Generate video script
    const scriptResult = await generateVideoScript(url, settings?.tone || "professional")

    if (!scriptResult.success) {
      return NextResponse.json({ error: "Failed to generate script" }, { status: 500 })
    }

    // Generate voice over
    const voiceResult = await generateVoiceOver(scriptResult.script, settings?.voice || "neutral")

    if (!voiceResult.success) {
      return NextResponse.json({ error: "Failed to generate voice over" }, { status: 500 })
    }

    // Generate avatar video
    const avatarResult = await generateAvatarVideo(settings?.avatarImage || "", scriptResult.script)

    if (!avatarResult.success) {
      return NextResponse.json({ error: "Failed to generate avatar video" }, { status: 500 })
    }

    // Create project in database
    const project = await prisma.project.create({
      data: {
        name: `Project from ${new URL(url).hostname}`,
        type: type || "marketing",
        sourceUrl: url,
        script: scriptResult.script,
        audioUrl: voiceResult.audioUrl,
        videoUrl: avatarResult.videoUrl,
        thumbnailUrl: avatarResult.thumbnailUrl,
        duration: avatarResult.duration,
        userId: session.user.id,
      },
    })

    // Deduct credits
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      project,
    })
  } catch (error) {
    console.error("Error generating video:", error)
    return NextResponse.json({ error: "Error generating video" }, { status: 500 })
  }
}

