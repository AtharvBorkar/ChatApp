import React from 'react'
import { Mail } from 'lucide-react'

const LoginPage = () => {
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
                        Enter your email to continue
                    </p>
                </div>

                <form className=""></form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage