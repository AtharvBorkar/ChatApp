import { User } from '@/context/AppContext'
import React from 'react'
interface ChatSidebarProps {
    sidebaOpen: boolean
    setSidebarOpen: (open: boolean) => void
    showAllUsers: boolean
    setShowAllUsers: (show: boolean | ((prev: boolean) => boolean)) => void
    users: User[] | null
    logedInUser: User | null
    chats: any[] | null
    selectedUser: (userId: String | null) => void
    handleLogout: () => void
}

const ChatSidebar = ({}:ChatSidebarProps) => {
  return (
    <div>ChatSidebar</div>
  )
}

export default ChatSidebar