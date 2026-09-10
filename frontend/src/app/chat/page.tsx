"use client"
import { useAppData } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ChatApp = () => {
  const {loading, isAuth} = useAppData()

  const router = useRouter()

  useEffect(()=> {
    if(!isAuth && !loading){
      router.push('/login')
    }
  })
  return (
    <div>ChatApp</div>
  )
}

export default ChatApp