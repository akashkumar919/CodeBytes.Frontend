import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from '../authSlice';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import {Mail,Lock,Eye,EyeOff} from 'lucide-react'
import ContinueWithGoogle from './ContinueWithGoogle';



const loginSchema = z.object({
    email:z.string().email("Invalid Email"),
    password:z.string().min(8,"minimum 8 characters required!").max(80,"maximum 80 characters allowed!"),
})

export default function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticate,loading,user,error} = useSelector((state)=>state.auth);
  
     const {register,handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(loginSchema)});
    
    const [showPassword, setShowPassword] = useState(false);



const submittedData = async (data) => {
    try {
     dispatch(loginUser(data));
      
    } catch (error) {
      toast.error(error || 'Something went wrong!');
    }
  };




useEffect(()=>{
  if(isAuthenticate){
    toast.success("Login successfully!");
    setTimeout(() => {
      if (user?.role === "admin") navigate("/admin");
      else navigate("/");
    }, 1000);
  }
},[isAuthenticate, user, navigate])


//  🔔 ERROR notification
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);


  

return(


   <div className='h-full w-full flex justify-center mt-21'>
  <form
    onSubmit={handleSubmit(submittedData)}
    className='min-h-[420px] w-xs px-5 py-8 flex flex-col justify-center rounded-lg bg-[#353535]/60 
               backdrop-blur-3xl shadow-[5_5_10px_rgba(0,0,0,0.3)] my-5 mx-auto font-serif'
  >
    {/* LOGO */}
    <div className='w-full flex justify-center'>
      <img src="https://res.cloudinary.com/djsxyiw6n/image/upload/v1764071145/logo_kzmmci.png" alt="" className='w-40 mb-4' />
    </div>

    {/* -------- EMAIL FIELD -------- */}
    <label htmlFor="email" className='text-sm text-white mb-1'>Email</label>

    <div className="flex items-center bg-[#1a1a1a] border border-gray-600 rounded-lg px-3 py-2 
                    focus-within:border-[#ff6200] transition mb-2">
      <Mail size={20} className="text-gray-400" />
      <input
        type="email"
        id="email"
        {...register("email")}
        placeholder="example@gmail.com"
        className="bg-transparent text-white w-full outline-none ml-2"
      />
    </div>

    {errors.email && (
      <span className="text-red-500 text-xs">{errors.email.message}</span>
    )}

    {/* -------- PASSWORD FIELD -------- */}
    <label htmlFor="password" className='text-sm text-white mt-3 mb-1'>Password</label>

    <div className="flex items-center bg-[#1a1a1a] border border-gray-600 rounded-lg px-3 py-2
                    focus-within:border-[#ff6200] transition mb-1">
      <Lock size={20} className="text-gray-400" />

      <input
        id="password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        placeholder="Enter password"
        className="bg-transparent text-white w-full outline-none ml-2"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-gray-300 hover:text-white ml-2"
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>

    {errors.password && (
      <span className="text-red-500 text-xs">{errors.password.message}</span>
    )}

    {/* Forgot Password */}
    <div className='flex justify-end text-xs text-gray-300 hover:text-[#ff6200] cursor-pointer mt-1'>
      <button onClick={() => navigate('/forgotPassword')}>
        Forgot password?
      </button>
    </div>

    {/* LOGIN BUTTON */}
    <button
      type='submit'
      className="btn bg-[#ff6200] w-full rounded-lg my-4 shadow-none text-white font-semibold py-2"
    >
      Login
    </button>

    {/* Divider */}
    <div className="flex items-center text-gray-400 my-2">
      <hr className="flex-grow border-gray-400" />
      <span className="mx-2 text-white">OR</span>
      <hr className="flex-grow border-gray-400" />
    </div>

    {/* Google Button */}
    <ContinueWithGoogle/>

    {/* Signup */}
    <p className='text-xs flex justify-center mt-4 text-gray-200'>
      Don't have account?&nbsp;
      <Link to="/Signup">
        <span className='hover:underline cursor-pointer text-[#ff6200]'>Create</span>
      </Link>
    </p>

  </form>
</div>

    )
}




