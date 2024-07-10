import React from 'react';

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 bg-richblack-800 h-[100vh]">
      <div className="w-14 h-14 border-4 border-richblack-25 border-double rounded-full animate-spin"></div>
      <p className="text-richblack-50 text-xl font-semibold">Loading....</p>
    </div>
  );
}

export default Spinner;
