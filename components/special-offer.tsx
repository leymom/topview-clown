export default function SpecialOffer() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-2 text-center relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <span className="text-green-300 text-xl">🎄</span>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <span className="text-blue-200 font-medium">SPECIAL OFFER</span>
        <span className="text-white">Enjoy a</span>
        <span className="bg-purple-700 px-2 py-1 rounded text-white font-medium">$60</span>
        <span className="text-white">coupon with</span>
        <a href="#" className="text-pink-300 underline font-medium">
          annual payment
        </a>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <span className="text-blue-200 text-xl">✨</span>
      </div>
    </div>
  )
}

