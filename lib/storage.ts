import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"

export async function uploadToBlob(file: File) {
  try {
    const filename = `${uuidv4()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })

    return {
      url: blob.url,
      size: blob.size,
      contentType: blob.contentType,
      success: true,
    }
  } catch (error) {
    console.error("Error uploading to blob storage:", error)
    return {
      success: false,
      error: "Failed to upload file",
    }
  }
}

