import React from "react";

const ErrorMessage = ({ message = "Something went wrong while loading data.", onRetry }) => {
  return (
    <div className=" mt-30">
    <div className="flex flex-col items-center justify-center bg-red-500/10 border border-red-500 text-red-400 rounded-xl p-6 max-w-md mx-auto mt-10 shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-3 text-red-500 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856A2 2 0 0020 17.065L12.93 4.536a2 2 0 00-3.86 0L4 17.065A2 2 0 005.062 19z" />
      </svg>
      <p className="text-lg font-semibold text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Retry
        </button>
      )}
    </div>
    </div>
  );
};

export default ErrorMessage;
