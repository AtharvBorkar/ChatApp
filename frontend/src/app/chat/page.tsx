"use client"
// import ChatSidebar from '@/components/ChatSidebar'
import ChatSidebar from "../../components/ChatSidebar";
import Loading from '@/components/Loading'
import { chat_service, useAppData, User } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast/headless";
import Cookies from 'js-cookie'
import axios from 'axios'

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

  async function createChat(u: User){
    try{
      const token = Cookies.get("token")
      const {data} = await axios.post(`${chat_service}/api/v1/chats/new`, 
        {
          userId: loggedInUser?._id,
          otherUserId: u._id,
        }
      )
    }catch(error){
      toast.error("Failed to start chat")
    }
  }
  
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
      <div className="flex-1 flex flex-col justify-between p-4 backdrop-blur-xl bg-white/5 border border-white/10"></div>
    </div>
  )
}

export default ChatApp