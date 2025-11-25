
import { useRef, useState, useEffect } from "react";
import { RefreshCcw, Bold, Italic, Underline } from "lucide-react";

export default function Notes() {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  // Auto resize
  useEffect(() => {
    const el = editorRef.current;
    if (el) {
      el.style.height = "160px"; // default height
      el.style.height = el.scrollHeight + "px"; // auto expand
    }
  }, [content]);

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    setContent("");
  };

  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      // Auto resize
      const el = editorRef.current;
      el.style.height = "160px";
      el.style.height = el.scrollHeight + "px";
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-transparent rounded-lg p-4 h-[100vh]">
      {/* Header with Clear button */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">My Notes</h2>

        {/* Toolbar */}
        <div className="flex gap-2 text-gray-700 dark:text-gray-300 mr-2">
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatText("bold")}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <Bold />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatText("italic")}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <Italic />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatText("underline")}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <Underline />
          </button>
        </div>

        {/* Clear button */}
        <button onClick={handleClear} className="text-blue-500 rounded-md cursor-pointer">
          <RefreshCcw />
        </button>
      </div>

      {/* ContentEditable editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning={true}
        className="w-full min-h-[460px] p-2 rounded resize-none overflow-hidden dark:bg-[#1e1e1e] dark:text-gray-100 focus:outline-none border-none break-words whitespace-pre-wrap"
        placeholder="Write your notes here..."
        onInput={handleInput}
      ></div>
    </div>
  );
}

