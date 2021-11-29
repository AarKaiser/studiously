import React from "react";
import { Link } from "react-router-dom";

export default function ReviewButtons() {
  return (
    <div className="flex justify-center space-x-10 ">
      <Link
        to="/dashboard"
        className="bg-green-500 hover:bg-green-700 hover:no-underline text-white font-bold py-2 px-4 rounded bottom-1 justify-start"
      >
        View Goal Data
      </Link>
      <Link
        to="/goals"
        className="content-end bg-green-500 blue-500 hover:bg-green-700 hover:no-underline text-white font-bold py-2 px-4 rounded -bottom-1 justify-end"
      >
        Add More Goals
      </Link>
    </div>
  );
}
