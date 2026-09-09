"use client"

import { createContext, ReactNode, useContext, useState } from "react"

// import { User } from "lucide-react"

export const user_service = "http://localhost:5000"
export const chat_service = "http://localhost:5002"

export interface User {
    _id: string
    name: string
    email: string

}

export interface Chat{
    _id: string
    users: string[]
    latestMessage:{
        text: string
        sender: string
    }
    createdAt : string
    updatedAt : string
    unseenCount?: number
}

export interface Chats {
    _id: string
    user: User
    chat: Chat
}

interface AppContextType{
    user: User | null
    loading: boolean
    isAuth: boolean
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    // setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    async function fetchUser() {
        try{

        }catch(error){
            console.log("Error fetching user:", error)
            setLoading(false)
        }
    }

    return <AppContext.Provider value={{user, setUser, isAuth, setIsAuth, loading}}>
        {children}
    </AppContext.Provider>
}
export const useAppData = (): AppContextType => {
    const context = useContext(AppContext)
    if(!context){
        throw new Error("useAppData must be used within an AppProvider")
    }
    return context
}