import { User } from '@/context/AppContext'
import { X } from 'lucide-react'
import React, { useState } from 'react'

interface MessageInputProps {
  selectedUser: User | null
  message: string
  setMessage: (message: string) => void
  handleMessageSend: (e:any, imageFile?: File | null) => void
  
  
}

const MessageInput = ({
    selectedUser,
    handleMessageSend,
    setMessage,
    message
}: MessageInputProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isUploaidng, setIsUploading] = useState(false)
    
    const handleSubmit = async(e:any) => {
        e.preventDefault()
        if(!message.trim() && !imageFile) return

        setIsUploading(true)
        await handleMessageSend(e, imageFile)
        setImageFile(null)
        setIsUploading(false)
    }

    if(!selectedUser) return null
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-t border-red-700 pt-2">
        {
            imageFile && <div className="relative w-fit">
                <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-24 h-24 object-cover border border-gray-600 max-h-48 rounded-lg" />
                <button type="button" className="absolute -top-2 -right-2 bg-black rounded-full p-1" onClick={() => setImageFile(null)}>
                    <X className="w-4 h-4 text-white"/>
                </button>

            </div>
        }
    </form>
  )
}

export default MessageInput