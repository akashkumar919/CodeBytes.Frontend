import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import Shimmer from "./Shimmer";
import ErrorMessage from "./ErrorMessage";

export default function DeleteProblem() {
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
  const handleDelete = async (id) => {
    try {
      const userInput = prompt(
        "Type DELETE to confirm you want to delete this problem:"
      );
      if (userInput !== "DELETE") {
        alert("Problem not deleted.");
        return;
      }

      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems((prev) => prev.filter((problem) => problem._id !== id));
      alert("Problem deleted successfully!");
    } catch (err) {
      setError("Failed to delete problem!");
      console.error(err);
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
        <h1 className="text-3xl font-bold text-white">Delete Problem</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead className="bg-[#222]">
            <tr>
              <th className="p-3">No.</th>
              <th className="p-3">Title</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Tags</th>
              <th className="p-3">Actions</th>
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
                <td className="p-3">{problem.title}</td>
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
                <td className="p-3 flex flex-wrap gap-2">
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
                <td className="p-3">
                  <button
                    className="btn btn-error btn-sm rounded-2xl"
                    onClick={() => handleDelete(problem._id)}
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
