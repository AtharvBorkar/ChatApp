"use client"
import React, { useState } from 'react'
import { ArrowBigRight, ArrowRight, Loader2, Mail } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'
import { user_service, useAppData } from '@/context/AppContext'
import Loading from '@/components/Loading'

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const {isAuth, loading: userLoading} = useAppData()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setLoading(true)

        try{
            const {data} = await axios.post(`${user_service}/api/v1/login`, {
                email,
            })
            console.log(data)
            alert(data.message)
            router.push(`/verify?email=${encodeURIComponent(email)}`)
        }catch(error: any){
            alert(error?.response?.data?.message || error.message || "Failed to send OTP")
        }finally{
            setLoading(false)
        }
    }

    if (userLoading) return <Loading />
    if (isAuth) return redirect("/chat")
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full">
            <div className="bg-grey-800 border border-gray-700 rounded-lg p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                        <Mail size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">
                        Welcome To ChatApp
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Enter your Email to Continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Adress</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                    {
                        loading? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5" />
                            Sending Opt to your mail...
                        </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <span>Send Verification Code</span>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        )
                    }
                    
                </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage