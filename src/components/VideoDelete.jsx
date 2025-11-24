import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import Shimmer from "./Shimmer";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router";

export default function VideoDelete() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 5; // 👈 change this for more or fewer rows per page

  // ✅ Fetch all problems
  const fetchAllProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`/problem/allProblem`);
      setProblems(data.problems);
      setError(null);
    } catch (error) {
      setError("Failed to fetch problems!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProblems();
  }, []);

  // ✅ Handle delete
  const handleVideoDelete = async (id) => {
    try {
      const userInput = prompt(
        "Type DELETE to confirm you want to delete this Video:"
      );
      if (userInput !== "DELETE") {
        alert("Video not deleted.");
        return;
      }

      const ans = await axiosClient.delete(`/video/deleteVideo/${id}`);
     
      setProblems((prev) => prev.filter((problem) => problem._id !== id));
      alert("Video deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to delete video");
      console.error(err);
      console.log(err)
    }
  };

  // ✅ Pagination logic
  const totalPages = Math.ceil(problems.length / problemsPerPage);
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (loading) return <Shimmer />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAllProblems} />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4 mt-15">
        <h1 className="text-3xl font-bold text-white">Upload & Delete Video</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead className="bg-[#222]">
            <tr>
              <th className="py-3">No.</th>
              <th className="py-3">Title</th>
              <th className="py-3">Difficulty</th>
              <th className="py-3">Tags</th>
              <th className="py-3"colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProblems.map((problem, index) => (
              <tr
                key={problem._id}
                className={`${
                  (index + 1) % 2 === 0 ? "bg-[#353535]/60" : "bg-[#1b1b1b]"
                } transition-colors duration-200 hover:bg-[#4a4a4a]`}
              >
                <td className="p-3">{indexOfFirstProblem + index + 1}</td>
                <td className="p-3 ">{problem.title}</td>
                <td className="p-3">
                  <span
                    className={`badge badge-sm ${
                      problem.difficulty === "Easy"
                        ? "badge-success"
                        : problem.difficulty === "Medium"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-3 flex flex-wrap gap-2">
                  {Array.isArray(problem.tags) && problem.tags.length > 0 ? (
                    problem.tags.map((t, i) => (
                      <span key={i} className="badge badge-info badge-sm">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="badge badge-ghost">No Tags</span>
                  )}
                </td>
                <td className="py-3">
                    <button
                    className="btn btn-success btn-sm rounded-2xl"
                    onClick={()=>{navigate(`/admin/VideoUpload/${problem._id}`)}}
                  >
                    Upload
                  </button>
                </td>
                <td className="py-3">
                  <button
                    className="btn btn-error btn-sm rounded-2xl"
                    onClick={() => handleVideoDelete(problem._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="btn btn-sm bg-gray-700 text-white"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            className="btn btn-sm bg-gray-700 text-white"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
