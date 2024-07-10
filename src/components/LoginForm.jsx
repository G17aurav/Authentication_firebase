import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const auth = getAuth(app);

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user.emailVerified) {
        // After verification store the token in local storage for further use
        const token = await user.getIdToken();
        localStorage.setItem('authToken', token);
        console.log('Logged in user:', user);
        
        // Simulate sending the token to a backend endpoint
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ token })
        });

        if (!response.ok) {
          throw new Error('Failed to send token to backend');
        }
        // After successful login, navigate to the dashboard
        navigate("/dashboard");
        toast.success("Logged In successfully");
      } else {
        // Ask user to verify email if not verified
        toast('Please verify your email to log in.');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      toast.error(`Error signing in : ${error.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className='flex items-center justify-center mt-[8rem] flex-col px-4'>
      <div className='my-5 mb-8 text-richblack-5 text-3xl'>Log In</div>
      <div className=' rounded-3xl px-6 py-8 sm:px-16 shadow-xl shadow-yellow-200'>
        <form onSubmit={handleLogin} className='space-y-6'>
          <div className='text-richblack-5 text-lg'>
            <input
              className='px-4 py-2 bg-richblack-600 rounded-lg w-full'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='relative text-richblack-5 text-lg'>
            <input
              className='px-4 py-2 bg-richblack-600 rounded-lg w-full pr-10'
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className='text-richblue-50 flex flex-col sm:flex-row justify-between items-center'>
            <button type="submit" className='cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 sm:w-auto mb-4 sm:mb-0'>Log In</button>
            <p className='p-2 text-center text-sm sm:text-left'>
              Not registered yet?&nbsp;&nbsp;
              <NavLink to="/signup" className='text-richblack-5 underline text-base'>Sign Up</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
