"use client"
// import ChatSidebar from '@/components/ChatSidebar'
import ChatSidebar from "../../components/ChatSidebar";
import Loading from '@/components/Loading'
import { Chat, chat_service, useAppData, User } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast/headless";
import Cookies from 'js-cookie'
import axios from 'axios'
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import MessageInput from "@/components/MessageInput";
import token from 'js-cookie'
import { SocketData } from '@/context/SocketContext';

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
  seen?: boolean
  seenAt?: string
  createdAt: string
}

const ChatApp = () => {
  const {loading, isAuth, logoutUser, chats, user: loggedInUser, users, fetchChats} = useAppData()

  const {onlineUsers, socket} = SocketData() // Use the SocketData hook to get online users
  //console.log("Online Users:", onlineUsers) // Log the online users to verify

  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  //const [selectedUser, setSelectedUser] = useState<User | null>(null);
  //const [messages, setMessages] = useState("")
  //const [messages, setMessages] = useState<string>("")
  //const [messages, setMessages] = useState<Message[]>([])
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [message, setMessage] = useState<string>("")
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

  async function fetchChat() {
    const token = Cookies.get("token")
    try{
      const {data} = await axios.get(`${chat_service}/api/v1/message/${selectedUser}`, {
        headers: {
          Authorization: `Bearer ${token}`
          //Authorization: `Bearer ${Cookies.get("token")}`,
        }
      })
      setMessages(data.messages)
      setUser(data.user)
      await fetchChats()
    }catch(error){
      console.log(error)
      toast.error("Failed to fetch chat")
    }
  }

  // const moveChatToTop = (chatId: string, newMessage: any, updatedUnseenCount: true) => {
  //   setChats((prev)=>{
  //     if(!prev) return null

  //     const updatedChats = [...prev]
  //     const chatIndex = updatedChats.findIndex(
  //       (chat)=> chat._id === chatId
  //     )
  //   })
  // }

  //added by claude during a fix

  const moveChatToTop = (
     setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
     chatId: string,
     newMessage: any,
     updatedUnseenCount: true
   ) => {
     setChats((prev) => {
  if (!prev) return prev;   // was: return null
  const updatedChats = [...prev];
  const chatIndex = updatedChats.findIndex((chat) => chat._id === chatId);
  // ...

  if (chatIndex !== -1) {
    const [moveChat] = updatedChats.splice(chatIndex, 1);
    // Update the last message and unseen count

    // const updatedChat = {
    //   ...moveChat,
    //   chat: {
    //     ...moveChat.chat,
    //     lastMessage:{
    //       text: newMessage.text,
    //       sender: newMessage.sender,
    //     }
    //   }
    // }
    const updatedChat = {
        ...moveChat,
      latestMessage: {
      text: newMessage.text,
      sender: newMessage.sender, // or whatever field holds the sender id
      },
    };
  }
  return updatedChats;
  });
  };

  async function createChat(u: User){
    try{
      const token = Cookies.get("token")
      const {data} = await axios.post(`${chat_service}/api/v1/chat/new`, 
        {
          userId: loggedInUser?._id,
          otherUserId: u._id,
        },{
          headers:{
            Authorization: `Bearer ${token}`
            //Authorization: `Bearer ${Cookies.get("token")}`,
          }
        }
      )

      setSelectedUser(data.chatId)
      setShowAllUsers(false)
      await fetchChats()
    }catch(error){
      toast.error("Failed to start chat")
    }
  }

  const handleMessageSend = async (e:any, imageFile?: File | null) => {
    e.preventDefault()

    if(!message.trim() && !imageFile) return

    if(!selectedUser) return

    //Scoket Work
    if(typingTimeout){
      clearTimeout(typingTimeout)
      setTypingTimeout(null)
    }

    socket?.emit("stopTyping", {
      chatId: selectedUser,
      userId: loggedInUser?._id
    })

    try{
      const formData = new FormData()

      formData.append("chatId", selectedUser || "")

      if(message.trim()){
        formData.append("text", message)
      }

      if(imageFile){
        formData.append("image", imageFile)
      }

      const {data} = await axios.post(`${chat_service}/api/v1/message`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          //Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })

    setMessages((prev)=>{
      const currentMessages = prev || []
      const mesageExists = currentMessages.some(
        (msg) => msg._id === data.message._id
      )
      if(!mesageExists){
        return [...currentMessages, data.message]
      }
      return currentMessages
    })
    setMessage("")

    const displayText = imageFile ? "📷 image" : message
    }catch(error:any){
      toast.error(error.response.data.message)
    }
  }

  const handleTyping = (value : string) => {
    setMessage(value)

    if(!selectedUser || !socket) return

    //Socket Setup
    if(value.trim()){
      socket.emit("typing", {
        chatId: selectedUser,
        userId: loggedInUser?._id
      })
    }

    if(typingTimeout){
      clearTimeout(typingTimeout)
    }

    const timeout = setTimeout(() => {
      socket.emit("stopTyping", {
        chatId: selectedUser,
        userId: loggedInUser?._id
      })
    }, 2000)
    setTypingTimeout(timeout)
  }

  useEffect(()=>{
    socket?.on("userTyping", (data)=>{
      console.log("receved user typing", data)
      if(data.chatId === selectedUser && data.userId !== loggedInUser?._id){
        setIsTyping(true)
      }
    })
    socket?.on("userStopedTyping", (data)=>{
      console.log("receved user stop typing", data)
      if(data.chatId === selectedUser && data.userId !== loggedInUser?._id){
        setIsTyping(false)
      }
    })

    return () => {
      socket?.off("userTyping")
      socket?.off("userStopedTyping")
    }
  },[socket, selectedUser, loggedInUser?._id])

  useEffect(()=>{
    if(selectedUser){
      fetchChat()
      setIsTyping(false)

      socket?.emit("joinChat", selectedUser)

      return () => {
        socket?.emit("leaveChat", selectedUser)
        setMessages(null)
      }
    }
  },[selectedUser, socket])

  useEffect(()=>{
    return () => {
      if(typingTimeout){
        clearTimeout(typingTimeout)
      }
    }
  },[typingTimeout])
  
  if(loading) return <Loading />
  return (
    <div className="min-h-screen flex bg-gray-900 text-white relative overflow-hidden"> {/* removed min-h-screen and addded h-screen by claude fix */}
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
      createChat={createChat}
      onlineUsers={onlineUsers} // Pass online users to ChatSidebar
      />
      <div className="flex-1 flex flex-col justify-between p-4 backdrop-blur-xl bg-white/5 border border-white/10">
        <ChatHeader
        user={user}
        setSidebarOpen={setSidebarOpen}
        isTyping={isTyping}
        onlineUsers={onlineUsers} // Pass online users to ChatHeader
        />

        <ChatMessages
        selectedUser={selectedUser}
        messages={messages}
        loggedInUser={loggedInUser}
        />

        <MessageInput
        selectedUser={selectedUser}
        //selectedUser={selectedUser?._id ?? null}
        //selectedUser={selectedUser?._id ?? null}
        handleMessageSend={handleMessageSend}
        setMessage={handleTyping}
        message={message} />
      </div>
    </div>
  )
}

export default ChatApp