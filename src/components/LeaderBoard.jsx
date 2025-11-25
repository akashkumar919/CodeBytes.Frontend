import { useState, useEffect } from "react";
import { User2 } from "lucide-react";
import axiosClient from "../utils/axiosClient";

export default function LeaderboardPage() {
  
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  // console.log(selectedUser)
  let Easy = 0;
  let Medium = 0;
  let Hard = 0;

  selectedUser?.problemSolved.map((p,i)=>{
    if(p.difficulty === 'Easy'){
      Easy++;
    }
    else if(p.difficulty === 'Medium'){
      Medium++;
    }
    if(p.difficulty === 'Hard'){
      Hard++;
    }
  })

  const pageSize = 15;

  const rankColor = (rank) => {
    if (rank === 1) return "text-yellow-400 font-bold ";
    if (rank === 2) return "text-gray-300 font-bold";
    if (rank === 3) return "text-orange-500 font-bold";
    return "text-gray-300";
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axiosClient.get("/user/allUserInfo");
        const data = res.data.leaderboard;

        setUsers(data);
        setSelectedUser(data[0] || null);
      } catch (err) {
        console.log("Error fetching leaderboard:", err);
      }
    };

    fetchLeaderboard();
  }, []);

  const start = (page - 1) * pageSize;
  const pageUsers = users.slice(start, start + pageSize);

  if (!selectedUser) return <p>Loading...</p>;

  return (
    <div className="w-full mt-15 min-h-screen bg-[#151515] text-white p-4 md:p-6 flex flex-col md:flex-row gap-6">
      {/* Profile Card - Mobile first */}
      <div className="w-full md:w-[350px] order-1 md:order-2 bg-[#1e1e1e] rounded-2xl p-6 shadow-lg">
        <div className="w-28 h-28 mx-auto  rounded-full flex items-center justify-center ">
          <img
            src={
              selectedUser?.photo
                ? selectedUser.photo
                : "/src/assets/anonymous.png"
            }
            alt=""
            className="rounded-full h-28 w-28 ring ring-orange-500"
          />
        </div>

        <h2 className="text-center mt-4 text-2xl font-bold">
          {selectedUser.firstName}&nbsp;{selectedUser.lastName}
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-[#151515] p-4 rounded-xl text-center">
            <p className="text-gray-400">Rank</p>
            <p className="text-xl font-bold text-green-400">
              #{selectedUser.rank}
            </p>
          </div>
          <div className="bg-[#151515] p-4 rounded-xl text-center">
            <p className="text-gray-400">Points</p>
            <p className="text-xl font-bold text-blue-400">
              {selectedUser.points}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6">Solved Statistics</h3>
        <div className="bg-[#151515] p-5 rounded-xl mt-3">
          <div className="flex justify-between items-center text-2xl">
            <p>Total Solved: </p>
            <p>
              <b>{selectedUser.problemSolved.length}</b>
            </p>
          </div>

          <div className="flex justify-between items-center text-green-400 text-sm mt-2">
            <p>Easy: </p>
            <p>{Easy}</p>
          </div>
          <div className="flex justify-between items-center text-yellow-400 text-sm">
            <p>Medium:</p>
            <p> {Medium}</p>
          </div>
          <div className="flex justify-between items-center text-red-500 text-sm">
            <p>Hard:</p>
            <p>{Hard}</p>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 order-2 md:order-1 bg-[#1e1e1e] rounded-2xl p-4 md:p-6 shadow-lg overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-gray-400 hidden md:block">
            See where you stand among the best coders.
          </p>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[60px_1fr_90px_90px] py-3 px-4 rounded-lg bg-[#151515] text-sm uppercase tracking-wide text-white font-semibold min-w-[360px]">
          <span>Rank</span>
          <span>User</span>
          <span>Points</span>
          <span>Solved</span>
        </div>

        {/* User Rows */}
        <div className="mt-4">
          {pageUsers.map((u, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedUser(u)}
              className="grid grid-cols-[60px_1fr_90px_90px] px-4 py-2 rounded-xl bg-[#2d2c2c] hover:bg-[#464646] transition cursor-pointer min-w-[360px] items-center  mb-4 "
            >
              <div className={`text-xl ${rankColor(u.rank)}`}>#{u.rank}</div>
              <div className="flex items-center gap-2">
                {/* <User2 className="w-6 h-6 text-gray-300" /> */}
                <span className="font-semibold truncate">{u.firstName}</span>
              </div>
              <div className="text-lg font-bold text-blue-400">{u.points}</div>
              <div className="text-lg font-bold text-green-400">
                {u.problemSolved.length}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-[#151515] rounded-lg text-gray-300 disabled:opacity-25"
          >
            Previous
          </button>

          <span className="text-gray-400">
            Page {page} of {Math.ceil(users.length / pageSize)}
          </span>

          <button
            disabled={page >= users.length / pageSize}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-[#151515] rounded-lg text-gray-300 disabled:opacity-25"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
