
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import app from './firebase/firebaseConfig'
import { getAuth } from 'firebase/auth';

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setUserEmail(user.email);
      } else {
        setUser(null);
        setUserEmail(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserEmail(null);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='bg-richblack-800 w-full h-[100vh]'>
      <Navbar userEmail={userEmail} onLogout={handleLogout} user={user}/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            user && user.emailVerified ? (
              <Dashboard userEmail={userEmail} />
            ) : (
              <Navigate to="/login"/>
            )
          }
        />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

export default App;
