import React, { useEffect, useMemo, useRef } from 'react'
import { Message } from '@/app/chat/page'
import { User } from '@/context/AppContext';


interface ChatMessagesProps {
    selectedUser: User | null;  //{ was string }
    messages: Message[] | null;
    loggedInUser: User | null;
}

const ChatMessages = ( { selectedUser, messages, loggedInUser }: ChatMessagesProps ) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    //Seen feature
    const uniqueMessages = useMemo(() => {
        if (!messages) return [];
        const seen = new Set();
        return messages.filter((message) => {
            if(seen.has(message._id)){
                return false;
            }
            seen.add(message._id);
            return true;
        })
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedUser, uniqueMessages]);

  return (
    <div>ChatMessages</div>
  )
}

export default ChatMessages