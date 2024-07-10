import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import app from '../firebase/firebaseConfig';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const auth = getAuth(app);

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      console.log('Registered user:', user);
      toast.success(`Verification email sent to: ${user.email}`);
    } catch (error) {
      toast.error(`Error registering user : ${error.message}`);
      console.error('Error registering user:', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className='flex items-center justify-center mt-[8rem] flex-col px-4'>
      <div className='my-5 text-richblack-5 text-3xl'>Sign Up</div>
      <div className=' rounded-3xl px-6 py-8 shadow-xl shadow-yellow-200 sm:px-16'>
        <form onSubmit={handleRegistration} className='space-y-6'>
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
            <button type="submit" className='cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 sm:w-auto mb-4 sm:mb-0'>Sign Up</button>
            <p className='p-2 text-center text-sm sm:text-left'>
              Already a user?&nbsp;&nbsp;
              <NavLink to="/login" className='text-richblack-5 underline text-base'>Log In</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
