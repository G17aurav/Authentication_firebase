import React from 'react';

const Dashboard = ({ userEmail }) => {
  return (
    <div className='flex items-center justify-center w-full animate__animated animate__fadeInLeft duration-500'>
      <div className='mt-[10rem] md:mt-[15rem] text-2xl md:text-4xl text-richblack-5 px-4 md:px-0'>
        <div className='text-center'>Welcome to Dashboard</div>
        {userEmail && (
          <div className='text-center'>Welcome, {userEmail}</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
