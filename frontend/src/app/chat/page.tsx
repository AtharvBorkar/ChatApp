"use client"
// import ChatSidebar from '@/components/ChatSidebar'
import ChatSidebar from "../../components/ChatSidebar";
import Loading from '@/components/Loading'
import { useAppData, User } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export interface Message{
  _id: string
  chatId: string
  sender: string
  text?: string
  image?: {
    url: string
    publicId: string
  }
  messageType: "text" | "image"
  seenAt?: string
  createdAt: string
}

const ChatApp = () => {
  const {loading, isAuth, logoutUser, chats, user: loggedInUser, users, fetchChats} = useAppData()

  // const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showAllUsers, setShowAllUsers] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)

  const router = useRouter()

  useEffect(()=> {
    if(!isAuth && !loading){
      router.push('/login')
    }
  },[isAuth, router, loading])

  const handleLogout = () => logoutUser()
  
  if(loading) return <Loading />
  return (
    <div className="min-h-screen flex bg-gray-900 text-white relative overflow-hidden">
      <ChatSidebar 
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      showAllUsers={showAllUsers}
      setShowAllUsers={setShowAllUsers}
      users={users}
      loggedInUser={loggedInUser}
      chats={chats}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      handleLogout={handleLogout}
      />
    </div>
  )
}

export default ChatApp