

import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { useState, useEffect } from "react";

export default function MyStatus({problems}) {
  const { user } = useSelector((state) => state.auth);
  let Easy = 0 ;
  let Medium = 0;
  let Hard = 0;
  let TotalEasy = 0;
  let TotalMedium = 0;
  let TotalHard = 0;
  let Total = 0

  const [submissions, setSubmissions] = useState([]);
 
  useEffect(() => {
    async function fetchSubs() {
      try {
        const res = await axiosClient.get(
          "/submission/getSolvedProblem",
          user?._id
        );
        setSubmissions(res?.data?.solvedProblem || []);
      } catch (err) {
        console.log(err);
      }
    }

    fetchSubs();
  }, [user]);




    // CALCULATE EASY ,MEDIUM , HARD PROBLEM 
  submissions.map((item)=>{
       if(item.difficulty === 'Easy'){
          Easy++;
        }else if(item.difficulty === 'Medium'){
          Medium++;
        }else if(item.difficulty === 'Hard'){
          Hard++;
        }
        Total++;
  })




    // CALCULATE TOTAL EASY ,MEDIUM , HARD PROBLEM 
 problems.map((item)=>{
       if(item.difficulty === 'Easy'){
          TotalEasy++;
        }else if(item.difficulty === 'Medium'){
          TotalMedium++;
        }else if(item.difficulty === 'Hard'){
          TotalHard++;
        }
       Total++;
  })


  return (
    <div className="flex flex-col items-center mt-4 rounded-xl  ">

      {/* ------------ HEADING ------------ */}
    

      {/* ------------ PROFILE SECTION ------------ */}
      <div className="flex flex-col items-center gap-3 ">
          <h1 className="text-2xl font-bold ">My Status</h1>
        <img
           src={user?.photo ? user.photo : "/src/assets/anonymous.png"}
          className="h-28 w-28 rounded-full ring ring-orange-500"
        />

        <div className="text-center">
          <h2 className="text-xl font-semibold">{user?.firstName}&nbsp;{user?.lastName}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* ------------ SOLVED PROBLEMS CARD ------------ */}
      <div className=" w-full max-w-xl mt-8  p-6 ">
       

        {/* ------------ DIFFICULTY COUNTS ------------ */}
        <div className=" flex flex-col gap-4 bg-[#1a1a1a] rounded-lg p-4">
           
         <div className="flex justify-between items-center ">
          <div>
            <h2 className="text-xl font-semibold">Solved Problems</h2>
          </div>

          <p className="text-3xl font-bold">
            {submissions?.length ? submissions.length : 0} / {problems.length}
          </p>
        </div>

          <div className="flex justify-between text-lg">
            <p className="text-green-400 font-bold">Easy</p>
            <p>{Easy} / {TotalEasy}</p>
          </div>

          <div className="flex justify-between text-lg">
            <p className="text-yellow-400 font-bold">Medium</p>
            <p>{Medium}/{TotalMedium} </p>
          </div>

          <div className="flex justify-between text-lg">
            <p className="text-red-400 font-bold">Hard</p>
            <p>{Hard} / {TotalHard} </p>
          </div>
        </div>


        <div className="w-full max-w-xl mt-8 p-4 bg-[#1a1a1a] rounded-xl shadow-lg">
  <h2 className="text-xl font-semibold mb-4 text-white">Solved Problems</h2>
  <hr className="mb-2"/>

  <div className="h-30 overflow-y-auto pr-2 space-y-3">
    {submissions.length > 0 ? (
      submissions.map((item, index) => (
        <div
          key={index}
          className="p-2 bg-[#232323] rounded-lg cursor-pointer">
          <h1 className="text-white font-medium">{item.title}</h1>
        </div>
      ))
    ) : (
      <p className="text-gray-400 text-sm">No problems solved yet.</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
}
