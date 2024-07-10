import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ userEmail, onLogout ,user}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // console.log(user.emailVerified);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className='bg-gray-800 flex items-center justify-between text-richblack-25 text-xl font-mono border-b-[1px] border-b-richblack-600 p-5'>
                <div className='text-white'>Authentication App</div>
                <div className='md:hidden' onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <div className='hidden md:flex items-center'>
                    <div className='my-5 flex px-3'>
                        <div className='mx-4 hover:text-yellow-200'>
                            <NavLink to="/home">Home</NavLink>
                        </div>
                        <div className='mx-4 hover:text-yellow-200'>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </div>
                        {userEmail && user.emailVerified ? (
                            <div className='mx-4 hover:text-yellow-200'>
                                <button onClick={onLogout}>Logout</button>
                            </div>
                        ) : (
                            <>
                                <div className='mx-4 hover:text-yellow-200'>
                                    <NavLink to="/signup">Signup</NavLink>
                                </div>
                                <div className='mx-4 hover:text-yellow-200'>
                                    <NavLink to="/login">Login</NavLink>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div className='bg-richblack-5 flex flex-col items-center text-richblack-800 text-xl  font-mono border-t-[1px] border-t-richblack-600 p-5  md:hidden'>
                    <div className='my-5 flex flex-col px-3'>
                        <div className='my-2 hover:text-yellow-200'>
                            <NavLink to="/home" onClick={toggleMenu}>Home</NavLink>
                        </div>
                        <div className='my-2 hover:text-yellow-200'>
                            <NavLink to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink>
                        </div>
                        {userEmail ? (
                            <div className='my-2 hover:text-yellow-200'>
                                <button onClick={() => { onLogout(); toggleMenu(); }}>Logout</button>
                            </div>
                        ) : (
                            <>
                                <div className='my-2 hover:text-yellow-200'>
                                    <NavLink to="/signup" onClick={toggleMenu}>Signup</NavLink>
                                </div>
                                <div className='my-2 hover:text-yellow-200'>
                                    <NavLink to="/login" onClick={toggleMenu}>Login</NavLink>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='my-2 text-richblack-800' onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
