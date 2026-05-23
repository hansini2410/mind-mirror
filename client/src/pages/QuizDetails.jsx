import { useEffect, useState } from "react";

import axios from "axios";

import { useParams, Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaArrowRight,
  FaBookOpen,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function QuizDetails() {
  const { id } = useParams();

  const storageKey = `mindmirror-quiz-${id}`;

  const [quiz, setQuiz] = useState(null);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [score, setScore] = useState(0);

  const [showResult, setShowResult] =
    useState(false);

  const [savedAnswers, setSavedAnswers] =
    useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (!quiz) return;

    const savedProgress =
      localStorage.getItem(storageKey);

    if (savedProgress) {
      const parsedData =
        JSON.parse(savedProgress);

      setCurrentQuestion(
        parsedData.currentQuestion || 0
      );

      setScore(parsedData.score || 0);

      setSavedAnswers(
        parsedData.savedAnswers || []
      );

      setShowResult(
        parsedData.showResult || false
      );
    }
  }, [quiz]);

  useEffect(() => {
    if (!quiz || showResult) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        currentQuestion,
        score,
        savedAnswers,
        showResult,
      })
    );
  }, [
    quiz,
    currentQuestion,
    score,
    savedAnswers,
    showResult,
  ]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/quizzes/${id}`
      );

      setQuiz(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogSearchLink = (topic) => {
    return `/blogs?topic=${encodeURIComponent(
      topic
    )}`;
  };

  const getQuizType = () => {
    const text = `${quiz?.title || ""} ${
      quiz?.category || ""
    }`.toLowerCase();

    const concernBasedKeywords = [
      "stress",
      "anxiety",
      "depression",
      "distress",
      "burnout",
      "emotional distress",
    ];

    const strengthBasedKeywords = [
      "well-being",
      "well being",
      "emotional intelligence",
      "self-efficacy",
      "self efficacy",
      "resilience",
      "optimism",
      "recovery",
    ];

    if (
      concernBasedKeywords.some((word) =>
        text.includes(word)
      )
    ) {
      return "concern";
    }

    if (
      strengthBasedKeywords.some((word) =>
        text.includes(word)
      )
    ) {
      return "strength";
    }

    return "balanced";
  };

  const getScoreDetails = (
    finalScore = score
  ) => {
    const totalQuestions =
      quiz?.questions?.length || 0;

    const maxPossibleScore =
      totalQuestions * 4;

    const minPossibleScore =
      totalQuestions * 1;

    const percentage =
      maxPossibleScore === minPossibleScore
        ? 0
        : ((finalScore - minPossibleScore) /
            (maxPossibleScore -
              minPossibleScore)) *
          100;

    return {
      totalQuestions,
      maxPossibleScore,
      minPossibleScore,
      percentage,
    };
  };

  const getEvaluation = (
    finalScore = score
  ) => {
    const quizType = getQuizType();

    const { percentage } =
      getScoreDetails(finalScore);

    const category =
      quiz?.category || "Self Awareness";

    if (quizType === "concern") {
      if (percentage <= 33) {
        return {
          title: "Low Concern Level",

          message: `Your responses suggest a lower level of ${category.toLowerCase()} concern at this moment. You appear to be managing this area with reasonable emotional stability.`,

          suggestion:
            "Continue maintaining healthy routines, emotional awareness, rest, and supportive habits. Regular reflection can help you notice changes early.",

          articles: [
            {
              title:
                "Building Emotional Intelligence",

              link: getBlogSearchLink(
                "emotional intelligence"
              ),
            },

            {
              title:
                "How Sleep Affects Mental Wellness",

              link: getBlogSearchLink(
                "sleep mental wellness"
              ),
            },
          ],
        };
      }

      if (percentage <= 66) {
        return {
          title: "Moderate Concern Level",

          message: `Your responses suggest a moderate level of ${category.toLowerCase()}-related pressure. You may be experiencing occasional emotional strain, overthinking, fatigue, or difficulty fully relaxing.`,

          suggestion:
            "Try short recovery breaks, journaling, breathing exercises, better sleep routines, and supportive conversations. Small consistent steps may reduce emotional load.",

          articles: [
            {
              title:
                "Understanding Anxiety and Overthinking",

              link: getBlogSearchLink(
                "anxiety overthinking"
              ),
            },

            {
              title:
                "The Psychology Behind Emotional Burnout",

              link: getBlogSearchLink(
                "emotional burnout"
              ),
            },
          ],
        };
      }

      return {
        title: "High Concern Level",

        message: `Your responses suggest a higher level of ${category.toLowerCase()}-related difficulty. This may indicate emotional overload, tension, fatigue, or reduced mental recovery.`,

        suggestion:
          "Prioritize rest, grounding routines, emotional support, and slower daily pacing. If these feelings continue or affect daily life strongly, consider speaking with a trusted person or mental health professional.",

        articles: [
          {
            title:
              "Trauma Responses and Emotional Triggers",

            link: getBlogSearchLink(
              "trauma triggers"
            ),
          },

          {
            title:
              "The Science of Dopamine and Motivation",

            link: getBlogSearchLink(
              "dopamine motivation"
            ),
          },
        ],
      };
    }

    if (quizType === "strength") {
      if (percentage <= 33) {
        return {
          title:
            "Developing Wellness Area",

          message: `Your responses suggest that ${category.toLowerCase()} may currently need more support and strengthening. This does not mean failure; it simply shows an area for growth.`,

          suggestion:
            "Start with small habits: self-reflection, realistic goals, emotional check-ins, rest, and supportive conversations. Growth becomes easier when it is practiced gently and consistently.",

          articles: [
            {
              title:
                "Building Emotional Intelligence",

              link: getBlogSearchLink(
                "emotional intelligence"
              ),
            },

            {
              title:
                "Understanding Anxiety and Overthinking",

              link: getBlogSearchLink(
                "anxiety overthinking"
              ),
            },
          ],
        };
      }

      if (percentage <= 66) {
        return {
          title:
            "Moderate Strength Level",

          message: `Your responses suggest a moderate level of ${category.toLowerCase()}. You may already have useful emotional skills, but there is still space to build consistency and confidence.`,

          suggestion:
            "Continue practicing awareness, emotional regulation, healthy routines, and reflection. Notice what already works for you and repeat it intentionally.",

          articles: [
            {
              title:
                "Building Emotional Intelligence",

              link: getBlogSearchLink(
                "emotional intelligence"
              ),
            },

            {
              title:
                "How Sleep Affects Mental Wellness",

              link: getBlogSearchLink(
                "sleep mental wellness"
              ),
            },
          ],
        };
      }

      return {
        title:
          "Strong Wellness Pattern",

        message: `Your responses suggest a strong level of ${category.toLowerCase()}. You appear to have healthy emotional resources, awareness, and adaptive coping patterns in this area.`,

        suggestion:
          "Keep strengthening these habits. You can use this area as a personal strength while continuing to reflect, learn, and support your emotional well-being.",

        articles: [
          {
            title:
              "Building Emotional Intelligence",

            link: getBlogSearchLink(
              "emotional intelligence"
            ),
          },

          {
            title:
              "How Sleep Affects Mental Wellness",

            link: getBlogSearchLink(
              "sleep mental wellness"
            ),
          },
        ],
      };
    }

    if (percentage <= 33) {
      return {
        title: "Needs More Reflection",

        message:
          "Your responses suggest this area may need more attention, support, or emotional awareness.",

        suggestion:
          "Take time to reflect on your answers and notice where small positive changes can begin.",

        articles: [
          {
            title:
              "Understanding Anxiety and Overthinking",

            link: getBlogSearchLink(
              "anxiety overthinking"
            ),
          },
        ],
      };
    }

    if (percentage <= 66) {
      return {
        title:
          "Moderate Reflection Pattern",

        message:
          "Your responses suggest a mixed pattern. Some areas may feel stable, while others may need more care.",

        suggestion:
          "Focus on consistency, self-awareness, and simple emotional wellness habits.",

        articles: [
          {
            title:
              "Building Emotional Intelligence",

            link: getBlogSearchLink(
              "emotional intelligence"
            ),
          },
        ],
      };
    }

    return {
      title:
        "Healthy Reflection Pattern",

      message:
        "Your responses suggest a generally healthy and stable reflection pattern in this area.",

      suggestion:
        "Continue practicing emotional awareness, balance, and supportive routines.",

      articles: [
        {
          title:
            "How Sleep Affects Mental Wellness",

          link: getBlogSearchLink(
            "sleep mental wellness"
          ),
        },
      ],
    };
  };

  const saveResultToDatabase =
    async (
      finalScore,
      finalEvaluation
    ) => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem(
            "mindmirrorUser"
          ) || "null"
        );

        if (!userInfo?.token) {
          return;
        }

        await axios.post(
          `${API_URL}/results`,
          {
            quizTitle: quiz.title,

            score: finalScore,

            evaluation:
              finalEvaluation.title,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleNextQuestion =
    async () => {
      if (selectedAnswer === null) {
        return;
      }

      const selectedOption =
        quiz.questions[
          currentQuestion
        ].options.find(
          (option) =>
            option._id ===
            selectedAnswer
        );

      const updatedScore =
        score + selectedOption.score;

      const updatedAnswers = [
        ...savedAnswers,
        {
          question:
            quiz.questions[
              currentQuestion
            ].question,

          answer:
            selectedOption.text,
        },
      ];

      setSavedAnswers(updatedAnswers);

      setSelectedAnswer(null);

      if (
        currentQuestion + 1 <
        quiz.questions.length
      ) {
        setScore(updatedScore);

        setCurrentQuestion(
          currentQuestion + 1
        );
      } else {
        const finalEvaluation =
          getEvaluation(
            updatedScore
          );

        await saveResultToDatabase(
          updatedScore,
          finalEvaluation
        );

        setScore(updatedScore);

        setSavedAnswers(updatedAnswers);

        setShowResult(true);

        localStorage.removeItem(
          storageKey
        );
      }
    };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-3xl">
        Loading Assessment...
      </div>
    );
  }

  const question =
    quiz.questions[currentQuestion];

  const evaluation = getEvaluation();

  const scoreDetails =
    getScoreDetails();

  if (showResult) {
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

        <div className="relative z-10 max-w-5xl mx-auto px-8 py-32">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl"
          >
            <div className="bg-cyan-500/20 w-24 h-24 rounded-3xl flex items-center justify-center text-5xl text-cyan-300 mb-10">
              <FaBrain />
            </div>

            <p className="uppercase tracking-[0.3em] text-cyan-300 text-sm mb-6">
              Emotional Evaluation
            </p>

            <h1 className="text-6xl font-bold mb-8 leading-tight">
              {evaluation.title}
            </h1>

            <p className="text-slate-300 text-2xl leading-[2] mb-8">
              {evaluation.message}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4">
                  Your Score
                </h2>

                <p className="text-cyan-300 text-4xl font-bold">
                  {score} /{" "}
                  {
                    scoreDetails.maxPossibleScore
                  }
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4">
                  Assessment Type
                </h2>

                <p className="text-cyan-300 text-2xl font-semibold capitalize">
                  {quiz.category ||
                    "Self Awareness"}
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">
              <h2 className="text-3xl font-bold mb-5">
                Suggested Reflection
              </h2>

              <p className="text-slate-300 text-xl leading-9">
                {evaluation.suggestion}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">
              <h2 className="text-3xl font-bold mb-6">
                Reflection Summary
              </h2>

              <div className="space-y-5">
                {savedAnswers.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="border-b border-white/10 pb-5"
                    >
                      <p className="text-white text-lg mb-2">
                        {index + 1}.{" "}
                        {item.question}
                      </p>

                      <p className="text-cyan-300">
                        {item.answer}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8">
                Recommended Insights
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {evaluation.articles.map(
                  (
                    article,
                    index
                  ) => (
                    <Link
                      key={index}
                      to={article.link}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                        }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-semibold leading-tight">
                            {
                              article.title
                            }
                          </h3>

                          <FaArrowRight className="text-cyan-300 text-xl" />
                        </div>
                      </motion.div>
                    </Link>
                  )
                )}
              </div>
            </div>

            {quiz.reference?.title && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">
                <div className="flex items-center gap-4 mb-5">
                  <FaBookOpen className="text-cyan-300 text-2xl" />

                  <h2 className="text-3xl font-bold">
                    Assessment Reference
                  </h2>
                </div>

                <p className="text-cyan-300 text-xl font-semibold mb-3">
                  {quiz.reference.title}
                </p>

                <p className="text-slate-300 text-lg mb-5">
                  {quiz.reference.source}
                </p>

                {quiz.reference.url && (
                  <a
                    href={quiz.reference.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 underline break-all"
                  >
                    View original reference
                  </a>
                )}
              </div>
            )}

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8">
              <p className="text-slate-300 text-lg leading-9">
                MindMirror assessments are
                designed for emotional
                reflection and educational
                wellness purposes only. They
                are not clinical diagnostic
                tools.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        fontFamily:
          "Poppins, sans-serif",

        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 bg-white/10 border border-white/10 backdrop-blur-xl p-12 rounded-[40px] w-full max-w-3xl shadow-2xl"
      >
        <div className="mb-10">
          <p className="text-cyan-300 tracking-[0.3em] uppercase text-sm mb-5">
            Emotional Pattern Analysis
          </p>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            {quiz.title}
          </h1>

          <p className="text-slate-300 text-lg mb-6">
            {quiz.description}
          </p>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-500"
              style={{
                width: `${
                  ((currentQuestion +
                    1) /
                    quiz.questions
                      .length) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <p className="mt-4 text-slate-300">
            Question{" "}
            {currentQuestion + 1} of{" "}
            {
              quiz.questions.length
            }
          </p>
        </div>

        <motion.h2
          key={currentQuestion}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-3xl font-semibold mb-10 leading-relaxed"
        >
          {question.question}
        </motion.h2>

        <div className="grid gap-5">
          {question.options.map(
            (option) => (
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                key={option._id}
                onClick={() =>
                  setSelectedAnswer(
                    option._id
                  )
                }
                className={`p-6 rounded-3xl text-left transition duration-300 border ${
                  selectedAnswer ===
                  option._id
                    ? "bg-cyan-500/20 border-cyan-400"
                    : "bg-white/5 border-white/10 hover:bg-cyan-500/10"
                }`}
              >
                <span className="text-xl">
                  {option.text}
                </span>
              </motion.button>
            )
          )}
        </div>

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={
            handleNextQuestion
          }
          className="mt-10 w-full bg-gradient-to-r from-cyan-500 to-blue-600 transition p-6 rounded-3xl text-xl font-semibold shadow-2xl shadow-blue-500/20"
        >
          {currentQuestion + 1 ===
          quiz.questions.length
            ? "Complete Assessment"
            : "Continue Reflection"}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default QuizDetails;