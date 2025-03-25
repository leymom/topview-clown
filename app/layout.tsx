import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import BrowserChrome from "@/components/browser-chrome"
import SpecialOffer from "@/components/special-offer"
import ChatButton from "@/components/chat-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Topview AI - Create Marketing Videos",
  description: "Create marketing videos from links or materials with AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="min-h-screen flex flex-col">
            <BrowserChrome />
            <div className="flex flex-1">
              <Sidebar />
              <div className="flex-1 bg-[#0a0a0a] text-white overflow-auto">
                <SpecialOffer />
                {children}
              </div>
            </div>
          </div>
          <ChatButton />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'