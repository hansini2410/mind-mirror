import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaClock,
  FaHeart,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_URL = import.meta.env.VITE_API_URL;

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await axios.get(
        `${API_URL}/quizzes`
      );

      setQuizzes(response.data);
    } catch (error) {
      console.log(error);

      setError(
        "Unable to load assessments. Please check whether your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    ...new Set(
      quizzes
        .map((quiz) => quiz.category)
        .filter(Boolean)
    ),
  ];

  const getQuestionCountText = (quiz) => {
    const count = Array.isArray(
      quiz.questions
    )
      ? quiz.questions.length
      : 0;

    if (count === 1) {
      return "1 Question";
    }

    return `${count} Questions`;
  };

  const getAnalysisLabel = (quiz) => {
    const count = Array.isArray(
      quiz.questions
    )
      ? quiz.questions.length
      : 0;

    if (count >= 10) {
      return "Deep Analysis";
    }

    if (count >= 5) {
      return "Guided Analysis";
    }

    return "Quick Reflection";
  };

  return (
    <div
      className="min-h-screen text-white overflow-hidden relative"
      style={{
        fontFamily:
          "Poppins, sans-serif",

        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-6 py-3 rounded-full mb-8 backdrop-blur-xl">
            <FaBrain className="text-blue-300" />

            <p className="uppercase tracking-widest text-blue-200 text-sm">
              MindMirror Psychology Assessments
            </p>
          </div>

          <h1 className="text-7xl font-bold leading-tight mb-8">
            Explore Your
            <br />

            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Emotional Patterns
            </span>
          </h1>

          <p className="text-slate-300 text-2xl leading-10 max-w-4xl">
            Discover emotional insights,
            cognitive patterns, and wellness
            indicators through immersive
            psychology-based assessments.
          </p>
        </motion.div>

        {!loading &&
          !error &&
          categories.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-16">
              {categories.map(
                (category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="bg-white/10 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl text-slate-200"
                  >
                    {category}
                  </motion.div>
                )
              )}
            </div>
          )}

        {loading ? (
          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-10 text-2xl text-slate-300">
            Loading assessments...
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-400/20 backdrop-blur-xl rounded-[32px] p-10 text-xl text-red-200">
            {error}
          </div>
        ) : quizzes.length === 0 ? (
          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-10 text-xl text-slate-300">
            No assessments are available yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map(
              (quiz, index) => (
                <motion.div
                  key={quiz._id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                  }}
                  className="relative bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="bg-blue-500/20 p-4 rounded-2xl text-3xl text-cyan-300">
                        <FaHeart />
                      </div>

                      <div className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm">
                        {quiz.category ||
                          "Self Awareness"}
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-5 leading-tight">
                      {quiz.title}
                    </h2>

                    <p className="text-slate-300 leading-8 mb-8">
                      {quiz.description}
                    </p>

                    <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-3 text-slate-300">
                        <FaClock />

                        {getQuestionCountText(
                          quiz
                        )}
                      </div>

                      <div className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm">
                        {getAnalysisLabel(
                          quiz
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/quiz/${quiz._id}`}
                    >
                      <motion.button
                        whileHover={{
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-500/20"
                      >
                        Begin Assessment
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quizzes;