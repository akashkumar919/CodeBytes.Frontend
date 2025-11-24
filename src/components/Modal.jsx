// import { X } from "lucide-react";

// export default function Modal({ title, children, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//       {/* Modal Box */}
//       <div className="relative bg-[#1f1f1f] rounded-2xl w-full max-w-3xl text-white shadow-xl border border-gray-800 flex flex-col max-h-[90vh] overflow-hidden">
        
//         {/* Header */}
//         <div className="flex justify-between items-center sticky top-0 bg-[#1f1f1f] px-6 py-4 border-b border-gray-800 z-10">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-red-400 hover:text-red-500 transition-colors"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* Body Content */}
//         <div className="px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }



import { X } from "lucide-react";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      {/* Modal Box */}
      <div className="relative bg-[#1f1f1f] rounded-2xl w-full max-w-3xl text-white shadow-xl border border-gray-800 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-[#1f1f1f] px-6 py-4 border-b border-gray-800 z-10">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-500 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body Content */}
        <div className="px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {children}
        </div>
      </div>
    </div>
  );
}

