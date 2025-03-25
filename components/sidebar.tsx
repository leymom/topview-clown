"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Crown, LayoutGrid, Package, Palette } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-56 bg-[#111] text-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <Link href="/dashboard/home" className="flex items-center">
          <div className="mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="4" height="12" fill="#6366F1" />
              <rect x="10" y="4" width="4" height="16" fill="#6366F1" />
              <rect x="18" y="2" width="4" height="18" fill="#6366F1" />
            </svg>
          </div>
          <span className="font-bold text-lg">TOPVIEW</span>
        </Link>
      </div>

      <div className="py-4 flex-1">
        <Link
          href="/dashboard/home"
          className={`px-4 py-2 flex items-center ${isActive("/dashboard/home") ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} rounded-lg mx-2 cursor-pointer`}
        >
          <LayoutGrid className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/dashboard/projects"
          className={`px-4 py-2 flex items-center ${isActive("/dashboard/projects") ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} rounded-lg mx-2 cursor-pointer`}
        >
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
        </Link>

        <Link
          href="/dashboard/assets"
          className={`px-4 py-2 flex items-center ${isActive("/dashboard/assets") ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} rounded-lg mx-2 cursor-pointer`}
        >
          <Package className="w-5 h-5 mr-3" />
          <span>Assets</span>
        </Link>

        <Link
          href="/dashboard/brandkit"
          className={`px-4 py-2 flex items-center ${isActive("/dashboard/brandkit") ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"} rounded-lg mx-2 cursor-pointer`}
        >
          <Palette className="w-5 h-5 mr-3" />
          <span>Brand Kit</span>
        </Link>
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400">
          Free Plan: <span className="text-green-500">10 credits</span>
        </div>
        <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
          <Crown className="w-4 h-4 mr-2" />
          Upgrade
        </button>
      </div>
    </div>
  )
}

