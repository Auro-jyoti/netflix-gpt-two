import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="pt-[10%] px-12 absolute text-white bg-gradient-to-r  from-black w-screen aspect-video overflow-x-hidden">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>

      <div className="">
        <button className="bg-white text-black p-3 px-12 text-lg rounded-md mr-2 hover:opacity-80">
          Play
        </button>
        <button className="bg-gray-500 text-white p-3 px-12 text-lg bg-opacity-50 rounded-md hover:opacity-85">
          More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;