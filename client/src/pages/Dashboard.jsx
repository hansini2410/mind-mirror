import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaMoon,
  FaBookOpen,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://mindmirror-backend-hit3.onrender.com/api";

function Dashboard() {
  const navigate = useNavigate();

  const userData = JSON.parse(
    localStorage.getItem("mindmirrorUser") ||
      "null"
  );

  const userName =
    userData?.user?.name || "User";

  const [results, setResults] =
    useState([]);

  const [moodHistory, setMoodHistory] =
    useState([]);

  const [myContributions, setMyContributions] =
    useState([]);

  const [
    myBlogContributions,
    setMyBlogContributions,
  ] = useState([]);

  const [selectedMood, setSelectedMood] =
    useState("");

  const [intensity, setIntensity] =
    useState(5);

  const [note, setNote] =
    useState("");

  const [moodLoading, setMoodLoading] =
    useState(false);

  const [moodMessage, setMoodMessage] =
    useState("");

useEffect(() => {
  window.scrollTo(0, 0);

  const user = localStorage.getItem(
    "mindmirrorUser"
  );

  if (!user) {
    navigate("/login");
    return;
  }

  fetchResults();
  fetchMoods();
  fetchMyContributions();

  /*
    Blog contribution API is not available in your backend yet.
    So we are not calling:
    /api/blogs/my-contributions
    because it gives 404.
  */
  setMyBlogContributions([]);
}, []);

  const getAuthHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    };
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/results`,
        getAuthHeaders()
      );

      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoods = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/moods`,
        getAuthHeaders()
      );

      setMoodHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyContributions = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/quizzes/my-contributions`,
        getAuthHeaders()
      );

      setMyContributions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveMood = async () => {
    if (!selectedMood) {
      setMoodMessage(
        "Please choose how you feel before saving."
      );

      return;
    }

    try {
      setMoodLoading(true);

      setMoodMessage("");

      const response = await axios.post(
        `${API_BASE_URL}/moods`,
        {
          mood: selectedMood,
          intensity: Number(intensity),
          note,
        },
        getAuthHeaders()
      );

      setMoodHistory([
        response.data,
        ...moodHistory,
      ]);

      setMoodMessage(
        "Your emotional check-in has been saved."
      );

      setNote("");

      setIntensity(5);

      setSelectedMood("");
    } catch (error) {
      console.log(error);

      setMoodMessage(
        "Unable to save your mood right now. Please try again."
      );
    } finally {
      setMoodLoading(false);
    }
  };

  const getMoodSummary = () => {
    if (moodHistory.length === 0) {
      return {
        averageIntensity: null,
        mostFrequentMood: null,
        totalCheckIns: 0,
        insight:
          "Your emotional pattern summary will appear once you begin saving mood check-ins.",
      };
    }

    const totalIntensity =
      moodHistory.reduce(
        (total, item) =>
          total +
          Number(item.intensity || 0),
        0
      );

    const averageIntensity = (
      totalIntensity / moodHistory.length
    ).toFixed(1);

    const moodCounts = {};

    moodHistory.forEach((item) => {
      moodCounts[item.mood] =
        (moodCounts[item.mood] || 0) + 1;
    });

    const mostFrequentMood =
      Object.keys(moodCounts).sort(
        (a, b) =>
          moodCounts[b] - moodCounts[a]
      )[0];

    let insight =
      "Your recent emotional check-ins show a developing pattern of self-awareness.";

    if (averageIntensity <= 3) {
      insight =
        "Your recent check-ins suggest a calmer emotional pattern with lower intensity levels.";
    } else if (averageIntensity <= 6) {
      insight =
        "Your recent check-ins show a moderate emotional rhythm. You may be moving between calm and active emotional states.";
    } else {
      insight =
        "Your recent check-ins suggest higher emotional intensity. Gentle recovery, reflection, and grounding may help.";
    }

    return {
      averageIntensity,
      mostFrequentMood,
      totalCheckIns: moodHistory.length,
      insight,
    };
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

  const moodSummary = getMoodSummary();

  const sections = [
    {
      title: "Reflection History",

      description:
        "Your completed assessments and emotional reflections will appear here as you continue exploring MindMirror.",

      icon: <FaBrain />,
    },

    {
      title: "Saved Psychology Insights",

      description:
        "Articles and emotional wellness insights you save will be collected in your personal library.",

      icon: <FaBookOpen />,
    },

    {
      title: "Mood Check-Ins",

      description:
        "Your emotional check-ins and wellness patterns will gradually build over time.",

      icon: <FaHeart />,
    },
  ];

  const moods = [
    "Peaceful",
    "Motivated",
    "Calm",
    "Overwhelmed",
    "Anxious",
    "Tired",
  ];

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        fontFamily:
          "Poppins, sans-serif",

        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-6 py-3 rounded-full mb-8 backdrop-blur-xl">
            <FaMoon className="text-cyan-300" />

            <p className="uppercase tracking-[0.3em] text-cyan-200 text-sm">
              Your Emotional Space
            </p>
          </div>

          <h1 className="text-7xl font-bold leading-tight mb-8">
            Welcome back,
            <br />

            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>

          <p className="text-slate-300 text-2xl leading-[2] max-w-4xl">
            Your personal emotional wellness
            space will evolve naturally as
            you explore assessments,
            reflections, and psychology
            insights over time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
              }}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[36px] p-10 shadow-2xl"
            >
              <div className="bg-cyan-500/20 w-20 h-20 rounded-3xl flex items-center justify-center text-4xl text-cyan-300 mb-8">
                {section.icon}
              </div>

              <h2 className="text-3xl font-bold mb-6 leading-tight">
                {section.title}
              </h2>

              <p className="text-slate-300 text-lg leading-9">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mb-20">
          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl">
            <h2 className="text-5xl font-bold mb-6">
              Daily Emotional Check-In
            </h2>

            <p className="text-slate-300 text-xl leading-[2] mb-10">
              Choose how you feel, rate the
              intensity, and optionally leave
              a small reflection for yourself.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {moods.map((mood) => (
                <motion.button
                  key={mood}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() => {
                    setSelectedMood(mood);
                    setMoodMessage("");
                  }}
                  className={`p-6 rounded-3xl border transition text-xl font-medium ${
                    selectedMood === mood
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                      : "bg-white/5 border-white/10 hover:bg-cyan-500/10"
                  }`}
                >
                  {mood}
                </motion.button>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-bold">
                  Emotional Intensity
                </h3>

                <p className="text-cyan-300 text-xl font-semibold">
                  {intensity}/10
                </p>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) =>
                  setIntensity(e.target.value)
                }
                className="w-full accent-cyan-400"
              />
            </div>

            <textarea
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Optional reflection note..."
              className="w-full min-h-[140px] bg-white/5 border border-white/10 rounded-3xl p-6 text-lg text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 transition mb-8"
            ></textarea>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={saveMood}
              disabled={moodLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-3xl text-xl font-semibold shadow-2xl shadow-blue-500/20 disabled:opacity-60"
            >
              {moodLoading
                ? "Saving Emotional Check-In..."
                : "Save Emotional Check-In"}
            </motion.button>

            {moodMessage && (
              <p className="mt-8 text-cyan-300 text-lg">
                {moodMessage}
              </p>
            )}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-10">
            Mood Pattern Summary
          </h2>

          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl">
            {moodHistory.length === 0 ? (
              <p className="text-slate-300 text-xl leading-[2]">
                {moodSummary.insight}
              </p>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <motion.div
                    whileHover={{
                      y: -6,
                    }}
                    className="bg-white/5 border border-white/10 rounded-[32px] p-8"
                  >
                    <div className="bg-cyan-500/20 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl text-cyan-300 mb-6">
                      <FaChartLine />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                      Average Intensity
                    </h3>

                    <p className="text-cyan-300 text-4xl font-bold">
                      {moodSummary.averageIntensity}/10
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      y: -6,
                    }}
                    className="bg-white/5 border border-white/10 rounded-[32px] p-8"
                  >
                    <div className="bg-cyan-500/20 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl text-cyan-300 mb-6">
                      <FaHeart />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                      Most Frequent Mood
                    </h3>

                    <p className="text-cyan-300 text-4xl font-bold">
                      {moodSummary.mostFrequentMood}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      y: -6,
                    }}
                    className="bg-white/5 border border-white/10 rounded-[32px] p-8"
                  >
                    <div className="bg-cyan-500/20 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl text-cyan-300 mb-6">
                      <FaMoon />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                      Total Check-Ins
                    </h3>

                    <p className="text-cyan-300 text-4xl font-bold">
                      {moodSummary.totalCheckIns}
                    </p>
                  </motion.div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8">
                  <h3 className="text-3xl font-bold mb-5">
                    Emotional Insight
                  </h3>

                  <p className="text-slate-300 text-xl leading-[2]">
                    {moodSummary.insight}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-10">
            My Quiz Contributions
          </h2>

          {myContributions.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12">
              <p className="text-slate-300 text-xl leading-[2]">
                Quizzes you contribute to
                MindMirror will appear here
                with their review status.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {myContributions.map((quiz) => (
                <motion.div
                  key={quiz._id}
                  whileHover={{
                    y: -6,
                  }}
                  className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[36px] p-10 shadow-2xl"
                >
                  <div className="flex items-center justify-between gap-5 mb-6">
                    <div className="bg-cyan-500/20 w-20 h-20 rounded-3xl flex items-center justify-center text-4xl text-cyan-300">
                      <FaBrain />
                    </div>

                    <span
                      className={`px-5 py-2 rounded-full border text-sm font-semibold ${getStatusStyle(
                        quiz.status
                      )}`}
                    >
                      {quiz.status ||
                        "under review"}
                    </span>
                  </div>

                  <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm mb-4">
                    {quiz.category ||
                      "Self Awareness"}
                  </p>

                  <h3 className="text-3xl font-bold mb-4">
                    {quiz.title}
                  </h3>

                  <p className="text-slate-300 leading-8 mb-6">
                    {quiz.description}
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
                    <p className="text-slate-300">
                      Questions submitted:{" "}
                      {quiz.questions?.length || 0}
                    </p>
                  </div>

                  {quiz.feedback && (
                    <div className="bg-red-500/10 border border-red-400/20 rounded-3xl p-6">
                      <h4 className="text-red-300 font-semibold mb-3">
                        Admin Feedback
                      </h4>

                      <p className="text-slate-300 leading-8">
                        {quiz.feedback}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-10">
            My Blog Contributions
          </h2>

          {myBlogContributions.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12">
              <p className="text-slate-300 text-xl leading-[2]">
                Blog resources you contribute
                to MindMirror will appear here
                after the blog contribution API
                is added to the backend.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {myBlogContributions.map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{
                    y: -6,
                  }}
                  className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[36px] p-10 shadow-2xl"
                >
                  <div className="flex items-center justify-between gap-5 mb-6">
                    <div className="bg-cyan-500/20 w-20 h-20 rounded-3xl flex items-center justify-center text-4xl text-cyan-300">
                      <FaBookOpen />
                    </div>

                    <span
                      className={`px-5 py-2 rounded-full border text-sm font-semibold ${getStatusStyle(
                        blog.status
                      )}`}
                    >
                      {blog.status ||
                        "under review"}
                    </span>
                  </div>

                  <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm mb-4">
                    {blog.category ||
                      "Psychology"}
                  </p>

                  <h3 className="text-3xl font-bold mb-4">
                    {blog.title}
                  </h3>

                  <p className="text-slate-300 leading-8 mb-6">
                    {blog.description}
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
                    <p className="text-slate-300 mb-3">
                      Source:{" "}
                      <span className="text-cyan-300">
                        {blog.sourceName ||
                          "Community Suggested Resource"}
                      </span>
                    </p>

                    {blog.sourceUrl && (
                      <a
                        href={blog.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-300 underline break-all"
                      >
                        View submitted blog link
                      </a>
                    )}
                  </div>

                  {blog.feedback && (
                    <div className="bg-red-500/10 border border-red-400/20 rounded-3xl p-6">
                      <h4 className="text-red-300 font-semibold mb-3">
                        Admin Feedback
                      </h4>

                      <p className="text-slate-300 leading-8">
                        {blog.feedback}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-10">
            Recent Mood Check-Ins
          </h2>

          {moodHistory.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12">
              <p className="text-slate-300 text-xl leading-[2]">
                Your mood check-ins will
                appear here once you begin
                saving daily emotional
                reflections.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {moodHistory
                .slice(0, 6)
                .map((item) => (
                  <motion.div
                    key={item._id}
                    whileHover={{
                      y: -6,
                    }}
                    className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[36px] p-8 shadow-2xl"
                  >
                    <div className="bg-cyan-500/20 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl text-cyan-300 mb-6">
                      <FaHeart />
                    </div>

                    <h3 className="text-3xl font-bold mb-4">
                      {item.mood}
                    </h3>

                    <p className="text-slate-300 mb-4">
                      Intensity:{" "}
                      {item.intensity}/10
                    </p>

                    {item.note && (
                      <p className="text-slate-300 leading-8 mb-5">
                        “{item.note}”
                      </p>
                    )}

                    <p className="text-slate-400">
                      Saved on{" "}
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
            </div>
          )}
        </div>

        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-10">
            Your Reflections
          </h2>

          {results.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12">
              <p className="text-slate-300 text-xl leading-[2]">
                Your reflections will begin
                appearing here as you complete
                emotional assessments and
                explore MindMirror.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {results.map((result) => (
                <motion.div
                  whileHover={{
                    y: -6,
                  }}
                  key={result._id}
                  className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[36px] p-10 shadow-2xl"
                >
                  <div className="bg-cyan-500/20 w-20 h-20 rounded-3xl flex items-center justify-center text-4xl text-cyan-300 mb-8">
                    <FaBrain />
                  </div>

                  <h3 className="text-3xl font-bold mb-4">
                    {result.quizTitle}
                  </h3>

                  <p className="text-cyan-300 text-lg mb-6">
                    {result.evaluation}
                  </p>

                  <p className="text-slate-400 mb-8">
                    Completed on{" "}
                    {new Date(
                      result.completedAt
                    ).toLocaleDateString()}
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <p className="text-slate-300 leading-8">
                      Emotional reflection
                      score: {result.score}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;