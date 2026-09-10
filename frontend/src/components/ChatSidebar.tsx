import { User } from '@/context/AppContext'
import React, { useState } from 'react'
import { X } from 'lucide-react'
interface ChatSidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    showAllUsers: boolean
    setShowAllUsers: (show: boolean | ((prev: boolean) => boolean)) => void
    users: User[] | null
    loggedInUser: User | null
    chats: any[] | null
    selectedUser: User | null
    setSelectedUser: (userId: User | null) => void
    handleLogout: () => void
}

const ChatSidebar = ({sidebarOpen, setSidebarOpen, showAllUsers, setShowAllUsers, users, loggedInUser, chats, selectedUser, handleLogout}:ChatSidebarProps) => {
    const [ searchQuery, setSearchQuery] = useState("")
  return (
    <aside className={`fixed z-20 sm:static top-0 left-0 h-screen w-80 bg-gray-900 border-r boredr-gray-700 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 transition-transform duration-300 flex-col`}>
        {/*header*/}
        <div className="sm:hidden flex justify-end mb-0">
            <button className="">
                <X className="w-5 h-5 text-gray-300"
            </button>
        </div>
    </aside>
  )
}

export default ChatSidebar