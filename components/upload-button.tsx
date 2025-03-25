"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function UploadButton({ folderId }: { folderId?: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      if (folderId) {
        formData.append("folder", folderId)
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to upload file")
      }

      const data = await response.json()

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      })

      // Refresh the page to show the new asset
      router.refresh()
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
      <label htmlFor="file-upload">
        <Button
          variant="outline"
          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 cursor-pointer"
          disabled={isUploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Uploading..." : "Upload Materials"}
        </Button>
      </label>
    </div>
  )
}

