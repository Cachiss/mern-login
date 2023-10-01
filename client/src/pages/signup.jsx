import { useRef, useState } from 'react';
import { Divider } from '../components/divider'
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../assets/google.png';
import FacebookIcon from '../assets/facebook.png';

//services
import { createUser } from '../api/user.js';

export const SignupPage = () => {
    const [error, setError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    const togglePassword = () => {
        if(passwordRef.current.type === 'password'){
            passwordRef.current.type = 'text'
        }else{
            passwordRef.current.type = 'password'
        }
    }
    
    const togglePasswordConfirm = () => {
        if(confirmPasswordRef.current.type === 'password'){
            confirmPasswordRef.current.type = 'text'
        }else{
            confirmPasswordRef.current.type = 'password'
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const name = nameRef.current.value;
            const confirmPassword = confirmPasswordRef.current.value;

            if(password !== confirmPassword) return setPasswordError("Password does not match")

            let response = await createUser({name, email, password})
            if(response.status != 201) return setError("Invalid email or password")

            response = await response.json()
            setError(null)  
            navigate('/login')
        } catch (error) {
            setError("Invalid email or password")
        }

    }
  return (
    <div className='w-96'>
        <h1 className='text-3xl font-bold text-left text-slate-600'>SIGN IN</h1>
        <form className='mt-5' onSubmit={handleSubmit}>
            <div className='flex flex-col items-start'>
                <label htmlFor='name' className='font-semibold'>Name</label>
                <input type="text" name="name" className='w-full border-2 border-pink-600 rounded-md h-14 mt-1 p-2' ref={nameRef} required/>
            </div>
            <div className='flex flex-col items-start'>
                <label htmlFor='email' className='font-semibold'>Email address</label>
                <input type="text" name="email" className='w-full border-2 border-pink-600 rounded-md h-14 mt-1 p-2' ref={emailRef} required/>
            </div>
            <div className='flex flex-col items-start mt-3'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input type="password" name="password" className='w-full border-2 border-pink-600 rounded-md h-14 mt-1 p-2'ref={passwordRef}required />
            </div>
            {passwordError && <p className='text-red-600 text-sm mt-3 text-left'>{passwordError}</p>}
            <div className='flex items-center mt-3'>
                <input type="checkbox" name="showPassword" id="showPassword" onClick={togglePassword} className='w-4 h-4'/>
                <label htmlFor="showPassword" className='ml-2'>Show password</label>
            </div>
            <div className='flex flex-col items-start mt-3'>
                <label htmlFor="password" className='font-semibold'>Confirm Password</label>
                <input type="password" name="password" className='w-full border-2 border-pink-600 rounded-md h-14 mt-1 p-2'ref={confirmPasswordRef}required />
            </div>
            {passwordError && <p className='text-red-600 text-sm mt-3 text-left'>{passwordError}</p>}
            {/* Show password */}
            <div className='flex items-center mt-3'>
                <input type="checkbox" name="showPassword" id="showPasswordConfirm" onClick={togglePasswordConfirm} className='w-4 h-4'/>
                <label htmlFor="showPasswordConfirm" className='ml-2'>Show password</label>
            </div>
            {error && <p className='text-red-600 text-sm mt-3 text-left'>{error}</p>}
            <button type="submit" className='rounded-md bg-pink-600 mt-5 text-white text-xl w-full'>Sign In</button>
        </form>
        <div className='mb-5'>
            <Divider>
                OR
            </Divider>
            <div className='flex justify-center gap-7'>
                <img src={GoogleIcon} alt="Google Icon" className='w-10 h-10 mt-5 cursor-pointer'/>
                <img src={FacebookIcon} alt="Facebook Icon" className='w-10 h-10 mt-5 cursor-pointer'/>
            </div>
        </div>
        <a href={'/login'} className='text-pink-600 cursor-pointer'>Already have an user account?</a>
    </div>
  )
}

