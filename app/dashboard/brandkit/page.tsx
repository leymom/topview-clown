"use client"

import { useEffect, useState } from "react"
import { HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface BrandKit {
  id: number
  videoFormat: string
  language: string
  hasEndcard: boolean
  endcardUrl: string | null
  hasWatermark: boolean
  watermarkUrl: string | null
  backgroundColor: string
}

export default function BrandKitPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [brandKit, setBrandKit] = useState<BrandKit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Accordion state
  const [openSections, setOpenSections] = useState({
    music: false,
    font: false,
    voice: false,
    avatar: false,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (status === "authenticated") {
      fetchBrandKit()
    }
  }, [status, router])

  const fetchBrandKit = async () => {
    try {
      const response = await fetch("/api/brandkit")

      if (!response.ok) {
        throw new Error("Failed to fetch brand kit")
      }

      const data = await response.json()
      setBrandKit(data.brandKit)
    } catch (error) {
      console.error("Error fetching brand kit:", error)
      toast({
        title: "Error",
        description: "Failed to load brand kit settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!brandKit) return

    setIsSaving(true)

    try {
      const response = await fetch("/api/brandkit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandKit),
      })

      if (!response.ok) {
        throw new Error("Failed to update brand kit")
      }

      toast({
        title: "Settings saved",
        description: "Your brand kit settings have been updated",
      })
    } catch (error) {
      console.error("Error updating brand kit:", error)
      toast({
        title: "Error",
        description: "Failed to save brand kit settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!brandKit) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Failed to load brand kit settings</p>
          <Button onClick={fetchBrandKit} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header section */}
      <div className="flex justify-end p-4">
        <button className="text-gray-400 hover:text-white">
          <HelpCircle className="w-6 h-6" />
        </button>
        <button className="ml-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {session?.user?.name?.[0] || "U"}
        </button>
      </div>

      {/* Main content area */}
      <div className="px-8 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Default Video Setting</h1>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="flex space-x-4 mb-8">
          <div className="relative">
            <select
              value={brandKit.videoFormat}
              onChange={(e) => setBrandKit({ ...brandKit, videoFormat: e.target.value })}
              className="appearance-none bg-gray-800 border-gray-700 text-white hover:bg-gray-700 pr-8 pl-4 py-2 rounded-md"
            >
              <option value="9:16">9:16</option>
              <option value="16:9">16:9</option>
              <option value="1:1">1:1</option>
              <option value="4:5">4:5</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          </div>

          <div className="relative">
            <select
              value={brandKit.language}
              onChange={(e) => setBrandKit({ ...brandKit, language: e.target.value })}
              className="appearance-none bg-gray-800 border-gray-700 text-white hover:bg-gray-700 pr-8 pl-4 py-2 rounded-md"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Logo & Endcard</h2>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Checkbox
                id="endcard"
                className="mr-2"
                checked={brandKit.hasEndcard}
                onCheckedChange={(checked) => setBrandKit({ ...brandKit, hasEndcard: checked === true })}
              />
              <label htmlFor="endcard" className="text-sm font-medium">
                Endcard
              </label>
              <div className="ml-1 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 7V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="border border-dashed border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center h-32">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-2 text-gray-500"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-gray-500 text-sm">png, jpg, mp4</div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <Checkbox
                id="watermark"
                className="mr-2"
                checked={brandKit.hasWatermark}
                onCheckedChange={(checked) => setBrandKit({ ...brandKit, hasWatermark: checked === true })}
              />
              <label htmlFor="watermark" className="text-sm font-medium">
                Watermark
              </label>
              <div className="ml-1 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 7V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="border border-dashed border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center h-32">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-2 text-gray-500"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M3 16L7 12L10 15L17 8L21 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-gray-500 text-sm">png, jpg</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="relative">
            <select
              className="appearance-none bg-gray-800 border-gray-700 text-white hover:bg-gray-700 pr-8 pl-4 py-2 rounded-md"
              defaultValue="For All Size"
            >
              <option value="For All Size">For All Size</option>
              <option value="9:16 Only">9:16 Only</option>
              <option value="16:9 Only">16:9 Only</option>
              <option value="1:1 Only">1:1 Only</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <select
              value={brandKit.backgroundColor}
              onChange={(e) => setBrandKit({ ...brandKit, backgroundColor: e.target.value })}
              className="appearance-none bg-gray-800 border-gray-700 text-white hover:bg-gray-700 pr-8 pl-4 py-2 rounded-md flex items-center"
            >
              <option value="black">Black Background</option>
              <option value="white">White Background</option>
              <option value="transparent">Transparent Background</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          </div>
        </div>

        {/* Collapsible sections */}
        <div className="border-t border-gray-800 py-4">
          <div className="flex items-center cursor-pointer" onClick={() => toggleSection("music")}>
            <ChevronDown className={`w-5 h-5 mr-2 transition-transform ${openSections.music ? "rotate-180" : ""}`} />
            <h3 className="text-lg font-bold">My Team's Music</h3>
          </div>
          {openSections.music && (
            <div className="mt-4 pl-7">
              <p className="text-gray-400">No music added yet.</p>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">Add Music</Button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 py-4">
          <div className="flex items-center cursor-pointer" onClick={() => toggleSection("font")}>
            <ChevronDown className={`w-5 h-5 mr-2 transition-transform ${openSections.font ? "rotate-180" : ""}`} />
            <h3 className="text-lg font-bold">My Team's Font</h3>
          </div>
          {openSections.font && (
            <div className="mt-4 pl-7">
              <p className="text-gray-400">No custom fonts added yet.</p>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">Add Font</Button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 py-4">
          <div className="flex items-center cursor-pointer" onClick={() => toggleSection("voice")}>
            <ChevronDown className={`w-5 h-5 mr-2 transition-transform ${openSections.voice ? "rotate-180" : ""}`} />
            <h3 className="text-lg font-bold">My AI Voice</h3>
          </div>
          {openSections.voice && (
            <div className="mt-4 pl-7">
              <p className="text-gray-400">No custom voices added yet.</p>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">Add Voice</Button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 py-4">
          <div className="flex items-center cursor-pointer" onClick={() => toggleSection("avatar")}>
            <ChevronDown className={`w-5 h-5 mr-2 transition-transform ${openSections.avatar ? "rotate-180" : ""}`} />
            <h3 className="text-lg font-bold">My AI Avatar</h3>
          </div>
          {openSections.avatar && (
            <div className="mt-4 pl-7">
              <p className="text-gray-400">No avatars added yet.</p>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">Add Avatar</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

