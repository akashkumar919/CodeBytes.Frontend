// src/components/AIResponse.jsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Helper: convert react-markdown `children` into plain string.
 * Handles: string, array of strings, nested react nodes (common with react-markdown).
 */
function getCodeString(children) {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((c) => getCodeString(c)).join("");
  }
  // If it's a React element, try to read its props.children
  if (typeof children === "object" && children.props) {
    return getCodeString(children.props.children);
  }
  // Fallback
  return String(children);
}

export default function AIResponse({ content }) {
  const [copiedId, setCopiedId] = useState(null); // store id or timestamp for feedback

  const handleCopy = async (children) => {
    const codeStr = getCodeString(children).replace(/\u00A0/g, ""); // remove NBSP if any

    // Try Clipboard API first
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeStr);
      } else {
        // Fallback: create a textarea, select & copy
        const ta = document.createElement("textarea");
        ta.value = codeStr;
        // Make textarea out of viewport
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      // visual feedback
      const id = Date.now();
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (err) {
      console.error("Copy failed:", err);
      // optional: show a toast or fallback UI
      alert("Copy failed. Make sure site is served over HTTPS or try manual selection.");
    }
  };

  return (
    <div className="prose prose-invert max-w-none text-gray-100">
      <ReactMarkdown
        children={content}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
              // create stable key from code content (used for feedback)
              const codeText = getCodeString(children);
              const key = String(codeText).slice(0, 40) || "codeblock";

              return (
                <div
                  className="relative my-3 bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-700 shadow-lg"
                  data-code-key={key}
                >
                  <div className="flex items-center justify-between px-3 py-2 bg-[#151515] border-b border-gray-700">
                    <div className="flex space-x-1">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{match[1]}</span>
                  </div>

                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      background: "#1e1e1e",
                      fontSize: "13px",
                      lineHeight: "1.5",
                      padding: "1rem 0.75rem",
                    }}
                    {...props}
                  >
                    {String(codeText).replace(/\n$/, "")}
                  </SyntaxHighlighter>

                  <button
                    onClick={() => handleCopy(children)}
                    className="absolute top-3 right-3 text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 transition"
                    aria-label="Copy code"
                    type="button"
                  >
                    {copiedId ? "Copied!" : "Copy"}
                  </button>
                </div>
              );
            }

            // inline code
            return (
              <code className="bg-[#333] px-1 py-0.5 rounded text-blue-400 font-mono text-sm">
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
}







