import React from 'react'

export default function HomeButtons() {
    return (
      <div>
        <a href="/saved"className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bottom-1 justify-start">
        Create Goals
       </a>
       <a href="/schedule" className="content-end bg-gray-600 blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -bottom-1 justify-end">
        Your Schedule
       </a>
       </div>
    )
}