"use client"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white text-black rounded-lg shadow-lg w-80 h-96 mb-4 overflow-hidden flex flex-col">
          <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Topview AI Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-indigo-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="bg-gray-100 p-3 rounded-lg mb-2 text-sm">
              Hi there! How can I help you with creating videos today?
            </div>
          </div>
          <div className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button className="rounded-l-none bg-indigo-600 hover:bg-indigo-700">Send</Button>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    </div>
  )
}

