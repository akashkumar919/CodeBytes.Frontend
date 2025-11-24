// import { useState, useEffect } from "react";
// import { Pencil, X, Plus, Trash2 } from "lucide-react";
// import axiosClient from "../utils/axiosClient";
// import Shimmer from "./Shimmer";
// import ErrorMessage from "./ErrorMessage";

// export default function UpdateProblem() {
//   const [problems, setProblems] = useState([]);
//   const [oneProblem, setOneProblem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // ✅ Fetch all problems
//   const fetchAllProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get(`/problem/allProblem`);
//       setProblems(data.problems);
//       setError(null);
//     } catch (error) {
//       setError("Failed to fetch problems!");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllProblems();
//   }, []);

//   // ✅ Fetch single problem
//   const handleUpdate = async (id) => {
//     try {
//       const { data } = await axiosClient.get(`/problem/oneProblem/${id}`);
//       setOneProblem(data.problem || data);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Generic field change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOneProblem((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle Array Input (like tags, constraints)
//   const handleArrayChange = (field, value) => {
//     setOneProblem({
//       ...oneProblem,
//       [field]: value.split(",").map((v) => v.trim()),
//     });
//   };

//   // ✅ Handle Nested Array Change
//   const handleNestedChange = (field, index, key, value) => {
//     const updated = [...oneProblem[field]];
//     updated[index][key] = value;
//     setOneProblem({ ...oneProblem, [field]: updated });
//   };

//   // ✅ Add / Remove Nested Fields
//   const addNestedField = (field, template) => {
//     setOneProblem({
//       ...oneProblem,
//       [field]: [...oneProblem[field], template],
//     });
//   };
//   const removeNestedField = (field, index) => {
//     const updated = oneProblem[field].filter((_, i) => i !== index);
//     setOneProblem({ ...oneProblem, [field]: updated });
//   };

//   // ✅ Update request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       await axiosClient.put(`/problem/update/${oneProblem._id}`, oneProblem);
//       alert("✅ Problem updated successfully!");
//       setOneProblem(null);
//       fetchAllProblems();
//     } catch (error) {
//       console.error(error);
//       alert("❌ Failed to update problem");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <Shimmer />;
//   if (error) return <ErrorMessage message={error} onRetry={fetchAllProblems} />;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-center mb-4 mt-10">
//         <h1 className="text-3xl font-bold text-white">Update Problem</h1>
//       </div>

//       {/* ✅ Edit Form */}
//       {oneProblem && (
//         <form onSubmit={handleSubmit} className="bg-[#222] p-6 rounded-lg mb-8 text-white space-y-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Edit Problem</h2>
//             <X className="cursor-pointer text-red-400" onClick={() => setOneProblem(null)} />
//           </div>

//           {/* Basic Fields */}
//           <div>
//             <label className="block mb-1">Title</label>
//             <input name="title" value={oneProblem.title || ""} onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none" />
//           </div>

//           <div>
//             <label className="block mb-1">Description</label>
//             <textarea name="description" value={oneProblem.description || ""} onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none h-24" />
//           </div>

//           <div>
//             <label className="block mb-1">Difficulty</label>
//             <select name="difficulty" value={oneProblem.difficulty || "Easy"} onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none">
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1">Tags (comma separated)</label>
//             <input value={oneProblem.tags?.join(", ") || ""} onChange={(e) => handleArrayChange("tags", e.target.value)}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none" />
//           </div>

//           <div>
//             <label className="block mb-1">Constraints (comma separated)</label>
//             <input value={oneProblem.constraints?.join(", ") || ""} onChange={(e) => handleArrayChange("constraints", e.target.value)}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none" />
//           </div>

//           {/* ✅ Visible Test Cases */}
//           <div>
//             <label className="block font-semibold mb-2">Visible Test Cases</label>
//             {oneProblem.visibleTestCases?.map((t, i) => (
//               <div key={i} className="bg-[#333] p-3 rounded mb-2">
//                 <div className="flex justify-between items-center mb-2">
//                   <p>Case #{i + 1}</p>
//                   <Trash2 className="text-red-400 cursor-pointer" onClick={() => removeNestedField("visibleTestCases", i)} />
//                 </div>
//                 <input placeholder="Input" value={t.input} onChange={(e) => handleNestedChange("visibleTestCases", i, "input", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] mb-2 outline-none" />
//                 <input placeholder="Output" value={t.output} onChange={(e) => handleNestedChange("visibleTestCases", i, "output", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] mb-2 outline-none" />
//                 <input placeholder="Explanation" value={t.explanation || ""} onChange={(e) => handleNestedChange("visibleTestCases", i, "explanation", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] outline-none" />
//               </div>
//             ))}
//             <button type="button" className="text-cyan-400 flex items-center gap-1" onClick={() => addNestedField("visibleTestCases", { input: "", output: "", explanation: "" })}>
//               <Plus size={16} /> Add Test Case
//             </button>
//           </div>

//           {/* ✅ Hidden Test Cases */}
//           <div>
//             <label className="block font-semibold mb-2">Hidden Test Cases</label>
//             {oneProblem.hiddenTestCases?.map((t, i) => (
//               <div key={i} className="bg-[#333] p-3 rounded mb-2">
//                 <div className="flex justify-between items-center mb-2">
//                   <p>Case #{i + 1}</p>
//                   <Trash2 className="text-red-400 cursor-pointer" onClick={() => removeNestedField("hiddenTestCases", i)} />
//                 </div>
//                 <input placeholder="Input" value={t.input} onChange={(e) => handleNestedChange("hiddenTestCases", i, "input", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] mb-2 outline-none" />
//                 <input placeholder="Output" value={t.output} onChange={(e) => handleNestedChange("hiddenTestCases", i, "output", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] outline-none" />
//               </div>
//             ))}
//             <button type="button" className="text-cyan-400 flex items-center gap-1" onClick={() => addNestedField("hiddenTestCases", { input: "", output: "" })}>
//               <Plus size={16} /> Add Hidden Test Case
//             </button>
//           </div>

//           {/* ✅ Start Code */}
// <div>
//   <label className="block font-semibold mb-2">Starter Code</label>
//   {oneProblem.startCode?.map((sc, i) => (
//     <div key={i} className="bg-[#333] p-3 rounded mb-2">
//       <div className="flex justify-between items-center mb-2">
//         <p>Language #{i + 1}</p>
//         <Trash2
//           className="text-red-400 cursor-pointer"
//           onClick={() => removeNestedField("startCode", i)}
//         />
//       </div>
//       <input
//         placeholder="Language"
//         value={sc.language}
//         onChange={(e) => handleNestedChange("startCode", i, "language", e.target.value)}
//         className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//       />
//       <textarea
//         placeholder="Initial Code"
//         value={sc.initialCode}
//         onChange={(e) => handleNestedChange("startCode", i, "initialCode", e.target.value)}
//         className="w-full p-2 rounded bg-[#444] h-20 outline-none"
//       />
//     </div>
//   ))}
//   <button
//     type="button"
//     className="text-cyan-400 flex items-center gap-1"
//     onClick={() => addNestedField("startCode", { language: "", initialCode: "" })}
//   >
//     <Plus size={16} /> Add Start Code
//   </button>
// </div>

// {/* ✅ Reference Solution */}
// <div>
//   <label className="block font-semibold mb-2">Reference Solution</label>
//   {oneProblem.referenceSolution?.map((rs, i) => (
//     <div key={i} className="bg-[#333] p-3 rounded mb-2">
//       <div className="flex justify-between items-center mb-2">
//         <p>Solution #{i + 1}</p>
//         <Trash2
//           className="text-red-400 cursor-pointer"
//           onClick={() => removeNestedField("referenceSolution", i)}
//         />
//       </div>
//       <input
//         placeholder="Language"
//         value={rs.language}
//         onChange={(e) => handleNestedChange("referenceSolution", i, "language", e.target.value)}
//         className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//       />
//       <textarea
//         placeholder="Complete Code"
//         value={rs.completeCode}
//         onChange={(e) => handleNestedChange("referenceSolution", i, "completeCode", e.target.value)}
//         className="w-full p-2 rounded bg-[#444] h-20 outline-none"
//       />
//     </div>
//   ))}
//   <button
//     type="button"
//     className="text-cyan-400 flex items-center gap-1"
//     onClick={() => addNestedField("referenceSolution", { language: "", completeCode: "" })}
//   >
//     <Plus size={16} /> Add Reference
//   </button>
// </div>


//           {/* Creator */}
//           <div>
//             <p className="text-sm text-gray-400">
//               <strong>Creator ID:</strong> {oneProblem.problemCreator}
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={updating}
//             className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded mt-3"
//           >
//             {updating ? "Updating..." : "Update Problem"}
//           </button>
//         </form>
//       )}

//       {/* ✅ Problems Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-white">
//           <thead className="bg-[#222]">
//             <tr>
//               <th className="p-3">No.</th>
//               <th className="p-3">Title</th>
//               <th className="p-3">Difficulty</th>
//               <th className="p-3">Tags</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {problems.map((problem, index) => (
//               <tr
//                 key={problem._id}
//                 className={`${
//                   (index + 1) % 2 === 0 ? "bg-[#353535]/60" : "bg-[#1b1b1b]"
//                 } transition-colors duration-200 hover:bg-[#4a4a4a]`}
//               >
//                 <td className="p-3">{index + 1}</td>
//                 <td className="p-3">{problem.title}</td>
//                 <td className="p-3">
//                   <span
//                     className={`badge badge-sm ${
//                       problem.difficulty === "Easy"
//                         ? "badge-success"
//                         : problem.difficulty === "Medium"
//                         ? "badge-warning"
//                         : "badge-error"
//                     }`}
//                   >
//                     {problem.difficulty}
//                   </span>
//                 </td>
//                 <td className="p-3 flex flex-wrap gap-2">
//                   {problem.tags?.length ? (
//                     problem.tags.map((t, i) => (
//                       <span key={i} className="badge badge-info badge-sm">
//                         {t}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="badge badge-ghost">No Tags</span>
//                   )}
//                 </td>
//                 <td className="p-3">
//                   <Pencil
//                     className="w-6 h-6 text-cyan-400 cursor-pointer"
//                     onClick={() => handleUpdate(problem._id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }







// import { useState, useEffect } from "react";
// import { Pencil, X, Plus, Trash2 } from "lucide-react";
// import axiosClient from "../utils/axiosClient";
// import Shimmer from "./Shimmer";
// import ErrorMessage from "./ErrorMessage";

// export default function UpdateProblem() {
//   const [problems, setProblems] = useState([]);
//   const [oneProblem, setOneProblem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // ✅ Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const problemsPerPage = 5; // Change this for more or fewer per page

//   // ✅ Fetch all problems
//   const fetchAllProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get(`/problem/allProblem`);
//       setProblems(data.problems);
//       setError(null);
//     } catch (error) {
//       setError("Failed to fetch problems!");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllProblems();
//   }, []);

//   // ✅ Fetch single problem
//   const handleUpdate = async (id) => {
//     try {
//       const { data } = await axiosClient.get(`/problem/oneProblem/${id}`);
//       setOneProblem(data.problem || data);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Generic field change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOneProblem((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle Array Input (like tags, constraints)
//   const handleArrayChange = (field, value) => {
//     setOneProblem({
//       ...oneProblem,
//       [field]: value.split(",").map((v) => v.trim()),
//     });
//   };

//   // ✅ Handle Nested Array Change
//   const handleNestedChange = (field, index, key, value) => {
//     const updated = [...oneProblem[field]];
//     updated[index][key] = value;
//     setOneProblem({ ...oneProblem, [field]: updated });
//   };

//   // ✅ Add / Remove Nested Fields
//   const addNestedField = (field, template) => {
//     setOneProblem({
//       ...oneProblem,
//       [field]: [...oneProblem[field], template],
//     });
//   };
//   const removeNestedField = (field, index) => {
//     const updated = oneProblem[field].filter((_, i) => i !== index);
//     setOneProblem({ ...oneProblem, [field]: updated });
//   };

//   // ✅ Update request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       await axiosClient.put(`/problem/update/${oneProblem._id}`, oneProblem);
//       alert("✅ Problem updated successfully!");
//       setOneProblem(null);
//       fetchAllProblems();
//     } catch (error) {
//       console.error(error);
//       alert("❌ Failed to update problem");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <Shimmer />;
//   if (error) return <ErrorMessage message={error} onRetry={fetchAllProblems} />;

//   // ✅ Pagination Logic
//   const indexOfLast = currentPage * problemsPerPage;
//   const indexOfFirst = indexOfLast - problemsPerPage;
//   const currentProblems = problems.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(problems.length / problemsPerPage);

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-center mb-4 mt-10">
//         <h1 className="text-3xl font-bold text-white">Update Problem</h1>
//       </div>

//       {/* ✅ Edit Form */}
//       {oneProblem && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-[#222] p-6 rounded-lg mb-8 text-white space-y-4"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Edit Problem</h2>
//             <X
//               className="cursor-pointer text-red-400"
//               onClick={() => setOneProblem(null)}
//             />
//           </div>

//           {/* Basic Fields */}
//           <div>
//             <label className="block mb-1">Title</label>
//             <input
//               name="title"
//               value={oneProblem.title || ""}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Description</label>
//             <textarea
//               name="description"
//               value={oneProblem.description || ""}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none h-24"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Difficulty</label>
//             <select
//               name="difficulty"
//               value={oneProblem.difficulty || "Easy"}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
//             >
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1">Tags (comma separated)</label>
//             <input
//               value={oneProblem.tags?.join(", ") || ""}
//               onChange={(e) => handleArrayChange("tags", e.target.value)}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Constraints (comma separated)</label>
//             <input
//               value={oneProblem.constraints?.join(", ") || ""}
//               onChange={(e) => handleArrayChange("constraints", e.target.value)}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
//             />
//           </div>

//           {/* Test Cases, Start Code, Reference — same as before */}
//           {/* (keeping your original version intact) */}

//           {/* ✅ Visible Test Cases */}
//           <div>
//             <label className="block font-semibold mb-2">Visible Test Cases</label>
//             {oneProblem.visibleTestCases?.map((t, i) => (
//               <div key={i} className="bg-[#333] p-3 rounded mb-2">
//                 <div className="flex justify-between items-center mb-2">
//                   <p>Case #{i + 1}</p>
//                   <Trash2 className="text-red-400 cursor-pointer" onClick={() => removeNestedField("visibleTestCases", i)} />
//                 </div>
//                 <input placeholder="Input" value={t.input} onChange={(e) => handleNestedChange("visibleTestCases", i, "input", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] mb-2 outline-none" />
//                 <input placeholder="Output" value={t.output} onChange={(e) => handleNestedChange("visibleTestCases", i, "output", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] mb-2 outline-none" />
//                 <input placeholder="Explanation" value={t.explanation || ""} onChange={(e) => handleNestedChange("visibleTestCases", i, "explanation", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] outline-none" />
//               </div>
//             ))}
//             <button type="button" className="text-cyan-400 flex items-center gap-1" onClick={() => addNestedField("visibleTestCases", { input: "", output: "", explanation: "" })}>
//               <Plus size={16} /> Add Test Case
//             </button>
//           </div>

//           {/* ✅ Hidden Test Cases */}
//           <div>
//             <label className="block font-semibold mb-2">Hidden Test Cases</label>
//             {oneProblem.hiddenTestCases?.map((t, i) => (
//               <div key={i} className="bg-[#333] p-3 rounded mb-2">
//                 <div className="flex justify-between items-center mb-2">
//                   <p>Case #{i + 1}</p>
//                   <Trash2 className="text-red-400 cursor-pointer" onClick={() => removeNestedField("hiddenTestCases", i)} />
//                 </div>
//                 <input placeholder="Input" value={t.input} onChange={(e) => handleNestedChange("hiddenTestCases", i, "input", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] mb-2 outline-none" />
//                 <input placeholder="Output" value={t.output} onChange={(e) => handleNestedChange("hiddenTestCases", i, "output", e.target.value)}
//                   className="w-full p-2 rounded bg-[#444] outline-none" />
//               </div>
//             ))}
//             <button type="button" className="text-cyan-400 flex items-center gap-1" onClick={() => addNestedField("hiddenTestCases", { input: "", output: "" })}>
//               <Plus size={16} /> Add Hidden Test Case
//             </button>
//           </div>

//           {/* ✅ Start Code */}
// <div>
//   <label className="block font-semibold mb-2">Starter Code</label>
//   {oneProblem.startCode?.map((sc, i) => (
//     <div key={i} className="bg-[#333] p-3 rounded mb-2">
//       <div className="flex justify-between items-center mb-2">
//         <p>Language #{i + 1}</p>
//         <Trash2
//           className="text-red-400 cursor-pointer"
//           onClick={() => removeNestedField("startCode", i)}
//         />
//       </div>
//       <input
//         placeholder="Language"
//         value={sc.language}
//         onChange={(e) => handleNestedChange("startCode", i, "language", e.target.value)}
//         className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//       />
//       <textarea
//         placeholder="Initial Code"
//         value={sc.initialCode}
//         onChange={(e) => handleNestedChange("startCode", i, "initialCode", e.target.value)}
//         className="w-full p-2 rounded bg-[#444] h-20 outline-none"
//       />
//     </div>
//   ))}
//   <button
//     type="button"
//     className="text-cyan-400 flex items-center gap-1"
//     onClick={() => addNestedField("startCode", { language: "", initialCode: "" })}
//   >
//     <Plus size={16} /> Add Start Code
//   </button>
// </div>

// {/* ✅ Reference Solution */}
// <div>
//   <label className="block font-semibold mb-2">Reference Solution</label>
//   {oneProblem.referenceSolution?.map((rs, i) => (
//     <div key={i} className="bg-[#333] p-3 rounded mb-2">
//       <div className="flex justify-between items-center mb-2">
//         <p>Solution #{i + 1}</p>
//         <Trash2
//           className="text-red-400 cursor-pointer"
//           onClick={() => removeNestedField("referenceSolution", i)}
//         />
//       </div>
//       <input
//         placeholder="Language"
//         value={rs.language}
//         onChange={(e) => handleNestedChange("referenceSolution", i, "language", e.target.value)}
//         className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//       />
//       <textarea
//         placeholder="Complete Code"
//         value={rs.completeCode}
//         onChange={(e) => handleNestedChange("referenceSolution", i, "completeCode", e.target.value)}
//         className="w-full p-2 rounded bg-[#444] h-20 outline-none"
//       />
//     </div>
//   ))}
//   <button
//     type="button"
//     className="text-cyan-400 flex items-center gap-1"
//     onClick={() => addNestedField("referenceSolution", { language: "", completeCode: "" })}
//   >
//     <Plus size={16} /> Add Reference
//   </button>
// </div>

//           <div>
//             <p className="text-sm text-gray-400">
//               <strong>Creator ID:</strong> {oneProblem.problemCreator}
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={updating}
//             className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded mt-3"
//           >
//             {updating ? "Updating..." : "Update Problem"}
//           </button>
//         </form>
//       )}

//       {/* ✅ Problems Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-white">
//           <thead className="bg-[#222]">
//             <tr>
//               <th className="p-3">No.</th>
//               <th className="p-3">Title</th>
//               <th className="p-3">Difficulty</th>
//               <th className="p-3">Tags</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProblems.map((problem, index) => (
//               <tr
//                 key={problem._id}
//                 className={`${
//                   (index + 1) % 2 === 0
//                     ? "bg-[#353535]/60"
//                     : "bg-[#1b1b1b]"
//                 } transition-colors duration-200 hover:bg-[#4a4a4a]`}
//               >
//                 <td className="p-3">
//                   {(currentPage - 1) * problemsPerPage + (index + 1)}
//                 </td>
//                 <td className="p-3">{problem.title}</td>
//                 <td className="p-3">
//                   <span
//                     className={`badge badge-sm ${
//                       problem.difficulty === "Easy"
//                         ? "badge-success"
//                         : problem.difficulty === "Medium"
//                         ? "badge-warning"
//                         : "badge-error"
//                     }`}
//                   >
//                     {problem.difficulty}
//                   </span>
//                 </td>
//                 <td className="p-3 flex flex-wrap gap-2">
//                   {problem.tags?.length ? (
//                     problem.tags.map((t, i) => (
//                       <span key={i} className="badge badge-info badge-sm">
//                         {t}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="badge badge-ghost">No Tags</span>
//                   )}
//                 </td>
//                 <td className="p-3">
//                   <Pencil
//                     className="w-6 h-6 text-cyan-400 cursor-pointer"
//                     onClick={() => handleUpdate(problem._id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Pagination Controls */}
//       <div className="flex justify-center items-center mt-6 gap-4 text-white">
//         <button
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded ${
//             currentPage === 1
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-cyan-600 hover:bg-cyan-700"
//           }`}
//         >
//           Previous
//         </button>

//         <span className="text-lg font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 rounded ${
//             currentPage === totalPages
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-cyan-600 hover:bg-cyan-700"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }








// import Modal from "./Modal";
// import { useState, useEffect } from "react";
// import { Pencil, X, Plus, Trash2 } from "lucide-react";
// import axiosClient from "../utils/axiosClient";
// import Shimmer from "./Shimmer";
// import ErrorMessage from "./ErrorMessage";

// export default function UpdateProblem() {
//   const [problems, setProblems] = useState([]);
//   const [oneProblem, setOneProblem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // ✅ Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const problemsPerPage = 5; // Change this for more or fewer per page

//   // state for modal
//   const [activeModal, setActiveModal] = useState(null);


//   // ✅ Fetch all problems
//   const fetchAllProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get(`/problem/allProblem`);
//       setProblems(data.problems);
//       setError(null);
//     } catch (error) {
//       setError("Failed to fetch problems!");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllProblems();
//   }, []);

//   // ✅ Fetch single problem
//   const handleUpdate = async (id) => {
//     try {
//       const { data } = await axiosClient.get(`/problem/oneProblem/${id}`);
//       setOneProblem(data.problem || data);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Generic field change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOneProblem((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle Array Input (like tags, constraints)
//   const handleArrayChange = (field, value) => {
//     setOneProblem({
//       ...oneProblem,
//       [field]: value.split(",").map((v) => v.trim()),
//     });
//   };

//   // ✅ Handle Nested Array Change
//   const handleNestedChange = (field, index, key, value) => {
//     const updated = [...oneProblem[field]];
//     updated[index][key] = value;
//     setOneProblem({ ...oneProblem, [field]: updated });
//   };

//   // ✅ Add / Remove Nested Fields
//   const addNestedField = (field, template) => {
//     setOneProblem({
//       ...oneProblem,
//       [field]: [...oneProblem[field], template],
//     });
//   };
//   const removeNestedField = (field, index) => {
//     const updated = oneProblem[field].filter((_, i) => i !== index);
//     setOneProblem({ ...oneProblem, [field]: updated });
//   };

//   // ✅ Update request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       await axiosClient.put(`/problem/update/${oneProblem._id}`, oneProblem);
//       alert("✅ Problem updated successfully!");
//       setOneProblem(null);
//       fetchAllProblems();
//     } catch (error) {
//       console.error(error);
//       alert("❌ Failed to update problem");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <Shimmer />;
//   if (error) return <ErrorMessage message={error} onRetry={fetchAllProblems} />;

//   // ✅ Pagination Logic
//   const indexOfLast = currentPage * problemsPerPage;
//   const indexOfFirst = indexOfLast - problemsPerPage;
//   const currentProblems = problems.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(problems.length / problemsPerPage);

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-center mb-4 mt-10">
//         <h1 className="text-3xl font-bold text-white">Update Problem</h1>
//       </div>

//       {/* ✅ Edit Form */}
//       {oneProblem && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-[#222] p-6 rounded-lg mb-8 text-white space-y-4"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Edit Problem</h2>
//             <X
//               className="cursor-pointer text-red-400"
//               onClick={() => setOneProblem(null)}
//             />
//           </div>

//           {/* Basic Fields */}
//           <div>
//             <label className="block mb-1">Title</label>
//             <input
//               name="title"
//               value={oneProblem.title || ""}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Description</label>
//             <textarea
//               name="description"
//               value={oneProblem.description || ""}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none h-24"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Difficulty</label>
//             <select
//               name="difficulty"
//               value={oneProblem.difficulty || "Easy"}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
//             >
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1">Tags (comma separated)</label>
//             <input
//               value={oneProblem.tags?.join(", ") || ""}
//               onChange={(e) => handleArrayChange("tags", e.target.value)}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Constraints (comma separated)</label>
//             <input
//               value={oneProblem.constraints?.join(", ") || ""}
//               onChange={(e) => handleArrayChange("constraints", e.target.value)}
//               className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
//             />
//           </div>

//           {/* Test Cases, Start Code, Reference — same as before */}
//           {/* (keeping your original version intact) */}

//           {/* ✅ Visible Test Cases */}
// <div className="flex justify-between items-center bg-[#333] p-3 rounded mb-2">
//   <p>Visible Test Cases</p>
//   <button
//     type="button"
//     onClick={() => setActiveModal("visible")}
//     className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white text-sm"
//   >
//     Edit
//   </button>
// </div>

// {/* ✅ Hidden Test Cases */}
// <div className="flex justify-between items-center bg-[#333] p-3 rounded mb-2">
//   <p>Hidden Test Cases</p>
//   <button
//     type="button"
//     onClick={() => setActiveModal("hidden")}
//     className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white text-sm"
//   >
//     Edit
//   </button>
// </div>

// {/* ✅ Start Code */}
// <div className="flex justify-between items-center bg-[#333] p-3 rounded mb-2">
//   <p>Start Code</p>
//   <button
//     type="button"
//     onClick={() => setActiveModal("start")}
//     className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white text-sm"
//   >
//     Edit
//   </button>
// </div>

// {/* ✅ Reference Solution */}
// <div className="flex justify-between items-center bg-[#333] p-3 rounded mb-2">
//   <p>Reference Solution</p>
//   <button
//     type="button"
//     onClick={() => setActiveModal("reference")}
//     className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white text-sm"
//   >
//     Edit
//   </button>
// </div>


//           <div>
//             <p className="text-sm text-gray-400">
//               <strong>Creator ID:</strong> {oneProblem.problemCreator}
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={updating}
//             className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded mt-3"
//           >
//             {updating ? "Updating..." : "Update Problem"}
//           </button>
//         </form>
//       )}



// {/* 🧩 Visible Test Cases Modal */}
// {activeModal === "visible" && (
//   <Modal title="Edit Visible Test Cases" onClose={() => setActiveModal(null)}>
//     {oneProblem.visibleTestCases?.map((t, i) => (
//       <div key={i} className="bg-[#333] p-3 rounded mb-2">
//         <div className="flex justify-between items-center mb-2">
//           <p>Case #{i + 1}</p>
//           <Trash2
//             className="text-red-400 cursor-pointer"
//             onClick={() => removeNestedField("visibleTestCases", i)}
//           />
//         </div>
//         <input
//           placeholder="Input"
//           value={t.input}
//           onChange={(e) => handleNestedChange("visibleTestCases", i, "input", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//         />
//         <input
//           placeholder="Output"
//           value={t.output}
//           onChange={(e) => handleNestedChange("visibleTestCases", i, "output", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//         />
//         <input
//           placeholder="Explanation"
//           value={t.explanation || ""}
//           onChange={(e) => handleNestedChange("visibleTestCases", i, "explanation", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] outline-none"
//         />
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={() =>
//         addNestedField("visibleTestCases", { input: "", output: "", explanation: "" })
//       }
//       className="text-cyan-400 flex items-center gap-1 mt-2"
//     >
//       <Plus size={16} /> Add Test Case
//     </button>
//   </Modal>
// )}

// {/* 🧩 Hidden Test Cases Modal */}
// {activeModal === "hidden" && (
//   <Modal title="Edit Hidden Test Cases" onClose={() => setActiveModal(null)}>
//     {oneProblem.hiddenTestCases?.map((t, i) => (
//       <div key={i} className="bg-[#333] p-3 rounded mb-2">
//         <div className="flex justify-between items-center mb-2">
//           <p>Case #{i + 1}</p>
//           <Trash2
//             className="text-red-400 cursor-pointer"
//             onClick={() => removeNestedField("hiddenTestCases", i)}
//           />
//         </div>
//         <input
//           placeholder="Input"
//           value={t.input}
//           onChange={(e) => handleNestedChange("hiddenTestCases", i, "input", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//         />
//         <input
//           placeholder="Output"
//           value={t.output}
//           onChange={(e) => handleNestedChange("hiddenTestCases", i, "output", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] outline-none"
//         />
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={() =>
//         addNestedField("hiddenTestCases", { input: "", output: "" })
//       }
//       className="text-cyan-400 flex items-center gap-1 mt-2"
//     >
//       <Plus size={16} /> Add Hidden Test Case
//     </button>
//   </Modal>
// )}

// {/* 🧩 Start Code Modal */}
// {activeModal === "start" && (
//   <Modal title="Edit Start Code" onClose={() => setActiveModal(null)}>
//     {oneProblem.startCode?.map((sc, i) => (
//       <div key={i} className="bg-[#333] p-3 rounded mb-2">
//         <div className="flex justify-between items-center mb-2">
//           <p>Language #{i + 1}</p>
//           <Trash2
//             className="text-red-400 cursor-pointer"
//             onClick={() => removeNestedField("startCode", i)}
//           />
//         </div>
//         <input
//           placeholder="Language"
//           value={sc.language}
//           onChange={(e) => handleNestedChange("startCode", i, "language", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//         />
//         <textarea
//           placeholder="Initial Code"
//           value={sc.initialCode}
//           onChange={(e) => handleNestedChange("startCode", i, "initialCode", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] h-20 outline-none"
//         />
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={() =>
//         addNestedField("startCode", { language: "", initialCode: "" })
//       }
//       className="text-cyan-400 flex items-center gap-1 mt-2"
//     >
//       <Plus size={16} /> Add Start Code
//     </button>
//   </Modal>
// )}

// {/* 🧩 Reference Solution Modal */}
// {activeModal === "reference" && (
//   <Modal title="Edit Reference Solution" onClose={() => setActiveModal(null)}>
//     {oneProblem.referenceSolution?.map((rs, i) => (
//       <div key={i} className="bg-[#333] p-3 rounded mb-2">
//         <div className="flex justify-between items-center mb-2">
//           <p>Solution #{i + 1}</p>
//           <Trash2
//             className="text-red-400 cursor-pointer"
//             onClick={() => removeNestedField("referenceSolution", i)}
//           />
//         </div>
//         <input
//           placeholder="Language"
//           value={rs.language}
//           onChange={(e) => handleNestedChange("referenceSolution", i, "language", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
//         />
//         <textarea
//           placeholder="Complete Code"
//           value={rs.completeCode}
//           onChange={(e) => handleNestedChange("referenceSolution", i, "completeCode", e.target.value)}
//           className="w-full p-2 rounded bg-[#444] h-20 outline-none"
//         />
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={() =>
//         addNestedField("referenceSolution", { language: "", completeCode: "" })
//       }
//       className="text-cyan-400 flex items-center gap-1 mt-2"
//     >
//       <Plus size={16} /> Add Reference
//     </button>
//   </Modal>
// )}




//       {/* ✅ Problems Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-white">
//           <thead className="bg-[#222]">
//             <tr>
//               <th className="p-3">No.</th>
//               <th className="p-3">Title</th>
//               <th className="p-3">Difficulty</th>
//               <th className="p-3">Tags</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProblems.map((problem, index) => (
//               <tr
//                 key={problem._id}
//                 className={`${
//                   (index + 1) % 2 === 0
//                     ? "bg-[#353535]/60"
//                     : "bg-[#1b1b1b]"
//                 } transition-colors duration-200 hover:bg-[#4a4a4a]`}
//               >
//                 <td className="p-3">
//                   {(currentPage - 1) * problemsPerPage + (index + 1)}
//                 </td>
//                 <td className="p-3">{problem.title}</td>
//                 <td className="p-3">
//                   <span
//                     className={`badge badge-sm ${
//                       problem.difficulty === "Easy"
//                         ? "badge-success"
//                         : problem.difficulty === "Medium"
//                         ? "badge-warning"
//                         : "badge-error"
//                     }`}
//                   >
//                     {problem.difficulty}
//                   </span>
//                 </td>
//                 <td className="p-3 flex flex-wrap gap-2">
//                   {problem.tags?.length ? (
//                     problem.tags.map((t, i) => (
//                       <span key={i} className="badge badge-info badge-sm">
//                         {t}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="badge badge-ghost">No Tags</span>
//                   )}
//                 </td>
//                 <td className="p-3">
//                   <Pencil
//                     className="w-6 h-6 text-cyan-400 cursor-pointer"
//                     onClick={() => handleUpdate(problem._id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Pagination Controls */}
//       <div className="flex justify-center items-center mt-6 gap-4 text-white">
//         <button
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded ${
//             currentPage === 1
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-cyan-600 hover:bg-cyan-700"
//           }`}
//         >
//           Previous
//         </button>

//         <span className="text-lg font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 rounded ${
//             currentPage === totalPages
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-cyan-600 hover:bg-cyan-700"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }




import Modal from "./Modal";
import { useState, useEffect } from "react";
import { Pencil, X, Plus, Trash2, Badge } from "lucide-react";
import axiosClient from "../utils/axiosClient";
import Shimmer from "./Shimmer";
import ErrorMessage from "./ErrorMessage";
import { success } from "zod";
import { warning } from "framer-motion";

export default function UpdateProblem() {
  const [problems, setProblems] = useState([]);
  const [oneProblem, setOneProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [fullEdit, setFullEdit] = useState({ field: null, index: null, value: "" });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 5;

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

  // ✅ Fetch single problem
  const handleUpdate = async (id) => {
    try {
      const { data } = await axiosClient.get(`/problem/oneProblem/${id}`);
      setOneProblem(data.problem || data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Generic field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOneProblem((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Array Input (tags, constraints)
  const handleArrayChange = (field, value) => {
    setOneProblem({
      ...oneProblem,
      [field]: value.split(",").map((v) => v.trim()),
    });
  };

  // ✅ Handle Nested Array Change
  const handleNestedChange = (field, index, key, value) => {
    const updated = [...oneProblem[field]];
    updated[index][key] = value;
    setOneProblem({ ...oneProblem, [field]: updated });
  };

  // ✅ Add / Remove Nested Fields
  const addNestedField = (field, template) => {
    setOneProblem({
      ...oneProblem,
      [field]: [...oneProblem[field], template],
    });
  };

  const removeNestedField = (field, index) => {
    const updated = oneProblem[field].filter((_, i) => i !== index);
    setOneProblem({ ...oneProblem, [field]: updated });
  };

  // ✅ Update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await axiosClient.put(`/problem/update/${oneProblem._id}`, oneProblem);
      alert("✅ Problem updated successfully!");
      setOneProblem(null);
      fetchAllProblems();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update problem");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Shimmer />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAllProblems} />;

  // Pagination logic
  const indexOfLast = currentPage * problemsPerPage;
  const indexOfFirst = indexOfLast - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(problems.length / problemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mt-15 mb-4">Update Problem</h1>

{fullEdit.field && (
  <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-6xl bg-[#1f1f1f] rounded-lg p-4 text-white relative h-[90vh] flex flex-col">
      {/* Close Button */}
      <button
        onClick={() => setFullEdit({ field: null, index: null, value: "" })}
        className="absolute top-4 right-4 text-red-400 hover:text-red-500"
      >
        <X size={24} />
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-3">
        Full Edit - {fullEdit.field} #{fullEdit.index + 1}
      </h2>

      {/* Textarea */}
      <textarea
        className="flex-1 w-full bg-[#2a2a2a] rounded p-3 outline-none resize-none font-mono"
        value={fullEdit.value}
        onChange={(e) =>
          setFullEdit((prev) => ({ ...prev, value: e.target.value }))
        }
      ></textarea>

      {/* Save Button */}
      <button
        className="mt-3 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
        onClick={() => {
          const updated = [...oneProblem[fullEdit.field]];
          if (fullEdit.field === "startCode") {
            updated[fullEdit.index].initialCode = fullEdit.value;
          } else if (fullEdit.field === "referenceSolution") {
            updated[fullEdit.index].completeCode = fullEdit.value;
          }
          setOneProblem({ ...oneProblem, [fullEdit.field]: updated });
          setFullEdit({ field: null, index: null, value: "" });
        }}
      >
        Save Changes
      </button>
    </div>
  </div>
)}

      {/* ✅ Edit Form */}
      {oneProblem && (
        <form onSubmit={handleSubmit} className="bg-[#222] p-6 rounded-lg mb-8 text-white space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Problem</h2>
            <X className="cursor-pointer text-red-400" onClick={() => setOneProblem(null)} />
          </div>

          {/* Basic Fields */}
          <div>
            <label className="block mb-1">Title</label>
            <input
              name="title"
              value={oneProblem.title || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={oneProblem.description || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#333] mb-3 outline-none h-24"
            />
          </div>

          <div>
            <label className="block mb-1">Difficulty</label>
            <select
              name="difficulty"
              value={oneProblem.difficulty || "Easy"}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Tags (comma separated)</label>
            <input
              value={oneProblem.tags?.join(", ") || ""}
              onChange={(e) => handleArrayChange("tags", e.target.value)}
              className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Constraints (comma separated)</label>
            <input
              value={oneProblem.constraints?.join(", ") || ""}
              onChange={(e) => handleArrayChange("constraints", e.target.value)}
              className="w-full p-2 rounded bg-[#333] mb-3 outline-none"
            />
          </div>

          {/* Sections with modal buttons */}
          {["visible", "hidden", "start", "reference"].map((type) => (
            <div key={type} className="flex justify-between items-center bg-[#333] p-3 rounded mb-2">
              <p>
                {type === "visible"
                  ? "Visible Test Cases"
                  : type === "hidden"
                  ? "Hidden Test Cases"
                  : type === "start"
                  ? "Start Code"
                  : "Reference Solution"}
              </p>
              <button
                type="button"
                onClick={() => setActiveModal(type)}
                className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white text-sm"
              >
                Edit
              </button>
            </div>
          ))}

          <button
            type="submit"
            disabled={updating}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded mt-3"
          >
            {updating ? "Updating..." : "Update Problem"}
          </button>
        </form>
      )}

      {/* ✅ Visible Test Cases Modal */}
      {activeModal === "visible" && (
        <Modal title="Edit Visible Test Cases" onClose={() => setActiveModal(null)}>
          {oneProblem.visibleTestCases?.map((t, i) => (
            <div key={i} className="bg-[#333] p-3 rounded mb-2">
              <div className="flex justify-between items-center mb-2">
                <p>Case #{i + 1}</p>
                <Trash2 className="text-red-400 cursor-pointer" onClick={() => removeNestedField("visibleTestCases", i)} />
              </div>
              <input
                placeholder="Input"
                value={t.input}
                onChange={(e) => handleNestedChange("visibleTestCases", i, "input", e.target.value)}
                className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
              />
              <input
                placeholder="Output"
                value={t.output}
                onChange={(e) => handleNestedChange("visibleTestCases", i, "output", e.target.value)}
                className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
              />
              <input
                placeholder="Explanation"
                value={t.explanation || ""}
                onChange={(e) => handleNestedChange("visibleTestCases", i, "explanation", e.target.value)}
                className="w-full p-2 rounded bg-[#444] outline-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addNestedField("visibleTestCases", { input: "", output: "", explanation: "" })
            }
            className="text-cyan-400 flex items-center gap-1 mt-2"
          >
            <Plus size={16} /> Add Test Case
          </button>
        </Modal>
      )}

      {/* ✅ Hidden Test Cases Modal */}
      {activeModal === "hidden" && (
        <Modal title="Edit Hidden Test Cases" onClose={() => setActiveModal(null)}>
          {oneProblem.hiddenTestCases?.map((t, i) => (
            <div key={i} className="bg-[#333] p-3 rounded mb-2">
              <div className="flex justify-between items-center mb-2">
                <p>Case #{i + 1}</p>
                <Trash2 className="text-red-400 cursor-pointer" onClick={() => removeNestedField("hiddenTestCases", i)} />
              </div>
              <input
                placeholder="Input"
                value={t.input}
                onChange={(e) => handleNestedChange("hiddenTestCases", i, "input", e.target.value)}
                className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
              />
              <input
                placeholder="Output"
                value={t.output}
                onChange={(e) => handleNestedChange("hiddenTestCases", i, "output", e.target.value)}
                className="w-full p-2 rounded bg-[#444] outline-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNestedField("hiddenTestCases", { input: "", output: "" })}
            className="text-cyan-400 flex items-center gap-1 mt-2"
          >
            <Plus size={16} /> Add Hidden Test Case
          </button>
        </Modal>
      )}

      {/* ✅ Start Code Modal */}
      {activeModal === "start" && (
        <Modal title="Edit Start Code" onClose={() => setActiveModal(null)}>
          {oneProblem.startCode?.map((sc, i) => (
            <div key={i} className="bg-[#333] p-3 rounded mb-2">
              <div className="flex justify-between items-center mb-2">
                <p>Language #{i + 1}</p>
                <Trash2 className="text-red-400 cursor-pointer" onClick={() => removeNestedField("startCode", i)} />
              </div>
              <input
                placeholder="Language"
                value={sc.language}
                onChange={(e) => handleNestedChange("startCode", i, "language", e.target.value)}
                className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
              />
              <textarea
                placeholder="Initial Code"
                value={sc.initialCode}
                onChange={(e) => handleNestedChange("startCode", i, "initialCode", e.target.value)}
                className="w-full p-2 rounded bg-[#444] h-20 outline-none"
              />
              <button
                type="button"
                onClick={() => setFullEdit({ field: "startCode", index: i, value: sc.initialCode })}
                className="mt-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
              >
                Full Edit
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNestedField("startCode", { language: "", initialCode: "" })}
            className="text-cyan-400 flex items-center gap-1 mt-2"
          >
            <Plus size={16} /> Add Start Code
          </button>
        </Modal>
      )}

      {/* ✅ Reference Solution Modal */}
      {activeModal === "reference" && (
        <Modal title="Edit Reference Solution" onClose={() => setActiveModal(null)}>
          {oneProblem.referenceSolution?.map((rs, i) => (
            <div key={i} className="bg-[#333] p-3 rounded mb-2">
              <div className="flex justify-between items-center mb-2">
                <p>Solution #{i + 1}</p>
                <Trash2
                  className="text-red-400 cursor-pointer"
                  onClick={() => removeNestedField("referenceSolution", i)}
                />
              </div>
              <input
                placeholder="Language"
                value={rs.language}
                onChange={(e) => handleNestedChange("referenceSolution", i, "language", e.target.value)}
                className="w-full p-2 rounded bg-[#444] mb-2 outline-none"
              />
              <textarea
                placeholder="Complete Code"
                value={rs.completeCode}
                onChange={(e) =>
                  handleNestedChange("referenceSolution", i, "completeCode", e.target.value)
                }
                className="w-full p-2 rounded bg-[#444] h-20 outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setFullEdit({ field: "referenceSolution", index: i, value: rs.completeCode })
                }
                className="mt-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
              >
                Full Edit
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addNestedField("referenceSolution", { language: "", completeCode: "" })
            }
            className="text-cyan-400 flex items-center gap-1 mt-2"
          >
            <Plus size={16} /> Add Reference
          </button>
        </Modal>
      )}

      {/* ✅ Fullscreen Code Editor Modal */}
      {fullEdit.field && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-6xl bg-[#1f1f1f] rounded-lg p-4 text-white relative h-[90vh] flex flex-col">
            <button
              onClick={() => setFullEdit({ field: null, index: null, value: "" })}
              className="absolute top-4 right-4 text-red-400 hover:text-red-500"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-3">
              Full Edit - {fullEdit.field} #{fullEdit.index + 1}
            </h2>
            <textarea
              className="flex-1 w-full bg-[#2a2a2a] rounded p-3 outline-none resize-none font-mono"
              value={fullEdit.value}
              onChange={(e) => setFullEdit((prev) => ({ ...prev, value: e.target.value }))}
            ></textarea>
            <button
              className="mt-3 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
              onClick={() => {
                const updated = [...oneProblem[fullEdit.field]];
                if (fullEdit.field === "startCode") {
                  updated[fullEdit.index].initialCode = fullEdit.value;
                } else if (fullEdit.field === "referenceSolution") {
                  updated[fullEdit.index].completeCode = fullEdit.value;
                }
                setOneProblem({ ...oneProblem, [fullEdit.field]: updated });
                setFullEdit({ field: null, index: null, value: "" });
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ✅ Problems Table */}
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
                } hover:bg-[#4a4a4a] transition-colors duration-200`}
              >
                <td className="p-3">
                  {(currentPage - 1) * problemsPerPage + (index + 1)}
                </td>
                <td className="p-3">{problem.title}</td>
                <td className="p-3">{problem.difficulty}</td>
                
                <td className="p-3 flex flex-wrap gap-2">
                  {problem.tags?.length ? (
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
                  <Pencil
                    className="w-6 h-6 text-cyan-400 cursor-pointer"
                    onClick={() => handleUpdate(problem._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-4 text-white">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          Previous
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
