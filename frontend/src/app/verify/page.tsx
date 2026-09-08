"use client"
import { ArrowRight, Loader2, Lock } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const VerifyPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const [error, setError] = useState<string>("")
    const [resendLoading, setResendLoading] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(60)
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const router = useRouter()

    const searchParams = useSearchParams()
    const email: string = searchParams.get('email') || ''
    useEffect(() => {
        if(timer > 0){
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const handleInputChange = (index: number, value: string): void => {
        if(value.length>1) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError("")

        if(value && index < 5){
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text')
        const digits = pastedData.replace(/\D/g, '').slice(0, 6)
        if(digits.length === 6){
            const newOtp = digits.split('')
            setOtp(newOtp)
            inputRefs.current[5]?.focus() 
        }
    }

    const handleKeyDown = (index:number,e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

    }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full">
            <div className="bg-grey-800 border border-gray-700 rounded-lg p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                        <Lock size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-300 text-lg">
                        We have sent a 6-digit code to
                    </p>
                    <p className="text-blue-400 font-medium">{email}
                        
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-4 text-center">Enter your 6 digit otp here</label>
                    <div className="flex justify-center in-checked: space-x-3">
                        {
                            otp.map((digit, index) => (
                                <input key={index} ref={(el: HTMLInputElement | null)=>{
                                    inputRefs.current[index] = el /*as HTMLInputElement*/
                                }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={e=> handleInputChange(index, e.target.value)}
                                onKeyDown={e=> handleKeyDown(index,e)}
                                onPaste={index===0? handlePaste: undefined}
                                className="w-12 h-12 text-center text-xl border-2border-gray-600 rounded-lg bg-gray-700 text-white"
                                />
                            ))
                        }
                    </div>
                    {/* <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" /*value={email} onChange={(e) => setEmail(e.target.value)} required/> */}
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                    {
                        loading? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5" />
                            Verifying...
                        </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <span>Verify</span>
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

export default VerifyPage