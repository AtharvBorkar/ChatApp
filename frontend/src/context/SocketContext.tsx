"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppData, chat_service } from "./AppContext";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
})

interface ProviderProps {
    children : ReactNode
}

export const SocketProvider = ({children}: ProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const {user} = useAppData()

    useEffect(() => {
        if(!user?._id) return;

        // Initialize the socket connection
        const newSocket = io(chat_service);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user?._id])

    return <SocketContext.Provider value={{ socket }}>
        {children}
    </SocketContext.Provider>
}

export const SocketData = () => useContext(SocketContext)