"use client"
import React, {useState,useEffect} from 'react'
import Link from 'next/link'
import { useSignupMutation } from '@/redux/api/authApi'
import { useRouter } from 'next/navigation'
import {Eye,EyeOff} from 'lucide-react'
import { signupSchema, formatJoiErrors } from '@/utils/validators'
export default function SignupPage() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [showPassword,setShowPassword]= useState(false)
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
    const [signup,{isLoading}] = useSignupMutation()
    const router = useRouter()
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setValidationErrors({})

        const { error: joiError } = signupSchema.validate({ name, email, password }, { abortEarly: false })
        if (joiError) {
            setValidationErrors(formatJoiErrors(joiError))
            return
        }

        if(password !== confirmPassword){
            setValidationErrors({ confirmPassword: 'Passwords do not match' })
            return
        }
        try{
            await signup({email,password,name}).unwrap()
            router.push('/dashboard')
        }catch(err){
            console.error(err)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen w-full'>
            <div className='w-full max-w-md p-8 border rounded-lg shadow-sm'>
                <h1 className='text-4xl font-bold mb-6 text-center'>Signup</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <input
                            type="text"
                            placeholder='Name'
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        />
                        {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
                    </div>
                    <div>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        />
                        {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
                    </div>
                    <div>
                        <div className='relative'>
                            <input 
                                type={showPassword? 'text' : 'password'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full border p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' 
                            />
                            <button 
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                        {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}
                    </div>
                    <div>
                        <input 
                            type='password' 
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        />
                        {validationErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>}
                    </div>
                    <button 
                        type='submit'
                        disabled={isLoading}
                        className='bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2 rounded font-semibold'
                    >
                        Signup
                    </button>
                </form>

                <p className='mt-6 text-center text-gray-600'>
                    Already have an account? <Link href="/signin" className='text-blue-500 hover:underline'>Signin</Link>
                </p>
            </div>
        </div>
    )
}