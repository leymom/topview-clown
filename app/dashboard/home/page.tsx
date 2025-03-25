import Image from "next/image"
import { HelpCircle, Link2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div>
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
              <span className="text-indigo-500 mr-2 text-sm font-medium cursor-pointer">Try Sample</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden">
            <div className="p-4 relative">
              <Image
                src="/images/photo-avatar.png"
                alt="Photo Avatar"
                width={300}
                height={200}
                className="rounded-lg w-full h-40 object-cover"
              />
              <div className="absolute bottom-6 right-6 bg-black bg-opacity-50 rounded-full p-1">
                <Play className="w-4 h-4" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">Photo Avatar</h3>
              <p className="text-sm text-gray-300">Make the picture talk</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden">
            <div className="p-4 relative">
              <Image
                src="/images/avatar-marketing.png"
                alt="AI Image Creation"
                width={300}
                height={200}
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">AI Image Creation</h3>
              <p className="text-sm text-gray-300">Enter prompts to generate images</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden">
            <div className="p-4 relative">
              <div className="rounded-lg w-full h-40 bg-indigo-800 flex flex-col items-center justify-center p-4">
                <div className="text-white mb-2 text-center">
                  Hello viewers!
                  <br />
                  Today we'll discuss...
                </div>
                <div className="w-full mt-2 flex justify-center">
                  <div className="bg-indigo-700 rounded-full p-2 flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    <div className="w-32 h-4 bg-indigo-600 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-4 w-1 bg-indigo-400 mx-px"
                            style={{ height: `${Math.random() * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">AI Voice Generator</h3>
              <p className="text-sm text-gray-300">Transfer text to speech</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden relative">
            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Coming soon
            </div>
            <div className="p-4">
              <div className="rounded-lg w-full h-40 bg-indigo-800 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg text-black text-sm max-w-[80%]">
                  <div className="font-bold mb-1">Hi, how can I help?</div>
                  <div className="text-xs text-gray-600">Please introduce TopView</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">Real-time ChatAvatar</h3>
              <p className="text-sm text-gray-300">An avatar for real-time interactions</p>
            </div>
          </div>
        </div>

        {/* Second row of AI Creation Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden">
            <div className="p-4">
              <div className="rounded-lg w-full h-40 bg-indigo-800 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <div className="bg-indigo-700 rounded-lg h-16"></div>
                  <div className="bg-indigo-700 rounded-lg h-16"></div>
                  <div className="bg-indigo-700 rounded-lg h-16"></div>
                  <div className="bg-indigo-700 rounded-lg h-16"></div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">Avatar Marketing Video</h3>
              <p className="text-sm text-gray-300">Create marketing video ads from link or local materials</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden">
            <div className="p-4">
              <div className="rounded-lg w-full h-40 bg-indigo-800 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1 p-2">
                  <div className="bg-indigo-700 rounded-lg h-12"></div>
                  <div className="bg-indigo-700 rounded-lg h-12"></div>
                  <div className="bg-indigo-700 rounded-lg h-12"></div>
                  <div className="bg-indigo-700 rounded-lg h-12"></div>
                  <div className="bg-indigo-700 rounded-lg h-12"></div>
                  <div className="bg-indigo-700 rounded-lg h-12"></div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">Video Avatar</h3>
              <p className="text-sm text-gray-300">Create avatar videos or clone your avatar from a video</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden relative">
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">New</div>
            <div className="p-4">
              <div className="rounded-lg w-full h-40 bg-indigo-800 flex items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-32 bg-indigo-700 rounded-lg"></div>
                  <div className="absolute -right-10 top-4 w-20 h-20 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-16 bg-indigo-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1">Product Avatar</h3>
              <p className="text-sm text-gray-300">Create an avatar holding your product with one image</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden relative">
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">New</div>
            <div className="p-4">
              <div className="rounded-lg w-full h-40 bg-indigo-800 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-indigo-700 rounded-lg h-16 w-16"></div>
                  <div className="bg-indigo-700 rounded-lg h-16 w-16"></div>
                  <div className="bg-indigo-700 rounded-lg h-16 w-16"></div>
                  <div className="bg-indigo-700 rounded-lg h-16 w-16"></div>
                </div>
              </div>
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
  )
}

