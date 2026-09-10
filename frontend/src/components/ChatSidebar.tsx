import { User } from '@/context/AppContext'
import React, { useState } from 'react'
import { X, MessageCircle, Plus, Search } from 'lucide-react'
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
    <aside className={`fixed z-20 sm:static top-0 left-0 h-screen w-80 bg-gray-900 border-r boredr-gray-700 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 transition-transform duration-300 flex flex-col`}>
        {/*header*/}
        <div className="p-6 border-b border-gray-700">
            <div className="sm:hidden flex justify-end mb-0">
                <button onClick={()=>setSidebarOpen(false)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-300"/>
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 justify-between">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                        {showAllUsers ? "New Chat" : "Messages"}
                    </h2>
                </div>

                <button className={`p-2.5 rounded-lg transition-colors ${showAllUsers ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}
                onClick={()=> setShowAllUsers((prev)=> !prev)}
                >
                    {showAllUsers ? ( <X className="w-4 h-4" /> ) : ( <Plus className="w-4 h-4" /> )}
                </button>
            </div>
        </div>

        {/*content*/}
        <div className="flex-1 overflow-hdden px-4 py-2">
            {
                showAllUsers? <div className="space-y-4 h-full">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search Usres..." className="w-full pl-10 pr-4 py-3 bg-gray-800 border-fray-700 text-white placeholder-gray-400"
                            value={searchQuery} 
                            onChange={e=> setSearchQuery(e.target.value)} />
                    </div>

                    {/*user list*/}
                    <div className="space-y-2 overflow-y-auto h-full pb-4">
                        {
                            users?.filter((u)=> u._id !== loggedInUser?._id && u.name.toLowerCase().includes(searchQuery.toLocalLowerCase())).map((u)=>(
                                <button>
                                    
                                </button>
                            ))
                        }
                    </div>
                </div>
            :  <div></div>
            }
        </div>
    </aside>
  )
}

export default ChatSidebar