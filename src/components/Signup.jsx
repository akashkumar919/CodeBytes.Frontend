
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router"; // ✅ Correct import
import { registerUser } from "../authSlice";
import { toast } from "react-toastify";
import ContinueWithGoogle from "./ContinueWithGoogle";

const signupSchema = z.object({
  firstName: z
    .string()
    .min(3, "Minimum 3 characters required!")
    .max(50, "Maximum 50 characters allowed!"),
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(8, "Minimum 8 characters required!")
    .max(80, "Maximum 80 characters allowed!"),
});

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticate, loading, user, error } = useSelector(
    (state) => state.auth
  );

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticate) {
      toast.success("Registered successfully!");
      setTimeout(() => {
        if (user?.role === "admin") navigate("/admin");
        else navigate("/");
      }, 1000);
    }
  }, [isAuthenticate, user, navigate]);

     const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
     const strongEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const submittedData = (data) => {
    try{
      if(!strongEmail.test(data.email)){
        return toast.error('Enter valid Email!')
      }
      if (!strongPassword.test(data.password)) {
        return toast.error("Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character!")
      }
      dispatch(registerUser(data)).unwrap();
      navigate('/')
    }
    catch(err){
      toast.error(err || "Something went wrong!");
    }
      
    
     
  };

  // 🔔 ERROR notification
  // useEffect(() => {
  //   if (error) toast.error(error);
  // }, [error]);

  

  return (
    <div className="h-full w-full flex justify-center mt-21">
      <form
        onSubmit={handleSubmit(submittedData)}
        className="min-h-[420px] w-xs px-5 py-8 flex flex-col justify-center rounded-lg bg-[#353535]/60 backdrop-blur-3xl shadow-[5_5_10px_rgba(0,0,0,0.3)] my-5 mx-auto font-serif"
      >
        {/* Logo */}
        <div className="w-full flex justify-center">
          <img src="https://res.cloudinary.com/djsxyiw6n/image/upload/v1764071145/logo_kzmmci.png" alt="Logo" className="w-40 mb-2" />
        </div>

        {/* Name */}
        <div className="w-full">
          <label htmlFor="firstName" className="text-sm text-gray-200">
            Name
          </label>
          <div className="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 
              2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 
              1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              placeholder="John"
              className="p-2 pl-10 w-full rounded-lg bg-[#1a1a1a] outline-none text-white placeholder-gray-400 border border-gray-600 focus:ring-1 focus:ring-[#ff6200] transition"
            />
          </div>
          {errors.firstName && (
            <span className="text-red-500 text-xs">
              {errors.firstName.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="mt-3">
          <label htmlFor="email" className="text-sm text-gray-200">
            Email
          </label>
          <div className="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 13.5L2 6.75V18h20V6.75L12 13.5zM12 11l10-6H2l10 6z" />
            </svg>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="example@gmail.com"
              className="pl-10 p-2 w-full rounded-lg bg-[#1a1a1a] outline-none text-white 
              focus:ring-1 focus:ring-[#ff6200] transition border border-gray-600"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mt-3">
          <label htmlFor="password" className="text-sm text-gray-200">
            Password
          </label>
          <div className="flex items-center rounded-lg bg-[#1a1a1a] border border-gray-600 focus-within:border-[#ff6200]">
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1a5 5 0 00-5 5v4H6c-1.1 0-2 .9-2 
                2v10c0 1.1.9 2 2 2h12c1.1 0 
                2-.9 2-2V12c0-1.1-.9-2-2-2h-1V6a5 
                5 0 00-5-5zm-3 9V6a3 3 0 
                016 0v4H9z" />
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter password"
                className="w-full p-2 pl-10 bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="w-12 text-sm px-3 py-1 text-gray-300 hover:text-white"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18M10.58 10.58a3 3 0 0 0 4.24 4.24M9.88 4.14A10.94 10.94 0 0 1 12 4c4.477 0 8.268 2.943 9.542 7a10.97 10.97 0 0 1-3.043 4.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.223 6.223A10.97 10.97 0 0 0 2.458 12c1.274 4.057 5.065 7 9.542 7 1.28 0 2.507-.232 3.627-.657"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>

          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn bg-[#ff6200] w-full rounded-lg my-4 text-white ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#e55b00]"
          }`}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="flex items-center text-gray-400">
          <hr className="flex-grow border border-gray-400" />
          <span className="mx-2 text-white">or</span>
          <hr className="flex-grow border border-gray-400" />
        </div>

        {/* Google Signup */}
       
        <ContinueWithGoogle/>

        {/* Already have account */}
        <p className="text-xs flex justify-center mt-4 text-gray-200">
          Already have an account?&nbsp;
          <Link to="/login">
            <span className="hover:underline text-[#ff6200]">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
