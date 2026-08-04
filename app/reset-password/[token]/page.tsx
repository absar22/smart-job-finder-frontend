"use client"
import { useParams } from 'next/navigation'
import { useResetPasswordMutation } from '@/redux/api/authApi'
import { useState } from 'react'
import { resetPasswordSchema, formatJoiErrors } from '@/utils/validators'

export default function ResetPasswordPage(){
   const params = useParams()
  const token = params.token
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [resetPassword] = useResetPasswordMutation()
  
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setValidationErrors({})
    const password = e.currentTarget.password.value
    const confirmPassword = e.currentTarget.confirmPassword.value
    
    const { error: joiError } = resetPasswordSchema.validate({ password, confirmPassword }, { abortEarly: false })
    if (joiError) {
        setValidationErrors(formatJoiErrors(joiError))
        return
    }
    try{
        const res = await resetPassword({token, password, confirmPassword}).unwrap()
        alert(res.message)
    }catch(err:any){
        alert(err.data.message)
    }
  }
  return (
     <div className='flex flex-col items-center justify-center h-screen w-full'>
       <div className='w-full max-w-md p-8 border rounded-lg shadow-sm'>
         <h1 className='text-4xl font-bold mb-6 text-center'>Reset Password</h1>
         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <input
                type='password'
                name='password'
                placeholder='New Password'
                className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}
            </div>
            <div>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              {validationErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>}
            </div>
           <button
             type='submit'
             className='bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2 rounded font-semibold'
           >
             Reset Password
           </button>
         </form>
       </div>
     </div>
  )
}