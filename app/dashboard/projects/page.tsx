import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  // Get user storage info
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      storageUsed: true,
      storageLimit: true,
    },
  })

  if (!user) {
    redirect("/login")
  }

  // Get projects
  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Format storage values
  const usedGB = (user.storageUsed / (1024 * 1024 * 1024)).toFixed(2)
  const limitGB = (user.storageLimit / (1024 * 1024 * 1024)).toFixed(0)

  return (
    <div>
      {/* Header section */}
      <div className="flex justify-end p-4">
        <button className="text-gray-400 hover:text-white">
          <HelpCircle className="w-6 h-6" />
        </button>
        <button className="ml-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {session.user.name?.[0] || "U"}
        </button>
      </div>

      {/* Main content area */}
      <div className="px-8 py-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">My projects ({projects.length})</h1>
            <div className="text-sm text-gray-400">
              <span>{usedGB}GB</span>
              <span className="mx-1">/</span>
              <span>{limitGB}GB</span>
              <span className="ml-2 text-yellow-500 flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
                Upgrade
              </span>
            </div>
          </div>
          <div>
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              Newest
            </Button>
          </div>
        </div>

        {projects.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                <path d="M12 16V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 7V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-gray-400 text-lg">No Project</div>
            <Link href="/dashboard/home">
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">Create Your First Video</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-700 relative">
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-900">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M23 7L16 12L23 17V7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(project.duration / 60)}:{(project.duration % 60).toString().padStart(2, "0")}
                  </div>
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded capitalize">
                    {project.type}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate">{project.name}</h3>
                  <div className="text-sm text-gray-400 mt-1">{new Date(project.createdAt).toLocaleDateString()}</div>
                  <div className="flex mt-3 space-x-2">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-gray-600 text-white hover:bg-gray-700 text-xs"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

