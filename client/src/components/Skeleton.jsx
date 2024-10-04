import React from 'react';

export default function Skeleton() {
  return (
    <div
      className="xsm:p-5 mb-5  xsm:w-[95%]  mx-auto 
  flex justify-center flex-col gap-x-6 gap-y-5 md:flex-row"
    >
      <div
        className="outline outline-gray-50 flex flex-col justify-around shadow-lg
   rounded-lg md:h-[650px] h-[560px] md:w-[58%]  p-4"
      >
        <div className="flex gap-2">
          <span className="p-4 rounded-xl animate-pulse bg-gray-200 flex-1 "></span>
          <span className="p-4 rounded-xl animate-pulse bg-gray-200 w-1/4"></span>
        </div>
        <div className="h-[350px] bg-gray-200 animate-pulse"></div>
        <div className="flex gap-2 justify-between">
          <span className="p-4 rounded-xl animate-pulse bg-gray-200 w-2/4 "></span>
          <span className="p-4 rounded-xl animate-pulse bg-gray-200 w-1/4"></span>
        </div>
      </div>
      <div className="md:flex-1 flex md:flex-col outline-gray-50 justify-between xsm:gap-4 gap-2">
        <div className="flex flex-col justify-around outline outline-gray-50 shadow-lg overflow-hidden rounded-lg md:h-2/4 h-[255px] md:w-full w-2/4 p-4">
          <div className=" h-44 bg-gray-200 animate-pulse"></div>
          <div className="flex gap-2 justify-between">
            <span className="p-4 rounded-xl animate-pulse bg-gray-200 w-2/4 "></span>
            <span className="p-4 rounded-xl animate-pulse bg-gray-200 w-1/4"></span>
          </div>
        </div>
        <div className="flex flex-col justify-around outline outline-gray-50 shadow-lg overflow-hidden rounded-lg md:h-2/4 h-[255px] md:w-full w-2/4 p-4">
          <div className=" h-44 bg-gray-200 animate-pulse"></div>
          <div className="flex gap-2 justify-between">
            <span className="p-4 rounded-xl animate-pulse bg-gray-200 w-2/4 "></span>
            <span className="p-4 rounded-xl animate-pulse bg-gray-200 w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
