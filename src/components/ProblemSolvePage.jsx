import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import axiosClient from "../utils/axiosClient";
import { Copy } from "lucide-react";
import ChatAi from "./ChatAi";
import VideoPlayer from "./VideoPlayer";
import Notes from "./Notes";
import { ArrowLeft } from "lucide-react";

// ---------- Utility UI bits ----------
const Pill = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${className}`}
  >
    {children}
  </span>
);

const DifficultyBadge = ({ level }) => {
  const map = {
    Easy: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
    Medium: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
    Hard: "bg-rose-500/15 text-rose-400 ring-rose-500/30",
  };
  return (
    <Pill
      className={
        map[level] || "bg-slate-500/15 text-slate-300 ring-slate-500/30"
      }
    >
      {level || "Unknown"}
    </Pill>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-slate-400 text-xs">{label}</span>
    <span className="text-slate-100 font-semibold">{value}</span>
  </div>
);

const Divider = () => <div className="h-px w-full bg-white/10" />;

// ---------- Main Page ----------
export default function ProblemSolvePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [problem, setProblem] = useState(null);

  const [language, setLanguage] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState("// loading...");

  const [activeTab, setActiveTab] = useState("description");
  const [activeRightTab, setActiveRightTab] = useState("");

  const [useCustomInput, setUseCustomInput] = useState(false);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [customInput, setCustomInput] = useState("");

  const [runLoading, setRunLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [submissionHistory, setSubmissionHistory] = useState([]);

  // Popup state for showing code
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [popupCode, setPopupCode] = useState("");
  const [popupLang, setPopupLang] = useState("");

  // 🔥 Function to open popup
  const openCodePopup = (code, lang) => {
    setPopupCode(code);
    setPopupLang(lang);
    setShowCodePopup(true);
  };

  // ---- Fetch problem by id ----
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosClient.get(`/problem/oneProblem/${id}`);
        if (ignore) return;
        const p = res.data?.data || res.data || null;
        setProblem(p);
        // init language & code from startCode array
        const defaultLang = p?.startCode?.[0]?.language || "javascript";
        const defaultCode =
          p?.startCode?.find((sc) => sc.language === defaultLang)
            ?.initialCode || "";
        setLanguage(defaultLang);
        setCode(defaultCode);
      } catch (e) {
        console.error(e);
        setError(
          e?.response?.data?.message || e?.message || "Failed to load problem."
        );
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [id]);

  //////////////////////////

  const languages = useMemo(
    () => problem?.startCode?.map((s) => s.language) || [],
    [problem]
  );

  const visibleCases = problem?.visibleTestCases || [];

  useEffect(() => {
    // when language changes, load its starter code (if any)
    if (!problem) return;
    const sc = problem.startCode?.find((s) => s.language === language);
    if (sc?.initialCode) setCode(sc.initialCode);
  }, [language]);

  const onRun = useCallback(async () => {
    try {
      setRunLoading(true);
      setRunResult(null);
      setSubmitMsg("");
      const stdin = useCustomInput
        ? customInput
        : visibleCases?.[selectedCaseIdx]?.input || "";
      const res = await axiosClient.post(`/submission/runProblem/${id}`, {
        language,
        code,
      });
      setRunResult(res.data);
    } catch (e) {
      setRunResult({
        error: e?.response?.data?.message || e?.message || "Run failed",
      });
    } finally {
      setRunLoading(false);
    }
  }, [
    language,
    code,
    useCustomInput,
    customInput,
    selectedCaseIdx,
    visibleCases,
  ]);

  useEffect(() => {
    const fetchSubmissionHistory = async () => {
      try {
        const { data } = await axiosClient.get(`/problem/getSubmission/${id}`);
        setSubmissionHistory(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    // ✅ call the async function
    if (id) fetchSubmissionHistory();
  }, [id]);

  const onSubmit = useCallback(async () => {
    try {
      setSubmitLoading(true);
      setSubmitMsg("");
      const res = await axiosClient.post(`/submission/submitProblem/${id}`, {
        language,
        code,
      });
      setSubmitResult(res.data);
      const msg = res?.data?.message || "Submitted!";
      setSubmitMsg(msg);
      // optionally navigate to a submissions page
      // navigate(`/problems/${id}/submissions`)
    } catch (e) {
      setSubmitMsg(e?.response?.data?.message || e?.message || "Submit failed");
    } finally {
      setSubmitLoading(false);
    }
  }, [problem?._id, id, language, code]);

  const acceptanceRate = useMemo(() => {
    const ac = problem?.acceptSubmissionsCount || 0;
    const total = problem?.submissionsCount || 0;
    if (!total) return "—";
    return `${Math.round((ac / total) * 100)}%`;
  }, [problem]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-slate-200 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading problem…</div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-slate-200 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white/5 p-6 rounded-2xl ring-1 ring-white/10">
          <h1 className="text-xl font-semibold mb-2">Couldn’t load problem</h1>
          <p className="text-slate-400 mb-4">{error || "Unknown error"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-slate-300 px-4">
      {/* Header */}
      <div className="border-b border-white/10 ">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl bg-white/5 hover:bg-white/10 px-3 py-1 text-sm"
            >
              <ArrowLeft />
            </button>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <Stat label="Acceptance" value={acceptanceRate} />
            <Stat label="Submissions" value={problem.submissionsCount || 0} />
          </div>
        </div>
      </div>

      {/* 🔥 Popup Modal for Source Code */}
      {showCodePopup && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] rounded-2xl p-4 w-full max-w-3xl ring-1 ring-white/10 relative">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-slate-100">
                Source Code ({popupLang})
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(popupCode);
                  }}
                  className="text-sm text-slate-300 hover:text-white px-3 py-1 rounded-lg bg-white/10"
                >
                  Copy
                </button>
                <button
                  onClick={() => setShowCodePopup(false)}
                  className="text-sm text-slate-300 hover:text-white px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/40"
                >
                  Close
                </button>
              </div>
            </div>
            <pre className="bg-black/40 rounded-xl p-4 overflow-x-auto max-h-[70vh] text-sm text-slate-200">
              <code>{popupCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Body */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mx-auto max-w-7xl  py-6 grid grid-cols-1 lg:grid-cols-[40%_60%] gap-2 "
      >
        {/* Left: Problem details */}

        <div className="space-y-4 h-[100vh] overflow-auto rounded-2xl  ring-1 ring-white/10">
          <div className="bg-white/5 rounded-2xl px-4 pb-4">
            {/* Sticky Tabs */}

            <div className="sticky top-0 z-10 bg-black/5 backdrop-blur-sm -mx-4 px-2 pt-2 rounded-t-2xl">
              <div
                className="flex gap-2 text-sm overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40 transition-all duration-300"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "transparent transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.scrollbarColor =
                    "rgba(255,255,255,0.3) transparent";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.scrollbarColor =
                    "transparent transparent";
                }}
              >
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-3 py-2 rounded-xl shrink-0 ${
                    activeTab === "description"
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("editorial")}
                  className={`px-3 py-2 rounded-xl shrink-0 ${
                    activeTab === "editorial"
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  Editorial
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`px-3 py-2 rounded-xl shrink-0 ${
                    activeTab === "notes" ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  Notes
                </button>
                <button
                  onClick={() => setActiveTab("solutions")}
                  className={`px-3 py-2 rounded-xl shrink-0 ${
                    activeTab === "solutions"
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  Solution
                </button>
                <button
                  onClick={() => setActiveTab("submissions")}
                  className={`px-3 py-2 rounded-xl shrink-0 ${
                    activeTab === "submissions"
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  Submissions
                </button>
              </div>
              <Divider />
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none prose-pre:bg-transparent mt-4  ">
              {activeTab === "description" && (
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 my-3">
                    {(problem.tags || []).map((t, i) => (
                      <Pill
                        key={i}
                        className="bg-sky-500/15 text-sky-300 ring-sky-500/30"
                      >
                        #{t}
                      </Pill>
                    ))}
                  </div>

                  <div className="my-4 flex items-center gap-3">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                      {problem.title}
                    </h1>
                    <DifficultyBadge level={problem.difficulty} />
                  </div>

                  <div className="my-4 font-bold">
                    <ReactMarkdown>
                      {problem?.description || "No description"}
                    </ReactMarkdown>
                  </div>

                  {/* Examples */}
                  <div className="space-y-4">
                    {(problem.visibleTestCases || []).map((tc, i) => (
                      <div key={i}>
                        <div className="text-white text-md mb-1">
                          Example {i + 1}
                        </div>
                        <pre className="text-xs overflow-auto px-3">
                          <code>Input: {tc.input}</code>
                        </pre>
                        <pre className="text-xs overflow-auto px-3">
                          <code>Output: {tc.output}</code>
                        </pre>
                        {tc.explanation && (
                          <div className="text-sm text-slate-300">
                            <span className="px-3 text-white">
                              Explanation:
                            </span>{" "}
                            {tc.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  <div className="mt-4">
                    <h1 className="font-semibold text-white">Constraints</h1>
                    <ul className="list-disc pl-6 space-y-1">
                      {(problem.constraints || []).map((c, i) => (
                        <li key={i} className="text-slate-300">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* This is for Notes  */}
              {activeTab === "notes" && (
                <div className="text-sm text-slate-300">
                  <Notes />
                </div>
              )}
              {/* This is for Editorial  */}
              {activeTab === "editorial" && (
                <div className="text-sm text-slate-300">
                  {problem.video ? (
                    <VideoPlayer videoUrl={problem.video} problem={problem} />
                  ) : (
                    <h1>
                      Editorial/Reference solutions are locked. Try solving
                      first! 🎯
                    </h1>
                  )}
                </div>
              )}

              {/* Chat with Ai code block  */}
              {activeTab === "chatAi" && (
                <div className="text-sm text-slate-300">
                  <ChatAi problem={problem} />
                </div>
              )}

              {/* This is for runResult and submitResult */}

              {/* Run Result  */}
              {activeTab === "testcase" && (
                <div className="flex-1 p-4 overflow-y-auto">
                  <h3 className="font-semibold mb-4">Test Results</h3>
                  {runResult ? (
                    <div
                      className={`alert ${
                        runResult.success ? "alert-success" : "alert-error"
                      } mb-4`}
                    >
                      <div>
                        {runResult.success === "Accepted" ? (
                          <div>
                            <h4 className="font-bold">
                              ✅ All test cases passed!
                            </h4>
                            <p className="text-sm mt-2">
                              Runtime: {runResult.runtime + " sec"}
                            </p>
                            <p className="text-sm">
                              Memory: {runResult.memory + " KB"}
                            </p>

                            <div className="mt-4 space-y-2">
                              {runResult.testCases.map((tc, i) => (
                                <div
                                  key={i}
                                  className="bg-base-100 p-3 rounded text-xs"
                                >
                                  <div className="font-mono">
                                    <div>
                                      <strong>Input:</strong> {tc.stdin}
                                    </div>
                                    <div>
                                      <strong>Expected:</strong>{" "}
                                      {tc.expected_output}
                                    </div>
                                    <div>
                                      <strong>Output:</strong> {tc.stdout}
                                    </div>
                                    <div className={"text-green-600"}>
                                      {"✓ Passed"}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-bold">
                              ❌ {runResult.success}
                            </h4>
                            <div className="mt-4 space-y-2">
                              {runResult.testCases.map((tc, i) => (
                                <div
                                  key={i}
                                  className="bg-base-100 p-3 rounded text-xs"
                                >
                                  <div className="font-mono">
                                    <div>
                                      <strong>Input:</strong> {tc.stdin}
                                    </div>
                                    <div>
                                      <strong>Expected:</strong>{" "}
                                      {tc.expected_output}
                                    </div>
                                    <div>
                                      <strong>Output:</strong> {tc.stdout}
                                    </div>
                                    <div
                                      className={
                                        tc.status_id == 3
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }
                                    >
                                      {tc.status_id == 3
                                        ? "✓ Passed"
                                        : "✗ Failed"}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      Click "Run" to test your code with the example test cases.
                    </div>
                  )}
                </div>
              )}

              {/* submitResult  */}
              {activeTab === "result" && (
                <div className="flex-1 p-4 overflow-y-auto">
                  <h3 className="font-semibold mb-4">Submission Result</h3>
                  {submitResult ? (
                    <div
                      className={`alert ${
                        submitResult.accepted ? "alert-success" : "alert-error"
                      }`}
                    >
                      <div>
                        {submitResult.accepted === "Accepted" ? (
                          <div>
                            <h4 className="font-bold text-lg">🎉 Accepted</h4>
                            <div className="mt-4 space-y-2">
                              <p>
                                Test Cases Passed:{" "}
                                {submitResult.totalPassedTessCases}/
                                {submitResult.totalTestCases}
                              </p>
                              <p>Runtime: {submitResult.runTime + " sec"}</p>
                              <p>Memory: {submitResult.memory + "KB"} </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-bold text-lg">
                              ❌ {submitResult.accepted}
                            </h4>
                            <div className="mt-4 space-y-2">
                              <p>
                                Test Cases Passed:{" "}
                                {submitResult.totalPassedTessCases}/
                                {submitResult.totalTestCases}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      Click "Submit" to submit your solution for evaluation.
                    </div>
                  )}
                </div>
              )}

              {activeTab === "solutions" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Solutions</h2>
                  <div className="space-y-6">
                    {problem.referenceSolution?.map((solution, index) => (
                      <div
                        key={index}
                        className="ring-1 ring-white/10 rounded-lg"
                      >
                        {/* Header with Copy Button */}
                        <div className="bg-black/20 px-4 py-2 flex justify-between items-center rounded-t-lg">
                          <h3 className="font-semibold">
                            {problem?.title} - {solution?.language}
                          </h3>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                solution?.completeCode || ""
                              );
                            }}
                            className="p-1 rounded hover:bg-white/10"
                            title="Copy code"
                          >
                            <Copy className="w-4 h-4 text-slate-300 hover:text-white" />
                          </button>
                        </div>

                        {/* Code Block */}
                        <div className="p-4 bg-black/20">
                          <pre className="bg-white/5 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{solution?.completeCode}</code>
                          </pre>
                        </div>
                      </div>
                    )) || (
                      <p className="text-gray-500">
                        Solutions will be available after you solve the problem.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "submissions" && (
                <div>
                  {/* <h2 className="text-xl font-bold mb-4">My Submissions</h2> */}

                  {/* 🔥 Show loading or empty state */}
                  {submissionHistory?.length === 0 ? (
                    <div className="text-gray-500">
                      <h1>You haven’t made any submissions yet.</h1>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-white/10 text-sm rounded-xl">
                        <thead className="bg-white/10 text-slate-300 uppercase text-xs">
                          <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Runtime</th>
                            <th className="px-4 py-2 text-left">Language</th>
                            <th className="px-4 py-2 text-left">
                              Submission Date
                            </th>
                            <th className="px-4 py-2 text-left">Source</th>
                          </tr>
                        </thead>

                        <tbody>
                          {Array.isArray(submissionHistory) &&
                          submissionHistory.length > 0 ? (
                            submissionHistory.map((sub, index) => (
                              <tr
                                key={sub._id}
                                className={`${
                                  index % 2 === 0
                                    ? "bg-[#353535]/60"
                                    : "bg-black"
                                } hover:bg-white/10 transition`}
                              >
                                <td className="px-4 py-2">{index + 1}</td>

                                <td
                                  className={`px-4 py-2 font-semibold ${
                                    sub.status === "Accepted"
                                      ? "text-green-400"
                                      : "text-red-500"
                                  }`}
                                >
                                  {sub.status}
                                </td>

                                <td className="px-4 py-2">
                                  {sub.runTime ? `${sub.runTime} sec` : "—"}
                                </td>

                                <td className="px-4 py-2">{sub.language}</td>

                                <td className="px-4 py-2">
                                  {sub.createdAt?.slice(0, 10)}
                                </td>

                                <td className="px-4 py-2">
                                  <button
                                    onClick={() =>
                                      openCodePopup(
                                        sub.sourceCode,
                                        sub.language
                                      )
                                    }
                                    className="p-1 rounded hover:bg-white/10"
                                  >
                                    <Copy className="w-4 h-4 text-slate-300 hover:text-white" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            ''
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Editor */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl ring-1 ring-white/10 overflow-hidden">
            <div className="p-2 flex flex-wrap items-center gap-3 border-b border-white/10">
              <div className="flex items-center gap-2 ">
                {/* <label className="text-xs text-slate-300">Language</label> */}
                <select
                  className="bg-black/30 rounded-lg px-2 py-1 text-sm outline-none ring-1 ring-white/10"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                {/* <label className="text-xs text-slate-400">Theme</label> */}
                <select
                  className="bg-black/30 rounded-lg px-2 py-1 text-sm outline-none ring-1 ring-white/10"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="vs-dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              {/* run Result and submit result */}
              <div className="ml-auto flex gap-2">
                <button
                  className={`tab ${
                    activeRightTab === "testcase" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("testcase")}
                >
                  runResult
                </button>
                <button
                  className={`px-3 py-2 rounded-xl shrink-0  ${
                    activeRightTab === "result"
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                  onClick={() => setActiveTab("result")}
                >
                  submitResult
                </button>

                <button
                  onClick={() => setActiveTab("chatAi")}
                  className={`px-3 py-2 rounded-xl shrink-0 ${
                    activeTab === "chatAi" ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  Chat Assistant
                </button>
              </div>

              <div className="ml-auto flex gap-2">
                <button
                  onClick={onRun}
                  disabled={runLoading}
                  className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-sm"
                >
                  {runLoading ? "Running…" : "Run"}
                </button>
                <button
                  onClick={onSubmit}
                  disabled={submitLoading}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-sm"
                >
                  {submitLoading ? "Submitting…" : "Submit"}
                </button>
              </div>
            </div>
            <div className="h-[54vh]">
              <Editor
                height="100%"
                language={mapMonacoLanguage(language)}
                theme={theme}
                value={code}
                onChange={(val) => setCode(val ?? "")}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* IO Panel */}
          <div className="bg-white/5 rounded-2xl ring-1 ring-white/10 p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                  checked={useCustomInput}
                  onChange={(e) => setUseCustomInput(e.target.checked)}
                />
                Use custom input
              </label>
              {!useCustomInput && (
                <>
                  <span className="text-slate-400 text-sm">Test case:</span>
                  <select
                    className="bg-black/30 rounded-lg px-2 py-1 text-sm outline-none ring-1 ring-white/10"
                    value={selectedCaseIdx}
                    onChange={(e) => setSelectedCaseIdx(Number(e.target.value))}
                  >
                    {visibleCases.map((_, i) => (
                      <option key={i} value={i}>
                        Test {i + 1}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">Input</div>
              <textarea
                className="w-full min-h-[60px] bg-black/30 rounded-xl p-3 text-sm outline-none ring-1 ring-white/10"
                value={
                  useCustomInput
                    ? customInput
                    : visibleCases?.[selectedCaseIdx]?.input || ""
                }
                onChange={(e) =>
                  useCustomInput && setCustomInput(e.target.value)
                }
                disabled={!useCustomInput}
              />
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">Output</div>
              <pre className="w-full min-h-[60px] bg-black/30 rounded-xl p-3 text-sm overflow-auto ring-1 ring-white/10">
                {runResult ? (
                  renderRunResult(runResult)
                ) : (
                  <span className="text-slate-500">Run to see output…</span>
                )}
              </pre>
            </div>

            {!!submitMsg && (
              <div className="text-sm text-slate-300">{submitMsg}</div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="py-6" />
    </div>
  );
}

// ---------- Helpers ----------
function renderRunResult(result) {
  if (!result) return null;
  if (result.error)
    return <span className="text-rose-300">{String(result.error)}</span>;
  const stdout = result.stdout ?? result.output ?? "";
  const stderr = result.stderr ?? "";
  const time = result.time ?? result.executionTime ?? result.cpuTime;
  const memory = result.memory ?? result.memoryUsed;
  return (
    <div className="space-y-2">
      {stdout && (
        <div>
          <div className="text-xs text-slate-400">Stdout</div>
          <code className="block whitespace-pre-wrap">{stdout}</code>
        </div>
      )}
      {stderr && (
        <div>
          <div className="text-xs text-slate-400">Stderr</div>
          <code className="block whitespace-pre-wrap text-amber-300/90">
            {stderr}
          </code>
        </div>
      )}
      {(time || memory) && (
        <div className="text-xs text-slate-400">
          {time ? `Time: ${time}ms` : ""}{" "}
          {memory ? `• Memory: ${memory}KB` : ""}
        </div>
      )}
    </div>
  );
}

function mapMonacoLanguage(lang) {
  const l = (lang || "").toLowerCase();
  if (l.includes("typescript")) return "typescript";
  if (l.includes("javascript") || l === "js") return "javascript";
  if (l.includes("python") || l === "py") return "python";
  if (l.includes("cpp") || l.includes("c++")) return "cpp";
  if (l === "c") return "c";
  if (l.includes("java")) return "java";
  if (l.includes("go")) return "go";
  if (l.includes("rust")) return "rust";
  if (l.includes("php")) return "php";
  if (l.includes("ruby")) return "ruby";
  return "javascript";
}
