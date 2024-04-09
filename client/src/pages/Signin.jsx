import React from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function Signin() {
  const google = () => {
    window.open('http://localhost:5000/api/auth/google/callback', '_self');
  };
  return (
    <div className="flex flex-col shadow-xl rounded-xl w-2/4 mx-auto min-h-[300px] my-8">
      <h1 className="text-center text-2xl font-semibold text-gray-400 py-2">
        Login with google
      </h1>
      <div className="text-center text-2xl font-semibold text-gray-400 py-2">
        other methods arrive later
      </div>

      <div className="flex justify-around md:flex-row my-auto flex-col gap-2">
        <div className="flex flex-1 flex-col gap-4">
          <div
            onClick={google}
            className="flex w-2/4 mx-auto items-center bg-red-600 text-white py-2 pl-2 gap-2 font-serif rounded-md shadow-md"
          >
            <FaGoogle className="" />
            <span className="">Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}
