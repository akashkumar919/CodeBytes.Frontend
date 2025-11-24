

// import { Construction } from "lucide-react";

// export default function Courses() {
//   return (
//     <div className="min-h-[100vh] flex flex-col items-center justify-center text-center p-6">
      
//       {/* Icon */}
//       <Construction size={80} className="text-yellow-500 mb-6" />

//       {/* Heading */}
//       <h1 className="text-4xl font-bold mb-4">
//         Courses Feature Coming Soon
//       </h1>

//       {/* Sub-Text */}
//       <p className="text-lg text-gray-400 max-w-xl">
//         We are currently working on an advanced courses module that will include 
//         structured learning paths, detailed lessons, real-world projects, and 
//         an interactive coding environment.  
//         <br /><br />
//         Stay tuned — this feature will be available shortly!
//       </p>

//     </div>
//   );
// }














// import { Construction } from "lucide-react";

// export default function Courses() {
//   return (
//     <div className="min-h-[100vh] mt-15 flex items-center justify-center p-6 relative overflow-hidden">

//       {/* Soft Gradient BG Lights */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-60 h-60 rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
//         <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>
//       </div>

//       {/* Glassmorphism Card */}
//       <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-2xl text-center">

//         {/* Icon */}
//         <Construction size={90} className="text-yellow-400 mx-auto mb-6 drop-shadow-lg" />

//         {/* Gradient Heading */}
//         <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
//           Courses Feature Coming Soon
//         </h1>

//         {/* Sub Text */}
//         <p className="text-gray-300 text-lg leading-relaxed mb-8">
//           We’re building a next-generation learning experience with structured modules, real-world projects,
//           skill assessments, interactive coding panels, and AI-based progress tracking.  
//           <br /><br />
//           Our team is working actively — stay tuned for the launch!
//         </p>

//         {/* Animated Loader */}
//         <div className="flex justify-center mt-6">
//           <div className="w-10 h-10 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
//         </div>

//       </div>
//     </div>
//   );
// }













import { Bell, Construction } from "lucide-react";

export default function Courses() {
  return (
    <div className="min-h-[100vh] mt-15 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Animated Floating Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 opacity-20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 opacity-20 blur-[120px] animate-ping"></div>
      </div>

      {/* Glow Ring */}
      <div className="absolute w-96 h-96 rounded-full border border-purple-400 opacity-20 animate-spin-slow"></div>

      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-12 rounded-3xl shadow-2xl w-full max-w-2xl 
      text-center animate-fadeInUp">

        {/* Icon */}
        <Construction
          size={95}
          className="text-yellow-400 mx-auto mb-6 drop-shadow-2xl animate-bounce"
        />

        {/* Gradient Heading */}
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
          Courses Feature Coming Soon
        </h1>

        {/* Sub Text */}
        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          Our engineering team is currently building a high-performance learning platform 
          featuring structured modules, hands-on projects, AI-powered progress tracking, 
          interactive coding panels, and real-time mentorship support.  
          <br /><br />
          This feature will be launched very soon — stay tuned!
        </p>

        {/* Notify Me Button */}
        <button className="
          px-6 py-3 rounded-2xl cursor-pointer 
          flex items-center gap-3 mx-auto 
          bg-gradient-to-r from-purple-500 to-blue-500 
          text-white font-semibold text-lg 
          hover:scale-105 transition-all 
          shadow-xl shadow-purple-900/30
        ">
          <Bell size={22} />
          Notify Me When Available
        </button>

        {/* Tiny Footer */}
        <p className="text-gray-500 text-sm mt-6">
          We’re improving your experience — one feature at a time.
        </p>
      </div>

      {/* Custom Tailwind Animations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease-out forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
