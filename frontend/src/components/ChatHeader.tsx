import { MenuIcon, UserCircle } from 'lucide-react'
import { User } from "@/context/AppContext"
import React from 'react'

interface ChatHeaderProps {
    user: User | null
    setSidebarOpen: (open: boolean) => void
    isTyping: boolean
    onlineUsers?: string[] // Add onlineUsers prop
}

const ChatHeader = ({ user, setSidebarOpen, isTyping, onlineUsers }: ChatHeaderProps) => {
    const isOnlineUser = user && onlineUsers?.includes(user._id); // Check if the user is online
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
                                {
                                    isOnlineUser && (
                                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-gray-800">
                                            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75">

                                            </span>
                                        </span>
                                    )
                                }
                                
                            </div>
                            {/*User Info*/}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-2xl font-bold text-white trunacate">
                                        {user.name}
                                    </h2>
                                </div>
                                {/* to show typing ststus */}
                                <div className="flex items-center gap-2">
                                    {
                                        isTyping ? (
                                        <div className="flex items-center gap-2 text-sm">
                                            <div>
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                            <span className="text-blue-500 font-medium`">
                                                Typing...
                                            </span>
                                        </div>
                                        ) : (
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${isOnlineUser ? "bg-green-500" : "bg-gray-500"}`}></div>
                                                                                       
                                            <span className={`text-sm font-medium ${isOnlineUser ? "text-green-500" : "text-gray-400"}`}>
                                                {isOnlineUser ? "Online" : "Offline"}
                                            </span>

                                        </div> 
                                    )}
                                </div>
                            </div>

                            
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