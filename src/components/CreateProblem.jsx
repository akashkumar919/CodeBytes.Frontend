
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router';
import axiosClient from '../utils/axiosClient';
import { Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Loader2 } from "lucide-react";
import { useState } from 'react';




// -------------------- Validation Schema --------------------
const problemSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.array(z.string().min(1, "Tags are required!")).min(1, "At least 1 tag required"),
  constraints: z.array(z.string().min(1, "Constraint required")).min(1, "At least 1 constraint required"),

  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input required"),
      output: z.string().min(1, "Output required"),
      explanation: z.string().min(1, "Explanation required"),
    })
  ).min(1, "At least 1 visible test case"),

  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input required"),
      output: z.string().min(1, "Output required"),
    })
  ).min(1, "At least 1 hidden test case"),

  startCode: z.array(
    z.object({
      initialCode: z.string().min(1, "Initial code required"),
      language: z.enum(["python", "javascript", "java","c","c++","c#"]),
    })
  ).length(6, "All 6 start codes required"),

  referenceSolution: z.array(
    z.object({
      language: z.enum(["python", "javascript", "java","c","c++","c#"]),
      completeCode: z.string().min(1, "Complete code required"),
    })
  ).length(6, "All 6 solutions required"),
});

// -------------------- Component --------------------
export default function CreateProblem() {
  const navigate = useNavigate();
  const {loading} = useSelector((state)=>state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "Easy",
      tags: [""],
      constraints: [""],
      visibleTestCases: [{ input: "", output: "", explanation: "" }],
      hiddenTestCases: [{ input: "", output: "" }],
      startCode: [
        { language: 'python', initialCode: '' },
        { language: 'javascript', initialCode: '' },
        { language: 'java', initialCode: '' },
        { language: 'c', initialCode: '' },
        { language: 'c++', initialCode: '' },
        { language: 'c#', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'python', completeCode: '' },
        { language: 'javascript', completeCode: '' },
        { language: 'java', completeCode: '' },
        { language: 'c', completeCode: '' },
        { language: 'c++', completeCode: '' },
        { language: 'c#', completeCode: '' }
      ],
    },
  });

  // dynamic arrays
  const { fields: tagFields, append: addTag, remove: removeTag } = useFieldArray({ control, name: "tags" });
  const { fields: constraintFields, append: addConstraint, remove: removeConstraint } = useFieldArray({ control, name: "constraints" });
  const { fields: visibleTCFields, append: addVisibleTC, remove: removeVisibleTC } = useFieldArray({ control, name: "visibleTestCases" });
  const { fields: hiddenTCFields, append: addHiddenTC, remove: removeHiddenTC } = useFieldArray({ control, name: "hiddenTestCases" });

  

  const onSubmit = async (data) => {
    
    try {
      console.log(data)
      setIsSubmitting(true);
      const response =  await axiosClient.post("/problem/create", data);
      
      alert("✅ Problem created successfully!");
      setIsSubmitting(false);
    //   navigate("/Admin");
    } catch (err) {
      console.error("Error creating problem:", err.response?.data || err.message);
      alert("❌ Failed to create problem");
    }

   
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center p-6">
      <div className="w-full max-w-5xl space-y-6">
        <h2 className="text-3xl font-bold text-center">Create Problem</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title + Description + Difficulty */}
          <div className="bg-[#353535] px-10 py-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-500 pb-2">Problem Details</h3>
            <input {...register("title")} placeholder="Title" className="w-full p-2 mb-2 rounded bg-[#272626] border border-gray-500" />
            {errors.title && <p className="text-red-400">{errors.title.message}</p>}

            <textarea {...register("description")} placeholder="Description" rows="3" className="w-full p-2 mb-2 rounded bg-[#272626] border border-gray-500"></textarea>
            {errors.description && <p className="text-red-400">{errors.description.message}</p>}
                <label className="label">
                  <span className="label-text">Difficulty</span>
                </label>
            <select {...register("difficulty")} className="w-full p-2 rounded bg-[#272626] border border-gray-500">
              {/* <option value="Easy" >Difficulty</option> */}
              <option value="Easy"  >Easy</option>
              <option value="Medium"  >Medium</option>
              <option value="Hard" >Hard</option>
            </select>
          </div>

          {/* Tags */}
          <div className="bg-[#353535] px-10 py-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-600 pb-2">Tags</h3>
            {tagFields.map((field, idx) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <input {...register(`tags.${idx}`)} className="flex-1 p-2 rounded bg-[#272626] border border-gray-500" />
                <button type="button" onClick={() => removeTag(idx)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addTag("")} className="text-green-400">+ Add Tag</button>
          </div>

          {/* Constraints */}
          <div className="bg-[#353535] px-10 py-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-600 pb-2">Constraints</h3>
            {constraintFields.map((field, idx) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <input {...register(`constraints.${idx}`)} className="flex-1 p-2 rounded bg-[#272626] border border-gray-500" />
                <button type="button" onClick={() => removeConstraint(idx)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addConstraint("")} className="text-green-400">+ Add Constraint</button>
          </div>

          {/* Visible Test Cases */}
          <div className="bg-[#353535] px-10 py-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-500 pb-2">Visible Test Cases</h3>
            {visibleTCFields.map((field, idx) => (
              <div key={field.id} className="mb-2 border-b border-gray-500 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Case {idx + 1}</span>
                  <button type="button" onClick={() => removeVisibleTC(idx)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>
                <input {...register(`visibleTestCases.${idx}.input`)} placeholder="Input" className="w-full p-2 mb-2 rounded bg-[#272626] border border-gray-500" />
                <input {...register(`visibleTestCases.${idx}.output`)} placeholder="Output" className="w-full p-2 mb-2 rounded bg-[#272626] border border-gray-500" />
                <input {...register(`visibleTestCases.${idx}.explanation`)} placeholder="Explanation" className="w-full p-2 rounded bg-[#272626] border border-gray-500" />
              </div>
            ))}
            <button type="button" onClick={() => addVisibleTC({ input: "", output: "", explanation: "" })} className="text-green-400">+ Add Visible Test Case</button>
          </div>

          {/* Hidden Test Cases */}
          <div className="bg-[#353535] px-10 py-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-500 pb-2">Hidden Test Cases</h3>
            {hiddenTCFields.map((field, idx) => (
              <div key={field.id} className="mb-2 border-b border-gray-500 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Case {idx + 1}</span>
                  <button type="button" onClick={() => removeHiddenTC(idx)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>
                <input {...register(`hiddenTestCases.${idx}.input`)} placeholder="Input" className="w-full p-2 mb-2 rounded bg-[#272626] border border-gray-500" />
                <input {...register(`hiddenTestCases.${idx}.output`)} placeholder="Output" className="w-full p-2 rounded bg-[#272626] border border-gray-500" />
              </div>
            ))}
            <button type="button" onClick={() => addHiddenTC({ input: "", output: "" })} className="text-green-400">+ Add Hidden Test Case</button>
          </div>

          {/* Start Code */}
          <div className="bg-[#353535] px-10 py-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-500 pb-2">Starter Code</h3>
            {["python", "javascript", "java","c","c++","c#"].map((lang, idx) => (
              <div key={idx} className="mb-1">
                <label className="block mb-1">{lang}</label>
                <textarea
                  {...register(`startCode.${idx}.initialCode`)}
                  rows="6"
                  className="w-full p-2 rounded bg-[#272626] border border-gray-500 resize-y overflow-y-auto max-h-30"
                ></textarea>
              </div>
            ))}
          </div>

          {/* Reference Solution */}
          <div className="bg-[#353535] px-10 py-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3 border-b border-gray-500 pb-2">Reference Solution</h3>
            {["python", "javascript", "java","c","c++","c#"].map((lang, idx) => (
              <div key={idx} className="mb-1">
                <label className="block mb-1">{lang}</label>
                <textarea
                  {...register(`referenceSolution.${idx}.completeCode`)}
                  rows="6"
                  className="w-full p-2 rounded bg-[#272626] border border-gray-500 resize-y overflow-y-auto max-h-30"
                ></textarea>
              </div>
            ))}
          </div>

          {/* Submit */}

        
          {/* <button  type="submit" className="w-full  py-2 rounded-lg font-semibold text-white 
             bg-gradient-to-r from-[#ff6200] to-[#ff8533] 
             hover:from-[#e65c00] hover:to-[#ff751a]">
             Create Problem 
          </button> */}

          <button  
  type="submit" 
  disabled={isSubmitting}   
  className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-white 
    bg-gradient-to-r from-[#ff6200] to-[#ff8533] 
    hover:from-[#e65c00] hover:to-[#ff751a]
    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}  
>
  {isSubmitting ? (
    <>
      <Loader2 className="animate-spin h-5 w-5" />  {/* 🔥 Spinning Loader */}
      Creating...
    </>
  ) : (
    "Create Problem"
  )}
</button>

        
        </form>
      </div>
    </div>
  );
}


