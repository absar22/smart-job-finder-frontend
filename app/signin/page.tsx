"use client"
import React from 'react'
import Link from 'next/link'
import react, {useState,useEffect} from 'react'
import { useLoginMutation } from '@/redux/api/authApi'
import { useRouter } from 'next/navigation'
import { loginSchema, formatJoiErrors } from '@/utils/validators'
export default function SigninPage() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
    const [login,{isLoading}] = useLoginMutation()
    const router = useRouter()
    const handleSubmit = async(e:React.FormEvent)=> {
        e.preventDefault()
        setError('')
        setValidationErrors({})
        
        const { error: joiError } = loginSchema.validate({ email, password }, { abortEarly: false })
        if (joiError) {
            setValidationErrors(formatJoiErrors(joiError))
            return
        }
        try {
              await login({email,password}).unwrap()
                 router.push('/dashboard')
            
        } catch (err) {
            setError('Invalid email or password')
        }
    }
     const displayError = () => {
       if (error) {
         return <div className="text-red-500 text-center">{error}</div>;
       }
     };

    return (
        // Added flex-col to stack the title, form, and footer link vertically
        <div className='flex flex-col items-center justify-center h-screen w-full'>
            <div className='w-full max-w-md p-8 border rounded-lg shadow-sm'>
                <h1 className='text-4xl font-bold mb-6 text-center'>Signin</h1>
                
                <form className='flex flex-col gap-4'>
                    <div>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email' 
                            placeholder='Email' 
                            className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        />
                        {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
                    </div>
                    <div>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password' 
                            placeholder='Password' 
                            className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        />
                        {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}
                    </div>
                    <Link href="/forgot-password" className='text-gray-500 hover:text-red-400 flex justify-end'>Forgot Password?</Link>
                    <button 
                        onClick={handleSubmit}
                        type='submit' 
                        className='bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2 rounded font-semibold'
                    >
                        Signin
                    </button>
                      {displayError()}
                </form>
                    
                <p className='mt-6 text-center text-gray-600'>
                    Don't have an account? <Link href="/signup" className='text-blue-500 hover:underline'>Signup</Link>
                </p>
            </div>
        </div>
    )
}