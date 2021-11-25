import React from 'react'

export default function Button() {
    return (
      <div>
        <a href="/dashboard"className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bottom-1 justify-start">
        Dashboard
       </a>
       <a href="/goals" className="content-end bg-gray-600 blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -bottom-1 justify-end">
        Goals
       </a>
       </div>
    )
}