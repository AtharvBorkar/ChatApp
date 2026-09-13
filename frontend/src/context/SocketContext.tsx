"use client"

import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppData } from "./AppContext";

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
        const newSocket = io();
        setSocket(newSocket);
    }, [user])
}