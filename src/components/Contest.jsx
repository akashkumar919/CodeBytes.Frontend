import { useEffect, useState } from "react";

export default function Contest() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    // API call ya dummy data
    setContests([
      { id: 1, title: "Weekly Coding Challenge", status: "Ongoing", time: "2h left" },
      { id: 2, title: "Algo Marathon", status: "Upcoming", time: "Starts in 3d" },
      { id: 3, title: "DSA Sprint", status: "Past", time: "Ended 2d ago" },
    ]);
  }, []);

  return (
    <div className="p-6 mt-13 h-[100vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">Coding Contests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-[#353535] p-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">{contest.title}</h2>
            <p
              className={`mb-3 font-medium ${
                contest.status === "Ongoing"
                  ? "text-green-500"
                  : contest.status === "Upcoming"
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
            >
              {contest.status} — {contest.time}
            </p>

            <button
              className={`px-4 py-2 rounded-lg font-medium border transition duration-200 ${
                contest.status === "Ongoing"
                  ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  : contest.status === "Upcoming"
                  ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                  : "border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
              }`}
            >
              {contest.status === "Ongoing"
                ? "Join Now"
                : contest.status === "Upcoming"
                ? "View Details"
                : "View Results"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
