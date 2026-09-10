"use client"
import Loading from '@/components/Loading'
import { useAppData } from '@/context/AppContext'
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

  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  const router = useRouter()

  useEffect(()=> {
    if(!isAuth && !loading){
      router.push('/login')
    }
  },[isAuth, loading])
  
  if(loading) return <Loading />
  return <div>ChatApp</div>
}

export default ChatApp