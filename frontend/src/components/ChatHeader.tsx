import { MenuIcon, UserCircle } from 'lucide-react'
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
            <button className="p-3 bg-gray-800 rounded-lg hover:bggray700 transition-colors" onClick={() => setSidebarOpen(true)}>
                <MenuIcon className="w-6 h-5 text-gray-200" />
            </button>
        </div>

        {/* chat header */}
        <div className="mb-6 bg-gray-800 rounded-lg border-gray-700 p-6">
            <div className="flex items-center gap-4">
                {
                    user? (
                        <>
                            <div className="relative">
                                <div className="rounded-full w-14 h-14 bg-gray-700 flex items-center justify-center">
                                    <UserCircle className="w-8 h-8 text-gray-300" />
                                </div>
                                {/* online status indicator */}
                            </div>
                            {/*User Info*/}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-2xl font-bold text-white trunacate">
                                        {user.name}
                                    </h2>
                                </div>
                            </div>

                            {/* to show typing ststus */}
                        </>

                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
                                <UserCircle className="w-8 h-8 text-gray-300" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-400">
                                    Select a conversation
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Choose a chat from the sidebar to start chatting
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
        </>
    )
}

export default ChatHeader