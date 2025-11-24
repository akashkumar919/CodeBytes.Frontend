
// import { Send, Trash2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useState, useEffect, useRef } from "react";
// import axiosClient from "../utils/axiosClient";

// export default function ChatAi({ problem }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "model",
//       parts: [{ text: "Hello! How can I help you today?" }],
//     },
//   ]);

//   const [aiTyping, setAiTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const textareaRef = useRef(null);

//   const { register, handleSubmit, reset } = useForm();

//   // Auto scroll to bottom on new message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, aiTyping]);

//   // ✅ Handle message send
//   const onSubmit = async (data) => {
//     const userMessage = data.message.trim();
//     if (!userMessage) return;

//     // 1️⃣ Show user's message instantly
//     const newUserMsg = {
//       role: "user",
//       parts: [{ text: userMessage }],
//     };
//     setMessages((prev) => [...prev, newUserMsg]);
//     reset(); // clear textarea

//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }

//     try {
//       // 2️⃣ Call backend API
//       setAiTyping(true);
//       const response = await axiosClient.post("/ai/chat", {
//         messages: userMessage,
//         title: problem.title,
//         description: problem.description,
//         startCode: problem.startCode,
//         testCases: problem.visibleTestCases,
//       });

//       // 3️⃣ Show AI reply
//       const aiReply = {
//         role: "model",
//         parts: [{ text: response?.data?.message || "No reply received." }],
//       };
//       setMessages((prev) => [...prev, aiReply]);
//     } catch (error) {
//       console.error("Error in AI reply:", error);
//       const errorMsg = {
//         role: "model",
//         parts: [{ text: "⚠️ Failed to fetch AI response. Try again!" }],
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     } finally {
//       setAiTyping(false);
//     }
//   };

//   // Clear chat
//   const clearChat = () => {
//     setMessages([]);
//   };

//   // Auto resize textarea
//   const handleInput = (e) => {
//     const textarea = e.target;
//     textarea.style.height = "auto";
//     textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
//   };

//   return (
//     <div className="flex flex-col h-[100vh] bg-[#1a1a1a] relative text-white">

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat ${
//               msg.role === "user" ? "chat-end" : "chat-start"
//             }`}
//           >
//             <div className="chat-image avatar">
//               <div className="w-6 rounded-full">
//                 <img
//                   alt="avatar"
//                   src={
//                     msg.role === "user"
//                       ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
//                       : "/src/assets/chatAi.png"
//                   }
//                 />
//               </div>
//             </div>
//             <div
//               className={`chat-bubble rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words transition-all duration-300 ${
//                 msg.role === "user"
//                   ? "bg-black text-white"
//                   : "bg-[#353535] text-white"
//               }`}
//             >
//               {msg.parts[0].text}
//             </div>
//           </div>
//         ))}

//         {/* AI Typing Indicator */}
//         {aiTyping && (
//           <div className="chat chat-start">
//             <div className="chat-image avatar">
//               <div className="w-6 rounded-full">
//                 <img alt="AI avatar" src="/src/assets/chatAi.png" />
//               </div>
//             </div>
//             <div className="chat-bubble bg-[#353535] text-gray-300 px-4 py-2 rounded-2xl">
//               <span className="flex gap-1 items-center">
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
//               </span>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Box */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="absolute bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-gray-700 p-3 flex items-end gap-2"
//       >
//         <textarea
//           {...register("message", { required: true })}
//           ref={(e) => {
//             register("message").ref(e);
//             textareaRef.current = e;
//           }}
//           onInput={handleInput}
//           rows={1}
//           placeholder="Type your message..."
//           className="flex-1 resize-none overflow-hidden rounded-2xl border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-[#1a1a1a] text-sm leading-5"
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSubmit(onSubmit)();
//             }
//           }}
//         />

//         {/* Send Button */}
//         <button
//           type="submit"
//           className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
//         >
//           <Send className="w-5 h-5" />
//         </button>

//         {/* Clear Chat Button */}
//         <button
//           type="button"
//           onClick={clearChat}
//           className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//           title="Clear Chat"
//         >
//           <Trash2 className="w-5 h-5" />
//         </button>
//       </form>
//     </div>
//   );
// }















// import { Send, Trash2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useState, useEffect, useRef } from "react";
// import axiosClient from "../utils/axiosClient";

// export default function ChatAi({ problem }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "model",
//       parts: [{ text: "Hello! How can I help you related to this problem?" }],
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     },
//   ]);

//   const [aiTyping, setAiTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const textareaRef = useRef(null);

//   const { register, handleSubmit, reset } = useForm();

//   // Auto scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, aiTyping]);

//   // ✅ Handle message send
//   const onSubmit = async (data) => {
//     const userMessage = data.message.trim();
//     if (!userMessage) return;

//     // 1️⃣ Add user message instantly
//     const newUserMsg = {
//       role: "user",
//       parts: [{ text: userMessage }],
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     };
//     setMessages((prev) => [...prev, newUserMsg]);
//     reset(); // clear textarea

//     if (textareaRef.current) textareaRef.current.style.height = "auto";

//     try {
//       // 2️⃣ Call backend API
//       setAiTyping(true);
//       const response = await axiosClient.post("/ai/chat", {
//         messages: userMessage,
//         title: problem.title,
//         description: problem.description,
//         startCode: problem.startCode,
//         testCases: problem.visibleTestCases,
//       });

//       // 3️⃣ Add AI reply
//       const aiReply = {
//         role: "model",
//         parts: [{ text: response?.data?.message || "No reply received." }],
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       };
//       setMessages((prev) => [...prev, aiReply]);
//     } catch (error) {
//       console.error("Error in AI reply:", error);
//       const errorMsg = {
//         role: "model",
//         parts: [{ text: "⚠️ Failed to fetch AI response. Try again!" }],
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     } finally {
//       setAiTyping(false);
//     }
//   };

//   // Clear chat
//   const clearChat = () => setMessages([]);

//   // Auto resize textarea
//   const handleInput = (e) => {
//     const textarea = e.target;
//     textarea.style.height = "auto";
//     textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
//   };

//   return (
//     <div className="flex flex-col h-[100vh] bg-[#1a1a1a] relative text-white">

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat ${
//               msg.role === "user" ? "chat-end" : "chat-start"
//             }`}
//           >
//             <div className="chat-image avatar">
//               <div className="w-6 rounded-full">
//                 <img
//                   alt="avatar"
//                   src={
//                     msg.role === "user"
//                       ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
//                       : "/src/assets/chatAi.png"
//                   }
//                 />
//               </div>
//             </div>

//             {/* Message Bubble */}
//             <div
//               className={`chat-bubble rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words transition-all duration-300 ${
//                 msg.role === "user"
//                   ? "bg-[#353535] text-white"
//                   : "bg-[#353535] text-white"
//               }`}
//             >
//               {msg.parts[0].text}
//             </div>

//             {/* Time below message */}
//             <div className="chat-footer opacity-70 text-xs mt-1 px-1">
//               {msg.time}
//             </div>
//           </div>
//         ))}

//         {/* AI Typing Indicator */}
//         {aiTyping && (
//           <div className="chat chat-start">
//             <div className="chat-image avatar">
//               <div className="w-6 rounded-full">
//                 <img alt="AI avatar" src="/src/assets/chatAi.png" />
//               </div>
//             </div>
//             <div className="chat-bubble bg-[#353535] text-gray-300 px-4 py-2 rounded-2xl">
//               <span className="flex gap-1 items-center">
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
//               </span>
//             </div>
//             <div className="chat-footer opacity-70 text-xs mt-1 px-1">
//               typing...
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Box */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="sticky bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-gray-700 p-3 flex items-end gap-2"
        
//       >
//         <textarea
//           {...register("message", { required: true })}
//           ref={(e) => {
//             register("message").ref(e);
//             textareaRef.current = e;
//           }}
//           onInput={handleInput}
//           rows={1}
//           placeholder="Type your message..."
          
//           className="flex-1 resize-none overflow-hidden rounded-2xl border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-[#1a1a1a] text-sm leading-5"
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSubmit(onSubmit)();
//             }
//           }}
//         />

//         {/* Send Button */}
//         <button
//           type="submit"
//           className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
//         >
//           <Send className="w-5 h-5" />
//         </button>

//         {/* Clear Chat Button */}
//         <button
//           type="button"
//           onClick={clearChat}
//           className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//           title="Clear Chat"
//         >
//           <Trash2 className="w-5 h-5" />
//         </button>
//       </form>
//     </div>
//   );
// }


























// // src/components/ChatAi.jsx
// import { Send, Trash2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useState, useEffect, useRef } from "react";
// import axiosClient from "../utils/axiosClient";
// import AIResponse from "./AIResponse";

// export default function ChatAi({ problem }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "model",
//       parts: [{ text: "Hello! How can I help you related to this problem?" }],
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     },
//   ]);

//   const [aiTyping, setAiTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const textareaRef = useRef(null);

//   const { register, handleSubmit, reset } = useForm();

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, aiTyping]);

//   const onSubmit = async (data) => {
//     const userMessage = data.message.trim();
//     if (!userMessage) return;

//     const newUserMsg = {
//       role: "user",
//       parts: [{ text: userMessage }],
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };
//     setMessages((prev) => [...prev, newUserMsg]);
//     reset();
//     if (textareaRef.current) textareaRef.current.style.height = "auto";

//     try {
//       setAiTyping(true);
//       const response = await axiosClient.post("/ai/chat", {
//         messages: userMessage,
//         title: problem.title,
//         description: problem.description,
//         startCode: problem.startCode,
//         testCases: problem.visibleTestCases,
//       });

//       const aiReply = {
//         role: "model",
//         parts: [{ text: response?.data?.message || "No reply received." }],
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setMessages((prev) => [...prev, aiReply]);
//     } catch (error) {
//       console.error("Error in AI reply:", error);
//       const errorMsg = {
//         role: "model",
//         parts: [{ text: "⚠️ Failed to fetch AI response. Try again!" }],
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     } finally {
//       setAiTyping(false);
//     }
//   };

//   const clearChat = () => setMessages([]);

//   const handleInput = (e) => {
//     const textarea = e.target;
//     textarea.style.height = "auto";
//     textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
//   };

//   return (
//     <div className="flex flex-col h-[100vh] bg-[#1a1a1a] relative text-white">
//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat ${
//               msg.role === "user" ? "chat-end" : "chat-start"
//             }`}
//           >
//             <div className="chat-image avatar">
//               <div className="w-6 rounded-full">
//                 <img
//                   alt="avatar"
//                   src={
//                     msg.role === "user"
//                       ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
//                       : "/src/assets/chatAi.png"
//                   }
//                 />
//               </div>
//             </div>

//             {/* Message Bubble */}
//             <div
//               className={`chat-bubble rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words transition-all duration-300 ${
//                 msg.role === "user"
//                   ? "bg-[#353535] text-white"
//                   : "bg-[#353535] text-white"
//               }`}
//             >
//               {msg.role === "model" ? (
//                 <AIResponse content={msg.parts[0].text} />
//               ) : (
//                 msg.parts[0].text
//               )}
//             </div>

//             <div className="chat-footer opacity-70 text-xs mt-1 px-1">
//               {msg.time}
//             </div>
//           </div>
//         ))}

//         {/* Typing Indicator */}
//         {aiTyping && (
//           <div className="chat chat-start">
//             <div className="chat-image avatar">
//               <div className="w-6 rounded-full">
//                 <img alt="AI avatar" src="/src/assets/chatAi.png" />
//               </div>
//             </div>
//             <div className="chat-bubble bg-[#353535] text-gray-300 px-4 py-2 rounded-2xl">
//               <span className="flex gap-1 items-center">
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
//                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
//               </span>
//             </div>
//             <div className="chat-footer opacity-70 text-xs mt-1 px-1">
//               typing...
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Box */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="sticky bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-gray-700 p-3 flex items-end gap-2"
//       >
//         <textarea
//           {...register("message", { required: true })}
//           ref={(e) => {
//             register("message").ref(e);
//             textareaRef.current = e;
//           }}
//           onInput={handleInput}
//           rows={1}
//           placeholder="Type your message..."
//           className="flex-1 resize-none overflow-hidden rounded-2xl border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-[#1a1a1a] text-sm leading-5"
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSubmit(onSubmit)();
//             }
//           }}
//         />

//         <button
//           type="submit"
//           className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
//         >
//           <Send className="w-5 h-5" />
//         </button>

//         <button
//           type="button"
//           onClick={clearChat}
//           className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//           title="Clear Chat"
//         >
//           <Trash2 className="w-5 h-5" />
//         </button>
//       </form>
//     </div>
//   );
// }













import { Send, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axiosClient from "../utils/axiosClient";
import AIResponse from "./AIResponse";

export default function ChatAi({ problem }) {
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [{ text: "👋 Hi developer! How can I assist you with this problem?" }],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [aiTyping, setAiTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const { register, handleSubmit, reset } = useForm();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, aiTyping]);

  const onSubmit = async (data) => {
    const userMessage = data.message.trim();
    if (!userMessage) return;

    const newUserMsg = {
      role: "user",
      parts: [{ text: userMessage }],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newUserMsg]);
    reset();
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      setAiTyping(true);
      const response = await axiosClient.post("/ai/chat", {
        messages: userMessage,
        title: problem.title,
        description: problem.description,
        startCode: problem.startCode,
        testCases: problem.visibleTestCases,
      });

      const aiReply = {
        role: "model",
        parts: [{ text: response?.data?.message || "🤖 No reply received." }],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error("Error in AI reply:", error);
      const errorMsg = {
        role: "model",
        parts: [{ text: "⚠️ AI seems tired... please try again!" }],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setAiTyping(false);
    }
  };

  const clearChat = () => setMessages([]);

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
  };

  return (
    <div className="flex flex-col h-[100vh] bg-[#0d1117] text-white">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-6 px-2 space-y-3 pb-24 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "model" && (
              <img src="/src/assets/code_bytes.png" alt="AI" className="w-8 h-8 rounded-full mr-2" />
            )}
            <div
              className={`rounded-xl px-2 py-2 text-sm shadow-lg max-w-[70%] leading-relaxed transition-all duration-300 break-words ${
                msg.role === "user"
                  ? "bg-blue-600/60 text-white rounded-br-none "
                  : "bg-[#1e1e1e] text-gray-100 border border-gray-700 rounded-bl-none"
              }`}
            >
              {msg.role === "model" ? (
                <AIResponse content={msg.parts[0].text} />
              ) : (
                <span>{msg.parts[0].text}</span>
              )}
              <div className={`text-[10px] mt-1 opacity-60 ${msg.role == 'user' && "flex justify-end"} `}>{msg.time}</div>
            </div>
            {msg.role === "user" && (
              <img
                src="/src/assets/anonymous.png"
                alt="user"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {aiTyping && (
          <div className="flex items-end justify-start">
            <img src="/src/assets/code_bytes.png" alt="AI" className="w-8 h-8 rounded-full mr-2" />
            <div className="bg-[#1e1e1e] text-gray-300 px-4 py-2 rounded-2xl border-none">
              <span className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sticky bottom-0 left-0 w-full bg-[#161b22] border-t border-gray-700 p-3 flex items-end gap-3"
      >
        <textarea
          {...register("message", { required: true })}
          ref={(e) => {
            register("message").ref(e);
            textareaRef.current = e;
          }}
          onInput={handleInput}
          rows={1}
          placeholder="Type your code query..."
          className="flex-1 resize-none overflow-hidden rounded-xl border border-gray-600 px-4 py-2 text-white bg-[#0d1117] focus:outline-none focus:ring-2 focus:ring-blue-600/40 text-sm leading-5"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          title="Send Message"
        >
          <Send className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={clearChat}
          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          title="Clear Chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
