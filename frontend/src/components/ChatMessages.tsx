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
    <div className="flex-1 overflow-hidden">
        <div className="h-full max-h-[calc(100vh-215px)] overflow-y-auto p-2 space-y-2 custom-scroll">
            {
                !selectedUser? (
                    <p className="text-gray-400 text-center mt-20">
                        Select a user to start chatting📩
                    </p>
                ) : (
                    <>
                    {
                        uniqueMessages?.map((e,i)=>{
                            const isSentByMe = e.sender === loggedInUser?._id
                            const uniqueKey = `${e._id}-${i}`;
                            
                            return(
                                <div className={`flex flex-col gap-1 mt-2 ${isSentByMe? "items-end" : "items-start"}`} >
                                    <div className={`rounded-lg p-3 max-w-sm ${isSentByMe? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}
                                    >{
                                        e.messageType === "image" && e.image && (
                                            <div className="relative group">
                                                <img src={e.image.url} alt="Shared Image" className="rounded-lg h-auto max-w-full" />
                                            </div>
                                        )
                                    }

                                    {e.text && <p className="mt-1">{e.text}</p>}
                                    </div>

                                </div>
                            )// Create a unique key using message ID and index
                        })
                    }
                    </>
                )
            }
        </div>
    </div>
  )
}

export default ChatMessages