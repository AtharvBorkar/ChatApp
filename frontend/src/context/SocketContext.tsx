"use client"

import { createContext, ReactNode, useState } from "react";
import { Socket } from "socket.io-client";

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
}