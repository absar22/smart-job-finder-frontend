"use client"
import { useParams } from 'next/navigation'
import { useResetPasswordMutation } from '@/redux/api/authApi'

export default function ResetPasswordPage(){
   const params = useParams()
  const token = params.token
  const [resetPassword] = useResetPasswordMutation()
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const password = e.currentTarget.password.value
    const confirmPassword = e.currentTarget.confirmPassword.value
    if(password !== confirmPassword){
        alert("Passwords do not match")
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
           <input
             type='password'
             name='password'
             placeholder='New Password'
             className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
           />
           <input
             type='password'
             name='confirmPassword'
             placeholder='Confirm Password'
             className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
           />
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