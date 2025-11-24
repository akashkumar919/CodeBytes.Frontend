


// import { Mail, ShieldCheck,Eye,EyeOff } from "lucide-react";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import axiosClient from "../utils/axiosClient";

// export default function ResetPassword() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const email = location.state?.email;
//   const devOtp = location.state?.otp;

//   const [otp, setOtp] = useState(devOtp || "");
//   const [newPass, setNewPass] = useState("");
//   const [openEye,setOpenEye] = useState('false');


//   // 🔥 Password Validation Function  
//   const validatePassword = (password) => {
//     const regex =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     return regex.test(password);
//   };

//   const handleReset = async () => {
//     // ✔ empty password check
//     if (!newPass.trim()) {
//       toast.error("Password cannot be empty!");
//       return;
//     }

//     // ✔ regex validation
//     if (!validatePassword(newPass)) {
//       toast.error(
//         "Password must be 8+ chars, 1 uppercase, 1 number & 1 special character"
//       );
//       return;
//     }

//     try {
//       await axiosClient.post("/user/reset-password-otp", {
//         email,
//         otp,
//         newPassword: newPass,
//       });

//       toast.success("Password changed successfully!");
//       navigate("/");

//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   return (
//      <div className="min-h-screen flex m-20 justify-center bg-[#1a1a1a] px-4 ">
//       <div className="bg-[#353535]/60 w-full max-w-md rounded-xl p-8 shadow-lg  ">

//         {/* Logo */}
//         <div className="flex items-center justify-center gap-2 mb-6">
//           <img src="/src/assets/logo.png" alt="logo" className="w-40" />
          
//         </div>

//         <h2 className="text-xl font-semibold text-white mb-4 text-center">
//           Reset Password
//         </h2>

//         {/* Email (Disabled) */}
//         <label className="text-gray-300 text-sm">Email</label>
//         <div className="flex items-center bg-[#1a1a1a] mt-1 px-3 py-2 rounded-lg border border-gray-700 mb-4">
//           <Mail size={18} className="text-gray-400" />
//           <input
//             value={email}
//             disabled
//             className="bg-transparent text-gray-500 ml-2 outline-none w-full"
//           />
//         </div>

//         {/* OTP */}
//         <label className="text-gray-300 text-sm">OTP</label>
//         <div className="flex items-center bg-[#1a1a1a] mt-1 px-3 py-2 rounded-lg border border-gray-700 mb-4">
//           <ShieldCheck size={18} className="text-gray-400" />
//           <input
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="bg-transparent text-white ml-2 outline-none w-full"
//           />
//         </div>

//         {/* New Password */}
//      <label className="text-gray-300 text-sm">New Password</label>

// <div className="flex items-center bg-[#1a1a1a] mt-1 px-3 py-2 rounded-lg border border-gray-700 mb-4">
  
//   <input
//     type={openEye ?"text" : "password" }
//     placeholder="Enter new password"
//     value={newPass}
//     onChange={(e) => setNewPass(e.target.value)}
//     className="bg-transparent text-white ml-2 outline-none w-full"
//   />

//   <button
//     type="button"
//     onClick={() => setOpenEye(!openEye)}
//     className="text-gray-400 hover:text-gray-200"
//   >
//     {openEye ? <Eye size={18} className="text-gray-400 hover:cursor-pointer"  /> : <EyeOff size={18} className="text-gray-400 hover:cursor-pointer"  />}
//   </button>
// </div>

//         {/* Reset Button */}
//         <button
//           onClick={handleReset}
//           className="bg-orange-500 hover:bg-orange-600 text-white w-full px-3 py-2 rounded-lg mt-2 text-lg font-semibold transition"
//         >
//           Reset Password
//         </button>
//       </div>
//     </div>
//   );
// }


import { Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axiosClient from "../utils/axiosClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [openEye, setOpenEye] = useState(false);

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
  };

  const handleReset = async () => {
    if (!validatePassword(newPass)) {
      toast.error("Weak password!");
      return;
    }

    try {
      await axiosClient.post("/user/reset-password-otp", {
        email,
        otp,
        newPassword: newPass,
      });

      toast.success("Password changed successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="bg-[#353535]/60 w-full max-w-md rounded-xl p-8">

        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Reset Password
        </h2>

        {/* Email */}
        <label className="text-gray-300 text-sm">Email</label>
        <div className="flex items-center bg-[#1a1a1a] px-3 py-2 rounded-lg border border-gray-700 mb-4">
          <Mail size={18} className="text-gray-400" />
          <input
            value={email}
            disabled
            className="bg-transparent text-gray-500 ml-2 outline-none w-full"
          />
        </div>

        {/* OTP */}
        <label className="text-gray-300 text-sm">OTP</label>
        <div className="flex items-center bg-[#1a1a1a] px-3 py-2 rounded-lg border border-gray-700 mb-4">
          <ShieldCheck size={18} className="text-gray-400" />
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-transparent text-white ml-2 outline-none w-full"
          />
        </div>

        {/* New Password */}
        <label className="text-gray-300 text-sm">New Password</label>
        <div className="flex items-center bg-[#1a1a1a] px-3 py-2 rounded-lg border border-gray-700 mb-6">
          <input
            type={openEye ? "text" : "password"}
            placeholder="Enter new password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="bg-transparent text-white outline-none w-full"
          />
          <button
            onClick={() => setOpenEye(!openEye)}
            className="text-gray-400 ml-2"
          >
            {openEye ? <Eye /> : <EyeOff />}
          </button>
        </div>

        <button
          onClick={handleReset}
          className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg font-semibold"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

