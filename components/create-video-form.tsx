"use client"

import type React from "react"

import { useState } from "react"
import { Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function CreateVideoForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      toast({
        title: "URL is required",
        description: "Please enter a URL to generate a video.",
        variant: "destructive",
      })
      return
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          type: "marketing",
          settings: {
            tone: "professional",
            voice: "neutral",
          },
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to generate video")
      }

      const data = await response.json()

      toast({
        title: "Video generation started",
        description: "Your video is being generated. You'll be notified when it's ready.",
      })

      // Redirect to the projects page
      router.push("/dashboard/projects")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Video generation failed",
        description: error instanceof Error ? error.message : "Failed to generate video",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTrySample = () => {
    setUrl("https://www.amazon.com/dp/B08N5KWB9H")
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-4">
      <div className="bg-white rounded-full flex items-center pl-4 pr-2 py-2 w-full max-w-lg">
        <Link2 className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Amazon/Shopify/TikTok/Ebay/Mercado..."
          className="bg-transparent outline-none text-gray-800 flex-1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <span className="text-indigo-500 mr-2 text-sm font-medium cursor-pointer" onClick={handleTrySample}>
          Try Sample
        </span>
      </div>
      <Button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Video"}
      </Button>
      <span className="text-gray-300">or</span>
      <label htmlFor="file-upload">
        <Button
          type="button"
          variant="outline"
          className="bg-transparent border-gray-500 text-white hover:bg-gray-800 rounded-full px-6 py-2"
        >
          Upload file
        </Button>
      </label>
      <input type="file" id="file-upload" className="hidden" accept="video/*,image/*" />
    </form>
  )
}

