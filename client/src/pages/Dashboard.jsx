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
  FaCheckCircle,
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
        "Your emotional check-in has been saved. Your wellness plan is now based on this latest check-in."
      );

      setNote("");
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

  const getCheckInSupport = (
    mood = selectedMood,
    moodIntensity = intensity
  ) => {
    const level = Number(moodIntensity || 0);

    if (!mood) {
      return null;
    }

    if (mood === "Anxious") {
      return {
        title: "Anxiety Support Exercise",
        meaning:
          "An anxious mood may mean your mind is trying to prepare for something uncertain or stressful.",
        exercise:
          "Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 slow breath.",
        nextSteps:
          level >= 7
            ? "Your intensity is high, so pause before doing anything big. Sit down, breathe slowly, and speak to someone you trust if the feeling continues."
            : "Write down the thought that is worrying you and one small action you can take.",
      };
    }

    if (mood === "Overwhelmed") {
      return {
        title: "Overload Relief Exercise",
        meaning:
          "Feeling overwhelmed may mean too many thoughts, tasks, or emotions are happening at the same time.",
        exercise:
          "Do a brain dump. Write every task or thought on paper, then circle only one thing that needs attention first.",
        nextSteps:
          level >= 7
            ? "Do not try to solve everything at once. Choose only one small task and leave the rest for later."
            : "Take a 5-minute break, drink water, and return to one task slowly.",
      };
    }

    if (mood === "Tired") {
      return {
        title: "Rest and Recovery Exercise",
        meaning:
          "Tiredness may be physical, emotional, or mental. It can be a sign that your body needs recovery.",
        exercise:
          "Try a 10-minute reset: close your eyes, relax your shoulders, breathe slowly, and avoid scrolling during the break.",
        nextSteps:
          level >= 7
            ? "Reduce one unnecessary task today and try to sleep earlier if possible."
            : "Drink water, stretch gently, and take a short screen break.",
      };
    }

    if (mood === "Calm") {
      return {
        title: "Calmness Reflection",
        meaning:
          "A calm mood shows emotional balance. This is a good time to notice what helped you feel steady.",
        exercise:
          "Write one sentence about what helped you feel calm today.",
        nextSteps:
          "Try to repeat one habit that supported this calm feeling, such as rest, music, prayer, silence, walking, or talking to someone kind.",
      };
    }

    if (mood === "Peaceful") {
      return {
        title: "Peace Maintenance Exercise",
        meaning:
          "A peaceful mood shows that your mind may be feeling safe, settled, or relaxed.",
        exercise:
          "Take one quiet minute and notice your breathing. Let yourself enjoy the peaceful moment without rushing.",
        nextSteps:
          "Save what helped you feel peaceful today so you can repeat it on difficult days.",
      };
    }

    if (mood === "Motivated") {
      return {
        title: "Motivation Direction Exercise",
        meaning:
          "Motivation can be useful when it is directed clearly instead of being spent on too many things.",
        exercise:
          "Choose one useful task and set a 20-minute focus timer.",
        nextSteps:
          "Use your motivation for one meaningful action instead of trying to finish everything at once.",
      };
    }

    return {
      title: "General Wellness Support",
      meaning:
        "Your check-in helps you understand your emotional state better.",
      exercise:
        "Pause for one minute and name what you are feeling without judging it.",
      nextSteps:
        "Continue tracking your mood so MindMirror can show clearer emotional patterns over time.",
    };
  };

  const getPersonalWellnessPlan = () => {
    const activeMood =
      selectedMood || moodHistory[0]?.mood || "";

    const activeIntensity =
      selectedMood
        ? Number(intensity || 0)
        : Number(moodHistory[0]?.intensity || 0);

    if (activeMood === "Anxious") {
      return {
        title:
          activeIntensity >= 7
            ? "High Anxiety Care Plan"
            : "Anxiety Support Plan",
        description:
          "This plan is based on your latest anxious check-in. It focuses on calming the body, grounding the mind, and reducing worry.",
        actions: [
          "Try the 5-4-3-2-1 grounding exercise.",
          "Write down the thought that is making you anxious.",
          "Take three slow breaths before starting your next task.",
          activeIntensity >= 7
            ? "If the feeling continues strongly, talk to someone you trust."
            : "Choose one small action that is in your control.",
        ],
      };
    }

    if (activeMood === "Overwhelmed") {
      return {
        title:
          activeIntensity >= 7
            ? "Overload Recovery Plan"
            : "Overwhelm Relief Plan",
        description:
          "This plan is based on your latest overwhelmed check-in. It helps you reduce mental load and focus on one small step.",
        actions: [
          "Write down everything that is on your mind.",
          "Pick only one task that needs attention first.",
          "Take a 5-minute break before continuing.",
          activeIntensity >= 7
            ? "Avoid making big decisions until you feel calmer."
            : "Break your next task into one small step.",
        ],
      };
    }

    if (activeMood === "Tired") {
      return {
        title:
          activeIntensity >= 7
            ? "Deep Rest Plan"
            : "Energy Recovery Plan",
        description:
          "This plan is based on your latest tired check-in. It focuses on rest, energy, and reducing unnecessary pressure.",
        actions: [
          "Drink water and take a short stretch break.",
          "Close your eyes for two minutes without using your phone.",
          "Reduce one unnecessary task today.",
          activeIntensity >= 7
            ? "Try to sleep earlier or take proper rest if possible."
            : "Do one light activity that does not drain you.",
        ],
      };
    }

    if (activeMood === "Calm") {
      return {
        title: "Calm Maintenance Plan",
        description:
          "This plan is based on your latest calm check-in. It helps you understand what is working well and maintain emotional balance.",
        actions: [
          "Write one reason why you feel calm today.",
          "Repeat one habit that helped you feel stable.",
          "Use this calm state to complete one meaningful task.",
          "Save this check-in so you can understand your calm patterns later.",
        ],
      };
    }

    if (activeMood === "Peaceful") {
      return {
        title: "Peace Preservation Plan",
        description:
          "This plan is based on your latest peaceful check-in. It helps you protect and understand peaceful moments.",
        actions: [
          "Pause for one minute and enjoy the peaceful feeling.",
          "Notice what helped you feel peaceful today.",
          "Avoid rushing into stressful tasks immediately.",
          "Write one thing you want to repeat tomorrow.",
        ],
      };
    }

    if (activeMood === "Motivated") {
      return {
        title: "Focused Motivation Plan",
        description:
          "This plan is based on your latest motivated check-in. It helps you use your energy in a clear and useful way.",
        actions: [
          "Choose one important task to complete first.",
          "Set a 20-minute focus timer.",
          "Avoid starting too many things at once.",
          "Use your motivation for progress, not pressure.",
        ],
      };
    }

    return {
      title: "Start Your Wellness Pattern",
      description:
        "Begin by saving one mood check-in today. Once you add check-ins, MindMirror will show a personal wellness plan based on your mood and intensity.",
      actions: [
        "Choose how you feel today.",
        "Set your emotional intensity.",
        "Read the suggested exercise.",
        "Save the check-in to track your emotional pattern.",
      ],
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

  const wellnessPlan =
    getPersonalWellnessPlan();

  const currentCheckInSupport =
    getCheckInSupport();

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
        "Your emotional check-ins now include helpful suggestions and small exercises based on how you feel.",

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
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-16">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-4 sm:px-5 py-2.5 rounded-full mb-6 backdrop-blur-xl max-w-full">
            <FaMoon className="text-cyan-300 shrink-0" />

            <p className="uppercase tracking-[0.18em] sm:tracking-[0.25em] text-cyan-200 text-xs sm:text-sm leading-5">
              Your Emotional Space
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 md:mb-6 break-words">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-8 md:leading-9 max-w-4xl">
            Your personal emotional wellness
            space will evolve naturally as
            you explore assessments,
            reflections, and psychology
            insights over time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -6,
              }}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[28px] p-6 md:p-7 shadow-2xl"
            >
              <div className="bg-cyan-500/20 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-cyan-300 mb-5">
                {section.icon}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                {section.title}
              </h2>

              <p className="text-slate-300 text-base leading-7">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mb-14 md:mb-16">
          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Daily Emotional Check-In
            </h2>

            <p className="text-slate-300 text-base md:text-lg leading-8 mb-7">
              Choose how you feel and rate the
              intensity. MindMirror will suggest
              a small exercise based on your
              check-in.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-7">
              {moods.map((mood) => (
                <motion.button
                  key={mood}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() => {
                    setSelectedMood(mood);
                    setMoodMessage("");
                  }}
                  className={`p-4 md:p-5 rounded-2xl border transition text-base md:text-lg font-medium ${
                    selectedMood === mood
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                      : "bg-white/5 border-white/10 hover:bg-cyan-500/10"
                  }`}
                >
                  {mood}
                </motion.button>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl md:text-2xl font-bold">
                  Emotional Intensity
                </h3>

                <p className="text-cyan-300 text-lg font-semibold">
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

            {currentCheckInSupport && (
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-5 md:p-6 mb-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-cyan-500/20 w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-cyan-300 shrink-0">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      {currentCheckInSupport.title}
                    </h3>

                    <p className="text-slate-300 leading-7">
                      {currentCheckInSupport.meaning}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h4 className="text-cyan-300 font-semibold mb-2">
                      Suggested Exercise
                    </h4>

                    <p className="text-slate-300 leading-7">
                      {currentCheckInSupport.exercise}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h4 className="text-cyan-300 font-semibold mb-2">
                      Small Next Step
                    </h4>

                    <p className="text-slate-300 leading-7">
                      {currentCheckInSupport.nextSteps}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <textarea
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Optional note: What made you feel this way?"
              className="w-full min-h-[110px] bg-white/5 border border-white/10 rounded-2xl p-5 text-base text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 transition mb-6"
            ></textarea>

            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={saveMood}
              disabled={moodLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl text-base md:text-lg font-semibold shadow-2xl shadow-blue-500/20 disabled:opacity-60"
            >
              {moodLoading
                ? "Saving Emotional Check-In..."
                : "Save Check-In and Suggestion"}
            </motion.button>

            {moodMessage && (
              <p className="mt-6 text-cyan-300 text-base">
                {moodMessage}
              </p>
            )}
          </div>
        </div>

        <div className="mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-7">
            Mood Pattern Summary
          </h2>

          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-8 shadow-2xl">
            {moodHistory.length === 0 ? (
              <p className="text-slate-300 text-base md:text-lg leading-8">
                {moodSummary.insight}
              </p>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-8">
                  <motion.div
                    whileHover={{
                      y: -5,
                    }}
                    className="bg-white/5 border border-white/10 rounded-[24px] p-6"
                  >
                    <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300 mb-5">
                      <FaChartLine />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      Average Intensity
                    </h3>

                    <p className="text-cyan-300 text-3xl font-bold">
                      {moodSummary.averageIntensity}/10
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      y: -5,
                    }}
                    className="bg-white/5 border border-white/10 rounded-[24px] p-6"
                  >
                    <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300 mb-5">
                      <FaHeart />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      Most Frequent Mood
                    </h3>

                    <p className="text-cyan-300 text-3xl font-bold break-words">
                      {moodSummary.mostFrequentMood}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      y: -5,
                    }}
                    className="bg-white/5 border border-white/10 rounded-[24px] p-6"
                  >
                    <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300 mb-5">
                      <FaMoon />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      Total Check-Ins
                    </h3>

                    <p className="text-cyan-300 text-3xl font-bold">
                      {moodSummary.totalCheckIns}
                    </p>
                  </motion.div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">
                    Emotional Insight
                  </h3>

                  <p className="text-slate-300 text-base md:text-lg leading-8">
                    {moodSummary.insight}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-7">
            Personal Wellness Plan
          </h2>

          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-8 shadow-2xl">
            <div className="flex items-start gap-5 mb-6">
              <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300 shrink-0">
                <FaCheckCircle />
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {wellnessPlan.title}
                </h3>

                <p className="text-slate-300 text-base md:text-lg leading-8">
                  {wellnessPlan.description}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {wellnessPlan.actions.map(
                (action, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5"
                  >
                    <p className="text-slate-300 leading-7">
                      {index + 1}. {action}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-7">
            My Quiz Contributions
          </h2>

          {myContributions.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-8">
              <p className="text-slate-300 text-base md:text-lg leading-8">
                Quizzes you contribute to
                MindMirror will appear here
                with their review status.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {myContributions.map((quiz) => (
                <motion.div
                  key={quiz._id}
                  whileHover={{
                    y: -5,
                  }}
                  className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[28px] p-6 md:p-7 shadow-2xl"
                >
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300">
                      <FaBrain />
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full border text-xs font-semibold ${getStatusStyle(
                        quiz.status
                      )}`}
                    >
                      {quiz.status ||
                        "under review"}
                    </span>
                  </div>

                  <p className="text-cyan-300 uppercase tracking-[0.22em] text-xs mb-3">
                    {quiz.category ||
                      "Self Awareness"}
                  </p>

                  <h3 className="text-2xl font-bold mb-3">
                    {quiz.title}
                  </h3>

                  <p className="text-slate-300 leading-7 mb-5">
                    {quiz.description}
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
                    <p className="text-slate-300 text-sm md:text-base">
                      Questions submitted:{" "}
                      {quiz.questions?.length || 0}
                    </p>
                  </div>

                  {quiz.feedback && (
                    <div className="bg-red-500/10 border border-red-400/20 rounded-2xl p-5">
                      <h4 className="text-red-300 font-semibold mb-2">
                        Admin Feedback
                      </h4>

                      <p className="text-slate-300 leading-7">
                        {quiz.feedback}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-7">
            My Blog Contributions
          </h2>

          {myBlogContributions.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-8">
              <p className="text-slate-300 text-base md:text-lg leading-8">
                Blog resources you contribute
                to MindMirror will appear here
                after the blog contribution API
                is added to the backend.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {myBlogContributions.map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{
                    y: -5,
                  }}
                  className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[28px] p-6 md:p-7 shadow-2xl"
                >
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300">
                      <FaBookOpen />
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full border text-xs font-semibold ${getStatusStyle(
                        blog.status
                      )}`}
                    >
                      {blog.status ||
                        "under review"}
                    </span>
                  </div>

                  <p className="text-cyan-300 uppercase tracking-[0.22em] text-xs mb-3">
                    {blog.category ||
                      "Psychology"}
                  </p>

                  <h3 className="text-2xl font-bold mb-3">
                    {blog.title}
                  </h3>

                  <p className="text-slate-300 leading-7 mb-5">
                    {blog.description}
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
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
                    <div className="bg-red-500/10 border border-red-400/20 rounded-2xl p-5">
                      <h4 className="text-red-300 font-semibold mb-2">
                        Admin Feedback
                      </h4>

                      <p className="text-slate-300 leading-7">
                        {blog.feedback}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-7">
            Recent Mood Check-Ins
          </h2>

          {moodHistory.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-8">
              <p className="text-slate-300 text-base md:text-lg leading-8">
                Your mood check-ins will
                appear here once you begin
                saving daily emotional
                reflections.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {moodHistory
                .slice(0, 6)
                .map((item) => {
                  const savedSupport =
                    getCheckInSupport(
                      item.mood,
                      item.intensity
                    );

                  return (
                    <motion.div
                      key={item._id}
                      whileHover={{
                        y: -5,
                      }}
                      className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[28px] p-6 shadow-2xl"
                    >
                      <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300 mb-5">
                        <FaHeart />
                      </div>

                      <h3 className="text-2xl font-bold mb-3">
                        {item.mood}
                      </h3>

                      <p className="text-slate-300 mb-3">
                        Intensity:{" "}
                        {item.intensity}/10
                      </p>

                      {savedSupport && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                          <p className="text-cyan-300 font-semibold mb-2">
                            Suggested Exercise
                          </p>

                          <p className="text-slate-300 text-sm leading-7">
                            {savedSupport.exercise}
                          </p>
                        </div>
                      )}

                      {item.note && (
                        <p className="text-slate-300 leading-7 mb-4">
                          “{item.note}”
                        </p>
                      )}

                      <p className="text-slate-400 text-sm">
                        Saved on{" "}
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </motion.div>
                  );
                })}
            </div>
          )}
        </div>

        <div className="mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-7">
            Your Reflections
          </h2>

          {results.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-8">
              <p className="text-slate-300 text-base md:text-lg leading-8">
                Your reflections will begin
                appearing here as you complete
                emotional assessments and
                explore MindMirror.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result) => (
                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  key={result._id}
                  className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[28px] p-6 md:p-7 shadow-2xl"
                >
                  <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300 mb-5">
                    <FaBrain />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    {result.quizTitle}
                  </h3>

                  <p className="text-cyan-300 text-base mb-5">
                    {result.evaluation}
                  </p>

                  <p className="text-slate-400 mb-6 text-sm">
                    Completed on{" "}
                    {new Date(
                      result.completedAt
                    ).toLocaleDateString()}
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <p className="text-slate-300 leading-7">
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