// Mock data for the backend
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    credits: 10,
    plan: "free",
    storage: {
      used: 0,
      total: 5 * 1024 * 1024 * 1024, // 5GB in bytes
    },
  },
]

const projects = []
const assets = []

// API functions
export async function getUserProfile() {
  // In a real app, this would fetch from a database or API
  return users[0]
}

export async function createProject(data: any) {
  const newProject = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...data,
  }

  projects.push(newProject)
  return newProject
}

export async function getProjects() {
  return projects
}

export async function getAssets() {
  return assets
}

export async function uploadAsset(file: File) {
  // In a real app, this would upload to a storage service
  const newAsset = {
    id: Date.now(),
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file),
    createdAt: new Date().toISOString(),
  }

  assets.push(newAsset)
  return newAsset
}

export async function createFolder(name: string) {
  const newFolder = {
    id: Date.now(),
    name,
    type: "folder",
    createdAt: new Date().toISOString(),
    children: [],
  }

  assets.push(newFolder)
  return newFolder
}

export async function generateVideo(url: string) {
  // In a real app, this would call an AI service
  return {
    id: Date.now(),
    url: "https://example.com/video.mp4",
    thumbnail: "https://example.com/thumbnail.jpg",
    createdAt: new Date().toISOString(),
  }
}

export async function generateAvatar(imageUrl: string) {
  // In a real app, this would call an AI service
  return {
    id: Date.now(),
    url: "https://example.com/avatar.mp4",
    thumbnail: "https://example.com/avatar-thumbnail.jpg",
    createdAt: new Date().toISOString(),
  }
}

export async function generateVoice(text: string) {
  // In a real app, this would call an AI service
  return {
    id: Date.now(),
    url: "https://example.com/voice.mp3",
    text,
    createdAt: new Date().toISOString(),
  }
}

