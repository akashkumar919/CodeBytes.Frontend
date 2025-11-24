import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { CheckCircle, XCircle, MoveLeft, MoveRight } from "lucide-react";
import { Link } from "react-router";
import MyStatus from "./MyStatus";

export default function Problem() {
  const { user, isAuthenticate } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);

  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filter, setFilter] = useState({
    difficulty: "all",
    tags: "all",
    status: "all",
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  useEffect(() => {
    const fetchAllProblem = async () => {
      try {
        const response = await axiosClient.get(
          `/problem/allProblem?page=${page}&limit=${limit}`
        );
        setProblems(response.data.problems || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching problems:", err.message);
      }
    };

    const fetchSolvedProblem = async () => {
      try {
        const response = await axiosClient.get("/submission/getSolvedProblem");
        setSolvedProblems(response.data.solvedProblem || []);
      } catch (err) {
        console.error("Error fetching solved problems:", err.message);
      }
    };

    fetchAllProblem();

    if (user) fetchSolvedProblem();
  }, [user, page]);

  useEffect(() => {
    if (!isAuthenticate) {
      setSolvedProblems([]);
    }
  }, [isAuthenticate]);

  const filteredProblems = problems.filter((problem) => {
    const difficultyMatch =
      filter.difficulty === "all" ||
      filter.difficulty.toLowerCase() === problem.difficulty.toLowerCase();

    const tagMatch =
      filter.tags === "all" ||
      (Array.isArray(problem.tags) &&
        problem.tags.includes(filter.tags.toLowerCase()));

    const statusMatch =
      filter.status === "all" ||
      (filter.status === "solved" &&
        solvedProblems.some((sp) => sp._id === problem._id));

    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <>
      <div className="mt-22 mb-10 flex flex-col lg:flex-row w-full gap-8 mx-auto container">
        {/* MAIN CONTENT */}
        <div className="flex flex-col w-full lg:w-[70%] gap-6">
          {/* Filter Section */}
          <div className="p-5 rounded-md flex flex-col sm:flex-row gap-4 bg-[#353535]/60">
            {/* Status Filter */}
            <select
              value={filter.status}
              onChange={(e) =>
                setFilter({ ...filter, status: e.target.value.toLowerCase() })
              }
              className="w-full sm:w-1/3 bg-[#1a1a1a] border border-gray-500 rounded-md py-2 px-4"
            >
              <option value="all">All Problems</option>
              <option value="solved">Solved Problems</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={filter.difficulty}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  difficulty: e.target.value.toLowerCase(),
                })
              }
              className="w-full sm:w-1/3 bg-[#1a1a1a] rounded-md py-2 px-4"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Tags Filter */}
            <select
              value={filter.tags}
              onChange={(e) =>
                setFilter({ ...filter, tags: e.target.value.toLowerCase() })
              }
              className="w-full sm:w-1/3 bg-[#1a1a1a] border border-gray-500 rounded-md py-2 px-4"
            >
              <option value="all">All Tags</option>
              <option value="array">Array</option>
              <option value="string">String</option>
              <option value="linkedList">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">DP</option>
            </select>
          </div>

          {/* Problems List */}
          <div className="w-full rounded-xl bg-[#1a1a1a] p-2 md:p-0">
            {/* HEADER (Desktop only) */}
            <div className="hidden md:flex items-center justify-between px-5 py-3 mb-4 bg-[#303030]/70 rounded-xl text-gray-300 text-sm font-semibold">
              <span className="w-[10%]">No.</span>
              <span className="w-[40%]">Title</span>
              <span className="w-[10%]">Status</span>
              <span className="w-[15%]">Acceptance</span>
              <span className="w-[15%]">Difficulty</span>
              <span className="w-[20%]">Tags</span>
            </div>

            {/* PROBLEMS */}
            {filteredProblems.map((problem, index) => {
              const isSolved = solvedProblems.some(
                (sp) => sp._id === problem._id
              );

              return (
                <Link
                  key={problem._id || index}
                  to={`/problem/oneProblem/${problem._id}`}
                  className="block"
                >
                  <div
                    className="flex flex-col md:flex-row md:items-center justify-between 
                               px-5 py-4 mb-3 bg-[#353535]/40 hover:bg-[#404040] 
                               transition rounded-xl cursor-pointer"
                  >
                    {/* Left: No + Title */}
                    <div className="flex items-center gap-4 md:w-[40%] mb-2 md:mb-0">
                      <span className="text-gray-300 font-semibold text-sm md:text-base">
                        {(page - 1) * limit + index + 1}.
                      </span>

                      <p className="text-white hover:text-[#ff6200] text-md font-medium">
                        {problem.title}
                      </p>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between md:w-[60%] gap-3">
                      {/* Status Indicator */}
                      <span className="md:w-[10%]">
                        {isSolved ? (
                          <CheckCircle className="text-green-400 w-5 h-5" />
                        ) : (
                          <XCircle className="text-red-400 w-5 h-5" />
                        )}
                      </span>

                      {/* Acceptance */}
                      <span className="text-gray-300 text-sm md:text-base md:w-[20%]">
                        {Math.floor(problem?.acceptSubmissionsCount /
                          problem?.submissionsCount) *
                          100 || "47.3"}
                        %
                      </span>

                      {/* Difficulty */}
                      <span
                        className={`font-semibold text-sm md:text-base md:w-[20%] ${
                          problem.difficulty === "Easy"
                            ? "text-teal-400"
                            : problem.difficulty === "Medium"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {problem.difficulty}
                      </span>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 md:w-[40%]">
                        {Array.isArray(problem.tags) &&
                        problem.tags.length > 0 ? (
                          problem.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-xs">No tags</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 p-4">
            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-2 rounded-lg border transition ${
                page === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              <MoveLeft />
            </button>

            {/* Page numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-3 py-1 rounded-lg border transition text-sm ${
                      page === num
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}
            </div>

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 py-2 rounded-lg border transition ${
                page === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              <MoveRight />
            </button>
          </div>
        </div>

        {/* STATUS PANEL */}
        <div className="h-auto lg:h-[770px] lg:w-[30%] rounded-xl bg-[#353535]/60 order-first lg:order-last">
          <MyStatus problems={problems} />
        </div>
      </div>
    </>
  );
}
