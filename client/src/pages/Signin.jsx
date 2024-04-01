import React from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

export default function Signin() {
  const google = () => {
    window.open('http://localhost:5000/api/auth/google/callback', '_self');
  };
  return (
    <div className="flex flex-col shadow-xl rounded-xl w-2/4 mx-auto min-h-[300px] my-8">
      <h1 className="text-center text-2xl font-semibold text-gray-400 py-2">
        Choose a Login Method
      </h1>
      <div className="flex justify-around md:flex-row my-auto flex-col gap-2">
        <div className="flex flex-1 flex-col gap-4">
          <div
            onClick={google}
            className="flex w-2/4 mx-auto items-center bg-red-600 text-white py-2 pl-2 gap-2 font-serif rounded-md shadow-md"
          >
            <FaGoogle className="" />
            <span className="">Google</span>
          </div>
          <div className="flex w-2/4 mx-auto items-center bg-blue-600 text-white py-2 pl-2 pr-5 gap-2 font-serif rounded-md shadow-md">
            <FaFacebook />
            <span className="">Facebook</span>
          </div>
          <div className="flex w-2/4 mx-auto items-center bg-black text-white py-2 pl-2 pr-5 gap-2 font-serif rounded-md shadow-md">
            <FaGithub />
            <span className="">Github</span>
          </div>
        </div>

        <div className="min-h-full flex items-center justify-center">
          <div className="border-2 h-[170px] absolute" />
          <div className="border-2 rounded-full bg-white p-2 z-10">OR</div>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <input
            type="text"
            className="py-1 px-2 rounded w-3/4 mx-auto"
            placeholder="Username"
          />
          <input
            type="text"
            placeholder="Password"
            className="py-1 px-2 rounded w-3/4 mx-auto"
          />
          <button className="text-white bg-green-500 w-2/4 mx-auto p-1 rounded-lg">
            Signin
          </button>
        </div>
      </div>
    </div>
  );
}
