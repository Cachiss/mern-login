import { useRef, useState } from 'react';
import { Divider } from '../components/divider'
import { Link } from 'react-router-dom';
import GoogleIcon from '../assets/google.png';
import FacebookIcon from '../assets/facebook.png';

//services
import { loginUser } from '../api/user.js';
import  Cookies  from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

const LoginPage = () => {
    const [error, setError] = useState(null)
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            let response = await loginUser({email, password});
            
            if(response.status != 200) return setError("Invalid email or password")

            response = await response.json();
            console.log(response.token);
            cookies.set('_iduser', response.token, { path: '/' });
        } catch (error) {
            setError("Invalid email or password")
        }

    }
  return (
    <div className='w-96'>
        <h1 className='text-3xl font-bold text-left text-slate-600'>SIGN IN</h1>
        <form className='mt-5' onSubmit={handleSubmit}>
            <div className='flex flex-col items-start'>
                <label htmlFor='email' className='font-semibold'>Email address</label>
                <input type="text" name="email" className='w-full border-2 border-pink-600 rounded-md h-10 mt-1 p-2' ref={emailRef}/>
            </div>
            <div className='flex flex-col items-start mt-3'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input type="password" name="password" className='w-full border-2 border-pink-600 rounded-md h-10 mt-1 p-2'ref={passwordRef} />
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
        <a href={'/register'} className='text-pink-600 cursor-pointer'>Don't have an user account?</a>
    </div>
  )
}

export default LoginPage