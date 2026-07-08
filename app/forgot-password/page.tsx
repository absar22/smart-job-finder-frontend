'use client'
import Link from 'next/link'
import { useForgotPasswordMutation } from '@/redux/api/authApi'
import { useState } from 'react'
export default function ForgotPassword() {
    const [forgotPassword] = useForgotPasswordMutation();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = e.currentTarget.email.value;
        try{
            const res = await forgotPassword(email).unwrap()
            setSuccess(res.message)
            setError("")
        }catch(err:any){
            setSuccess("")
            setError(err.data.message)
        }
      
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen w-full'>
            <div className='w-full max-w-md p-8 border rounded-lg shadow-sm'>
                <h1 className='text-4xl font-bold mb-6 text-center'>Forgot Password</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2 rounded font-semibold'
                    >
                        Reset Password
                    </button>
                    {error && <p className="text-red-500 flex justify-center">{error}</p>}
                    {success && <p className="text-green-500 flex justify-center">{success}</p>}
                </form>
                <p className='mt-6 text-center text-gray-600'>
                    Remembered your password? <Link href="/signin" className='text-blue-500 hover:underline'>Signin</Link>
                </p>
            </div>
        </div>
    )
}