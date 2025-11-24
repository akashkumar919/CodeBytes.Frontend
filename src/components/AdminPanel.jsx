import React from "react";
import { Plus, Pencil, Trash2, Video } from "lucide-react";
import { useNavigate } from "react-router";

const actions = [
  {
    title: "Create Problem",
    description: "Add a new DSA problem to the collection.",
    icon: <Plus className="w-6 h-6 text-cyan-400" />,
    path: "/admin/createProblem",
  },
  {
    title: "Update Problem",
    description: "Modify an existing DSA problem's details.",
    icon: <Pencil className="w-6 h-6 text-cyan-400" />,
    path: "/admin/updateProblem",
  },
  {
    title: "Delete Problem",
    description: "Remove a DSA problem from the collection.",
    icon: <Trash2 className="w-6 h-6 text-cyan-400" />,
    path: "/admin/deleteProblem",
  },
  {
    title: "Upload Video",
    description: "Upload A DSA Video.",
    icon: <Video className="w-6 h-6 text-cyan-400" />,
    path: "/admin/videoDelete",
  }
];

export default function AdminPanel(){
   const navigate = useNavigate();
  return(
    <>
    
    <section className="min-h-[100vh] bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a] flex flex-col justify-center items-center px-6 ">
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mt-20">
        {actions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className="group bg-[#353535]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-left hover:bg-gray-700/40 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gray-700 rounded-lg mb-5 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </section>
    </>
  );
}