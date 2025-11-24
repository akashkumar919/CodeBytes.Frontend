import { useSelector } from "react-redux";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Linkedin, Github, MapPin } from "lucide-react";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let Easy = 0;
  let Medium = 0;
  let Hard = 0;
  let TotalEasy = 0;
  let TotalMedium = 0;
  let TotalHard = 0;
  let Total = 0;

  const [submissions, setSubmissions] = useState([]);
  const [problems, setProblems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const PROBLEMS_PER_PAGE = 15;

  const totalPages = Math.ceil(submissions.length / PROBLEMS_PER_PAGE);

  // Slice data
  const currentProblems = submissions.slice(
    (currentPage - 1) * PROBLEMS_PER_PAGE,
    currentPage * PROBLEMS_PER_PAGE
  );

  // ---------- Fetch solved problems ----------
  useEffect(() => {
    async function fetchSubs() {
      try {
        // fetch submissions
        const res = await axiosClient.get(
          "/submission/getSolvedProblem",
          user?._id
        );
        // fetch problems
        const result = await axiosClient.get("/problem/allProblem");

        setProblems(result?.data?.problems || []);

        setSubmissions(res?.data?.solvedProblem || []);
      } catch (err) {
        console.log(err);
      }
    }

    if (user?._id) fetchSubs();
  }, [user?._id]);

  // CALCULATE EASY ,MEDIUM , HARD PROBLEM
  submissions.map((item) => {
    if (item.difficulty === "Easy") {
      Easy++;
    } else if (item.difficulty === "Medium") {
      Medium++;
    } else if (item.difficulty === "Hard") {
      Hard++;
    }
    Total++;
  });

  // CALCULATE TOTAL EASY ,MEDIUM , HARD PROBLEM
  problems.map((item) => {
    if (item.difficulty === "Easy") {
      TotalEasy++;
    } else if (item.difficulty === "Medium") {
      TotalMedium++;
    } else if (item.difficulty === "Hard") {
      TotalHard++;
    }
    Total++;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 md:p-8 text-white mt-15">
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="bg-[#2d2d2d] rounded-2xl h-fit p-5">
          {/* PROFILE */}
          <div className="flex items-center gap-4 ">
            <img
              src={user?.photo ? user.photo : "/src/assets/anonymous.png"}
              // src="/src/assets/anonymous.png"
              className="h-16 w-16 rounded-xl ring ring-orange-500"
            />
            <div>
              <h2 className="text-sm font-semibold">
                {user?.firstName}&nbsp;{user?.lastName}
              </h2>
              <p className="opacity-70 break-all text-xs">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/user/account")}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold cursor-pointer"
          >
            Edit Profile
          </button>

          {/* Links */}
          <div className="mt-4 text-gray-400">
            <div className="flex items-center gap-2">
              {user?.city && <MapPin size={15} />}
              {user?.city}&nbsp;{user?.country}
            </div>

            <div className="flex justify-start items-center gap-8 mt-4">
              <a href={`${user?.githubId}`} target="_">
                {user?.githubId && <Github size={18} />}
              </a>
              <a href={`${user?.linkedInId}`} target="_">
                {user?.linkedInId && <Linkedin size={18} />}
              </a>
            </div>
          </div>
          <div className="border-b border-gray-600 my-4" />

          {/* Community Stats */}
          <h3 className="font-semibold text-lg mb-3 text-[#ff6200]">
            Community Stats
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>Views: 0</p>
            <p>Solution: 0</p>
            <p>Reputation: 0</p>
          </div>

          <div className="border-b border-gray-600 my-4" />

          {/* Languages */}
          <h3 className="font-semibold text-lg mb-3 text-[#ff6200] ">
            Languages
          </h3>
          <div className="flex flex-wrap gap-1">
            {user?.language ? user?.language.map((lang, idx) => {
              return (
                <span
                  className="bg-gray-600 px-2 py-1 rounded-lg text-xs  break-all"
                  key={idx}
                >
                  {lang}
                </span>
              );
            }) : ""}
          </div>

          <div className="border-b border-gray-600 my-4 " />

          {/* Skills */}
          <h3 className="font-semibold text-lg mb-3 text-[#ff6200]">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {user?.skills ? user?.skills.map((lang, idx) => {
              return (
                <span
                  className="bg-gray-600 px-2 py-1 rounded-lg text-xs  break-all"
                  key={idx}
                >
                  {lang}
                </span>
              );
            }) : ""}
          </div>

          <hr className="text-gray-600 mt-5 mb-5" />
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-3 space-y-6">
          {/* PROGRESS CARD */}
          <div className="bg-[#2d2d2d] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-[#ff6200]">
                Solved Problems
              </h2>
              <p className="text-3xl font-bold">
                {submissions.length} / {problems.length}
              </p>
            </div>

            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="text-center">
                <p className="text-green-400 font-bold">Easy</p>
                <p>
                  {" "}
                  {Easy}/{TotalEasy}
                </p>
              </div>
              <div className="text-center">
                <p className="text-yellow-400 font-bold">Medium</p>
                <p>
                  {Medium}/{TotalMedium}{" "}
                </p>
              </div>
              <div className="text-center">
                <p className="text-red-400 font-bold">Hard</p>
                <p>
                  {" "}
                  {Hard} /{TotalHard}
                </p>
              </div>
            </div>
          </div>

          {/* HEATMAP */}
          <div className="bg-[#2d2d2d] rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#ff6200]">
              total {submissions.length} submissions
            </h3>

            <div className="overflow-x-auto">
              <CalendarHeatmap
                startDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
                endDate={new Date()}
                values={submissions}
                gutterSize={3}
                showWeekdayLabels={false}
                classForValue={(value) => {
                  if (!value) return "color-empty";
                  if (value.count >= 4) return "color-scale-4";
                  if (value.count >= 3) return "color-scale-3";
                  if (value.count >= 2) return "color-scale-2";
                  return "color-scale-1";
                }}
                tooltipDataAttrs={(value) => {
                  if (!value || !value.date)
                    return { "data-tip": "No submissions" };

                  return {
                    "data-tip": `${value.count} submissions on ${new Date(
                      value.date
                    ).toDateString()}`,
                  };
                }}
              />
            </div>
          </div>

          {/* RECENT SUBMISSIONS */}
          <div className="bg-[#2d2d2d] rounded-2xl p-6 w-full shadow-lg">
            {/* SOLVED PROBLEMS CARD */}
            <h2 className="text-xl font-semibold mb-4 text-[#ff6200] ">
              Solved Problems
            </h2>
            <hr className="border-gray-700 mb-4" />

            {/* List */}
            <div className="max-h-72 overflow-y-auto pr-2 space-y-3 custom-scroll">
              {currentProblems.length > 0 ? (
                currentProblems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-[#232323] rounded-lg transition cursor-pointer"
                  >
                    <p className="text-white font-medium w-1/2 truncate">
                      {item.title}
                    </p>

                    <p
                      className={`font-semibold w-20 text-center ${
                        item.difficulty === "Easy"
                          ? "text-green-400"
                          : item.difficulty === "Medium"
                          ? "text-yellow-400"
                          : "text-red-500"
                      }`}
                    >
                      {item.difficulty}
                    </p>

                    <p className="text-gray-300 text-sm w-28 text-right">
                      {new Date(item?.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No problems solved yet.</p>
              )}
            </div>

            {/* PAGINATION */}
            {submissions.length > PROBLEMS_PER_PAGE && (
              <div className="flex justify-between items-center mt-4">
                {/* PREV */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-[#232323] hover:bg-[#343434]"
                  }`}
                >
                  Prev
                </button>

                {/* PAGE NUMBERS */}
                <p className="text-gray-300">
                  Page <span className="font-semibold">{currentPage}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </p>

                {/* NEXT */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-[#232323] hover:bg-[#343434]"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
