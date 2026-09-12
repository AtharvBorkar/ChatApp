import { MenuIcon } from 'lucide-react'
import { User } from "@/context/AppContext"
import React from 'react'

interface ChatHeaderProps {
    user: User | null
    setSidebarOpen: (open: boolean) => void
    isTyping: boolean
}

const ChatHeader = ({ user, setSidebarOpen, isTyping }: ChatHeaderProps) => {
  return (
        <>
        {/* mobile menu toggle */}
        <div className="sm:hidden fixed top-4 right-4 z-30">
            <button className="p-3 bg-gray-800 rounded-lg hover:bggray700 transition-colors">
                <MenuIcon className="w-6 h-5 text-gray-200" />
            </button>
        </div>
        </>
    )
}

export default ChatHeader