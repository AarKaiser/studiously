import React from 'react'

export default function ReviewButtons() {
    return (
      <div>
        <a href="/dashboard"className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bottom-1 justify-start">
        View Goal Data
       </a>
       <a href="/saved" className="content-end bg-gray-600 blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -bottom-1 justify-end">
        Add More Goals
       </a>
       </div>
    )
}