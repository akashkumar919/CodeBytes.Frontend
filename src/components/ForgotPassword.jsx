


import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axiosClient from "../utils/axiosClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  // Timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = async () => {
    if (!email.trim()) return toast.error("Please enter email");

    try {
      await axiosClient.post("/user/forgot-password-otp", { email:email });

      toast.success("OTP sent to your email!");
      setTimer(300);

      setTimeout(() => {
        navigate("/resetPassword", { state: { email } });
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#353535]/60 w-full max-w-md rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-semibold text-gray-300 mb-5 text-center">
          Forgot Password
        </h2>

        <label className="text-gray-300 font-medium">Email</label>
        <div className="flex items-center border border-gray-600 bg-[#1a1a1a] rounded-lg mt-1 px-3 py-2">
          <Mail className="text-gray-400 mr-2" size={20} />
          <input
            className="w-full bg-transparent outline-none text-gray-200"
            placeholder="example@gmail.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-6 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          disabled={timer > 0}
          onClick={handleSendOTP}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
        </button>

        <p className="text-center text-gray-400 mt-6">
          Remember password?{" "}
          <button
            className="text-orange-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
