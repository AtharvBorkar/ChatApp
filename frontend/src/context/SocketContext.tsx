"use client"

import { createContext } from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
})