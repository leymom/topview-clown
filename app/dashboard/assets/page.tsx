import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import UploadButton from "@/components/upload-button"
import NewFolderDialog from "@/components/new-folder-dialog"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: { folder?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const folderId = searchParams.folder

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

  // Get folders and assets
  const folders = await prisma.folder.findMany({
    where: {
      userId: session.user.id,
      parentId: folderId ? Number.parseInt(folderId) : null,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const assets = await prisma.asset.findMany({
    where: {
      userId: session.user.id,
      folderId: folderId ? Number.parseInt(folderId) : null,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Get current folder if in a subfolder
  let currentFolder = null
  if (folderId) {
    currentFolder = await prisma.folder.findUnique({
      where: {
        id: Number.parseInt(folderId),
      },
    })
  }

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
            <h1 className="text-2xl font-bold mr-4">Assets</h1>
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
          <div className="flex space-x-3">
            <NewFolderDialog parentId={folderId} />
            <UploadButton folderId={folderId} />
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              Newest
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-gray-400 text-sm mb-6">
            {currentFolder ? (
              <div className="flex items-center">
                <a href="/dashboard/assets" className="text-indigo-400 hover:underline">
                  Assets
                </a>
                <span className="mx-2">/</span>
                <span>{currentFolder.name}</span>
              </div>
            ) : (
              "Assets"
            )}
          </div>
        </div>

        {folders.length === 0 && assets.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 border border-gray-700 rounded-lg flex items-center justify-center mb-4 relative">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600"
              >
                <path
                  d="M20 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M2 7L12 13L22 7"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-indigo-600 rounded-full p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="text-gray-400 text-lg">Nothing here</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Folders */}
            {folders.map((folder) => (
              <a
                key={folder.id}
                href={`/dashboard/assets?folder=${folder.id}`}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-yellow-500 mr-2"
                  >
                    <path
                      d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="truncate">{folder.name}</span>
                </div>
              </a>
            ))}

            {/* Assets */}
            {assets.map((asset) => (
              <div key={asset.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-32 bg-gray-700 flex items-center justify-center">
                  {asset.type.startsWith("image/") ? (
                    <img
                      src={asset.url || "/placeholder.svg"}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  ) : asset.type.startsWith("video/") ? (
                    <div className="relative w-full h-full">
                      <video src={asset.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                          >
                            <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500"
                    >
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 13H8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 17H8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 9H9H8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="p-3">
                  <div className="truncate text-sm">{asset.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{(asset.size / 1024).toFixed(0)} KB</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

