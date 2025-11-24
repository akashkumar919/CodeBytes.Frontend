// import { useSelector,useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router';
// import { logoutUser } from '../authSlice';
// import { useEffect } from 'react';
// import { toast } from "react-toastify";


// export default function Logout(){

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const {isAuthenticate,loading,user,error} = useSelector((state)=>state.auth);

//     useEffect(()=>{
//             if(!isAuthenticate){
//                 toast.success("Logout successfully!");
//                 navigate('/Signup');
//             }
//         },[isAuthenticate,navigate])

//     const handleSubmit = ()=>{   
//         dispatch(logoutUser())
//             .catch((err) => {
//                 toast.error(err || "Something went wrong!");
//             });
//     }


//      // 🔔 ERROR notification
//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);


//     return(
//         <>

//         {/* <button onClick={handleSubmit} className="btn btn-xs md:btn-sm bg-[#ff6200] text-white">Logout</button> */}
//         <div onClick={handleSubmit} className="h-8 w-full">
//             <svg viewBox="0 0 24 24" aria-label="Logout" role="img"
//                 fill="none" stroke="currentColor" strokeWidth="2"
//                 strokeLinecap="round" strokeLinejoin="round" className='h-full w-full' >
//                 <path d="M15 7h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4" />
//                 <path d="M10 12h9" />
//                 <path d="M16 9l3 3-3 3" />
//                 <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
//             </svg>
//             &nbsp;Sign Out
//         </div>
//         </>
//     )
// }


import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticate, loading, user, error } = useSelector(
    (state) => state.auth
  );

  // 🔹 Redirect after logout success
  useEffect(() => {
    if (!isAuthenticate) {
      toast.success("Logout successfully!");
      navigate("/Login");
    }
  }, [isAuthenticate, navigate]);

  // 🔹 Logout click handler
  const handleSubmit = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // unwrap() ensures proper error handling
    } catch (err) {
      toast.error(err || "Something went wrong!");
    }
  };

  // 🔹 Show error toast if error occurs
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div
      onClick={handleSubmit}
      className="h-8 w-full flex items-center cursor-pointer text-white hover:text-[#ff6200] transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        aria-label="Logout"
        role="img"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-6"
      >
        <path d="M15 7h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4" />
        <path d="M10 12h9" />
        <path d="M16 9l3 3-3 3" />
        <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      </svg>
      &nbsp;Sign Out
    </div>
  );
}
