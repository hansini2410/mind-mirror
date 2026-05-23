import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaCheck,
  FaTimes,
  FaUserShield,
  FaTrash,
  FaList,
  FaBookOpen,
  FaExternalLinkAlt,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mindmirror-backend-hit3.onrender.com/api";

function AdminDashboard() {
  const userData = JSON.parse(
    localStorage.getItem("mindmirrorUser") || "null"
  );

  const [pendingQuizzes, setPendingQuizzes] = useState([]);

  const [allCommunityQuizzes, setAllCommunityQuizzes] =
    useState([]);

  const [pendingBlogs, setPendingBlogs] = useState([]);

  const [allCommunityBlogs, setAllCommunityBlogs] =
    useState([]);

  const [contentType, setContentType] = useState("quiz");

  const [activeTab, setActiveTab] = useState("pending");

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    refreshAdminData();
  }, []);

  const getAuthHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    };
  };

  const refreshAdminData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchPendingQuizzes(),
        fetchAllCommunityQuizzes(),
        fetchPendingBlogs(),
        fetchAllCommunityBlogs(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingQuizzes = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/quizzes/admin/pending`,
        getAuthHeaders()
      );

      setPendingQuizzes(response.data);
    } catch (error) {
      console.log(error);

      setMessage("Unable to load pending quizzes.");
    }
  };

  const fetchAllCommunityQuizzes = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/quizzes/admin/all`,
        getAuthHeaders()
      );

      setAllCommunityQuizzes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/blogs/admin/pending`,
        getAuthHeaders()
      );

      setPendingBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCommunityBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/blogs/admin/all`,
        getAuthHeaders()
      );

      setAllCommunityBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveQuiz = async (quizId) => {
    try {
      await axios.put(
        `${API_URL}/quizzes/admin/${quizId}/approve`,
        {},
        getAuthHeaders()
      );

      setMessage(
        "Quiz approved successfully. It is now visible in the assessment library."
      );

      refreshAdminData();
    } catch (error) {
      console.log(error);

      setMessage("Unable to approve quiz.");
    }
  };

  const rejectQuiz = async (quizId) => {
    try {
      await axios.put(
        `${API_URL}/quizzes/admin/${quizId}/reject`,
        {
          feedback:
            feedback[quizId] || "This quiz needs improvement.",
        },
        getAuthHeaders()
      );

      setMessage("Quiz rejected successfully.");

      refreshAdminData();
    } catch (error) {
      console.log(error);

      setMessage("Unable to reject quiz.");
    }
  };

  const deleteQuiz = async (quizId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this community-created quiz? This cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/quizzes/admin/${quizId}`,
        getAuthHeaders()
      );

      setMessage("Community quiz deleted successfully.");

      refreshAdminData();
    } catch (error) {
      console.log(error);

      setMessage("Unable to delete quiz.");
    }
  };

  const approveBlog = async (blogId) => {
    try {
      await axios.put(
        `${API_URL}/blogs/admin/${blogId}/approve`,
        {},
        getAuthHeaders()
      );

      setMessage(
        "Blog approved successfully. It is now visible in the psychology library."
      );

      refreshAdminData();
    } catch (error) {
      console.log(error);

      setMessage("Unable to approve blog.");
    }
  };

  const rejectBlog = async (blogId) => {
    try {
      await axios.put(
        `${API_URL}/blogs/admin/${blogId}/reject`,
        {
          feedback:
            feedback[blogId] ||
            "This blog resource needs improvement.",
        },
        getAuthHeaders()
      );

      setMessage("Blog rejected successfully.");

      refreshAdminData();
    } catch (error) {
      console.log(error);

      setMessage("Unable to reject blog.");
    }
  };

  const deleteBlog = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this community-created blog resource? This cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/blogs/admin/${blogId}`,
        getAuthHeaders()
      );

      setMessage("Community blog deleted successfully.");

      refreshAdminData();
    } catch (error) {
      console.log(error);

      setMessage("Unable to delete blog.");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "approved") {
      return "bg-green-500/10 border-green-400/30 text-green-300";
    }

    if (status === "rejected") {
      return "bg-red-500/10 border-red-400/30 text-red-300";
    }

    return "bg-yellow-500/10 border-yellow-400/30 text-yellow-300";
  };

  const renderQuizCard = (quiz, showReviewButtons) => {
    return (
      <motion.div
        key={quiz._id}
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-10 shadow-2xl"
      >
        <div className="flex items-start gap-6 mb-8">
          <div className="bg-cyan-500/20 w-20 h-20 rounded-3xl flex items-center justify-center text-4xl text-cyan-300">
            <FaBrain />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm">
                {quiz.category || "Self Awareness"}
              </p>

              <span
                className={`px-4 py-2 rounded-full text-sm border ${getStatusStyle(
                  quiz.status
                )}`}
              >
                {quiz.status || "under review"}
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-4">
              {quiz.title}
            </h2>

            <p className="text-slate-300 text-xl leading-9">
              {quiz.description}
            </p>

            <div className="mt-5 space-y-2">
              <p className="text-slate-400">
                Questions: {quiz.questions?.length || 0}
              </p>

              <p className="text-slate-400">
                Submitted by:{" "}
                {quiz.submittedBy?.name || "Unknown User"}
              </p>

              {quiz.feedback && (
                <p className="text-red-300">
                  Feedback: {quiz.feedback}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {quiz.questions?.map((questionItem, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {index + 1}. {questionItem.question}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {questionItem.options?.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="bg-slate-950/40 border border-white/10 rounded-2xl p-4"
                  >
                    <p className="text-slate-200">
                      {option.text}
                    </p>

                    <p className="text-cyan-300 text-sm mt-2">
                      Score: {option.score}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {showReviewButtons && (
          <textarea
            value={feedback[quiz._id] || ""}
            onChange={(e) =>
              setFeedback({
                ...feedback,
                [quiz._id]: e.target.value,
              })
            }
            placeholder="Optional feedback if rejecting this quiz..."
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white mb-6"
          ></textarea>
        )}

        <div className="flex flex-wrap gap-5">
          {showReviewButtons && (
            <>
              <button
                onClick={() => approveQuiz(quiz._id)}
                className="bg-green-500/20 border border-green-400/30 text-green-300 px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-green-500/30 transition font-semibold"
              >
                <FaCheck />
                Approve
              </button>

              <button
                onClick={() => rejectQuiz(quiz._id)}
                className="bg-red-500/20 border border-red-400/30 text-red-300 px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-red-500/30 transition font-semibold"
              >
                <FaTimes />
                Reject
              </button>
            </>
          )}

          <button
            onClick={() => deleteQuiz(quiz._id)}
            className="bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-red-500/20 hover:border-red-400/30 hover:text-red-300 transition font-semibold"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </motion.div>
    );
  };

  const renderBlogCard = (blog, showReviewButtons) => {
    return (
      <motion.div
        key={blog._id}
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-10 shadow-2xl"
      >
        <div className="flex items-start gap-6 mb-8">
          <div className="bg-cyan-500/20 w-20 h-20 rounded-3xl flex items-center justify-center text-4xl text-cyan-300">
            <FaBookOpen />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm">
                {blog.category || "Psychology"}
              </p>

              <span
                className={`px-4 py-2 rounded-full text-sm border ${getStatusStyle(
                  blog.status
                )}`}
              >
                {blog.status || "under review"}
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-4">
              {blog.title}
            </h2>

            <p className="text-slate-300 text-xl leading-9 mb-5">
              {blog.description}
            </p>

            <div className="space-y-2">
              <p className="text-slate-400">
                Source:{" "}
                {blog.sourceName || "Community Resource"}
              </p>

              <p className="text-slate-400">
                Submitted by:{" "}
                {blog.submittedBy?.name || "Unknown User"}
              </p>

              {blog.feedback && (
                <p className="text-red-300">
                  Feedback: {blog.feedback}
                </p>
              )}
            </div>
          </div>
        </div>

        <a
          href={blog.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/30 transition mb-8"
        >
          <FaExternalLinkAlt />
          Open Blog Resource
        </a>

        {showReviewButtons && (
          <textarea
            value={feedback[blog._id] || ""}
            onChange={(e) =>
              setFeedback({
                ...feedback,
                [blog._id]: e.target.value,
              })
            }
            placeholder="Optional feedback if rejecting this blog..."
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white mb-6"
          ></textarea>
        )}

        <div className="flex flex-wrap gap-5">
          {showReviewButtons && (
            <>
              <button
                onClick={() => approveBlog(blog._id)}
                className="bg-green-500/20 border border-green-400/30 text-green-300 px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-green-500/30 transition font-semibold"
              >
                <FaCheck />
                Approve
              </button>

              <button
                onClick={() => rejectBlog(blog._id)}
                className="bg-red-500/20 border border-red-400/30 text-red-300 px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-red-500/30 transition font-semibold"
              >
                <FaTimes />
                Reject
              </button>
            </>
          )}

          <button
            onClick={() => deleteBlog(blog._id)}
            className="bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-red-500/20 hover:border-red-400/30 hover:text-red-300 transition font-semibold"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </motion.div>
    );
  };

  const itemsToShow =
    contentType === "quiz"
      ? activeTab === "pending"
        ? pendingQuizzes
        : allCommunityQuizzes
      : activeTab === "pending"
      ? pendingBlogs
      : allCommunityBlogs;

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        fontFamily: "Poppins, sans-serif",

        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-6 py-3 rounded-full mb-8 backdrop-blur-xl">
            <FaUserShield className="text-cyan-300" />

            <p className="uppercase tracking-[0.3em] text-cyan-200 text-sm">
              Admin Review Space
            </p>
          </div>

          <h1 className="text-7xl font-bold leading-tight mb-8">
            Review Community
            <br />

            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Discoveries
            </span>
          </h1>

          <p className="text-slate-300 text-2xl leading-[2] max-w-4xl">
            Approve, reject, review, or delete community
            quizzes and psychology blog resources before
            they become visible in MindMirror.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-5 mb-8">
          <button
            onClick={() => {
              setContentType("quiz");
              setMessage("");
            }}
            className={`px-7 py-4 rounded-2xl font-semibold flex items-center gap-3 transition ${
              contentType === "quiz"
                ? "bg-cyan-500/20 border border-cyan-400/30 text-cyan-200"
                : "bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <FaBrain />
            Quiz Submissions
          </button>

          <button
            onClick={() => {
              setContentType("blog");
              setMessage("");
            }}
            className={`px-7 py-4 rounded-2xl font-semibold flex items-center gap-3 transition ${
              contentType === "blog"
                ? "bg-cyan-500/20 border border-cyan-400/30 text-cyan-200"
                : "bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <FaBookOpen />
            Blog Submissions
          </button>
        </div>

        <div className="flex flex-wrap gap-5 mb-10">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-7 py-4 rounded-2xl font-semibold flex items-center gap-3 transition ${
              activeTab === "pending"
                ? "bg-cyan-500/20 border border-cyan-400/30 text-cyan-200"
                : "bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <FaUserShield />
            Pending Review
          </button>

          <button
            onClick={() => setActiveTab("all")}
            className={`px-7 py-4 rounded-2xl font-semibold flex items-center gap-3 transition ${
              activeTab === "all"
                ? "bg-cyan-500/20 border border-cyan-400/30 text-cyan-200"
                : "bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <FaList />
            All Community{" "}
            {contentType === "quiz" ? "Quizzes" : "Blogs"}
          </button>
        </div>

        {message && (
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 mb-10">
            <p className="text-cyan-200 text-lg">
              {message}
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-3xl text-slate-300">
            Loading submissions...
          </div>
        ) : itemsToShow.length === 0 ? (
          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">
              {activeTab === "pending"
                ? "No Pending Submissions"
                : contentType === "quiz"
                ? "No Community Quizzes Yet"
                : "No Community Blogs Yet"}
            </h2>

            <p className="text-slate-300 text-xl leading-[2]">
              {activeTab === "pending"
                ? "Community submissions that need review will appear here."
                : "Approved, rejected, and pending community submissions will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {itemsToShow.map((item) =>
              contentType === "quiz"
                ? renderQuizCard(item, activeTab === "pending")
                : renderBlogCard(item, activeTab === "pending")
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;