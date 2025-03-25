import Image from "next/image"
import { Crown, HelpCircle, LayoutGrid, Link2, Package, Palette, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Browser chrome mockup */}
      <div className="bg-gray-100 border-b flex items-center px-4 py-2 text-sm text-gray-700">
        <div className="flex items-center space-x-2 mr-4">
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.342A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex items-center">
          <div className="bg-white rounded-full border flex items-center px-3 py-1 w-full max-w-md">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-gray-800">https://www.topview.ai/dashboard/home</span>
          </div>
        </div>
      </div>

      {/* Main app */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-56 bg-[#111] text-white">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="8" width="4" height="12" fill="#6366F1" />
                  <rect x="10" y="4" width="4" height="16" fill="#6366F1" />
                  <rect x="18" y="2" width="4" height="18" fill="#6366F1" />
                </svg>
              </div>
              <span className="font-bold text-lg">TOPVIEW</span>
            </div>
          </div>
          <div className="py-4">
            <div className="px-4 py-2 flex items-center text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg mx-2 cursor-pointer">
              <LayoutGrid className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </div>
            <div className="px-4 py-2 flex items-center text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg mx-2 cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>Projects</span>
            </div>
            <div className="px-4 py-2 flex items-center text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg mx-2 cursor-pointer">
              <Package className="w-5 h-5 mr-3" />
              <span>Assets</span>
            </div>
            <div className="px-4 py-2 flex items-center text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg mx-2 cursor-pointer">
              <Palette className="w-5 h-5 mr-3" />
              <span>Brand Kit</span>
            </div>
          </div>
          <div className="mt-auto p-4 border-t border-gray-800">
            <div className="text-xs text-gray-400">Free Plan: 10 credits</div>
            <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-[#0a0a0a] text-white overflow-auto">
          {/* Special offer banner */}
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-2 text-center relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <span className="text-green-300 text-xl">🎄</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-blue-200 font-medium">SPECIAL OFFER</span>
              <span className="text-white">Enjoy a</span>
              <span className="bg-purple-700 px-2 py-1 rounded text-white font-medium">$60</span>
              <span className="text-white">coupon with</span>
              <span className="text-pink-300 underline font-medium">annual payment</span>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-blue-200 text-xl">✨</span>
            </div>
          </div>

          {/* Header section */}
          <div className="flex justify-end p-4">
            <button className="text-gray-400 hover:text-white">
              <HelpCircle className="w-6 h-6" />
            </button>
            <button className="ml-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              J
            </button>
          </div>

          {/* Main content area */}
          <div className="px-8 py-4">
            {/* Hero section */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-8 mb-8">
              <h1 className="text-3xl font-bold text-center mb-8">Create Marketing Videos from Links or Materials</h1>

              <div className="flex justify-center items-center space-x-4">
                <div className="bg-white rounded-full flex items-center pl-4 pr-2 py-2 w-full max-w-lg">
                  <Link2 className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Amazon/Shopify/TikTok/Ebay/Mercado..."
                    className="bg-transparent outline-none text-gray-800 flex-1"
                  />
                  <span className="text-indigo-500 mr-2 text-sm font-medium">Try Sample</span>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2">
                  Create Video
                </Button>
                <span className="text-gray-300">or</span>
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-500 text-white hover:bg-gray-800 rounded-full px-6 py-2"
                >
                  Upload file
                </Button>
              </div>
            </div>

            {/* AI Creation Tools */}
            <h2 className="text-2xl font-bold mb-6">AI Creation Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden">
                <div className="p-4">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Avatar Marketing Video"
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">Avatar Marketing Video</h3>
                  <p className="text-sm text-gray-300">Create marketing video ads from link or local materials</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden">
                <div className="p-4">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Video Avatar"
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">Video Avatar</h3>
                  <p className="text-sm text-gray-300">Create avatar videos or clone your avatar from a video</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden relative">
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  New
                </div>
                <div className="p-4">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Product Avatar"
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">Product Avatar</h3>
                  <p className="text-sm text-gray-300">Create an avatar holding your product with one image</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden relative">
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  New
                </div>
                <div className="p-4">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Product AnyShoot"
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">Product AnyShoot</h3>
                  <p className="text-sm text-gray-300">
                    Fit any product anywhere, perfect for try-ons and product showcases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

