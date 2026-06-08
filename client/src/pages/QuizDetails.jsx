import { useEffect, useState } from "react";

import axios from "axios";

import {
  useParams,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaArrowRight,
  FaArrowLeft,
  FaBookOpen,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mindmirror-backend-hit3.onrender.com/api";

function QuizDetails() {
  const { id } = useParams();

  const storageKey = `mindmirror-quiz-${id}`;

  const [quiz, setQuiz] =
    useState(null);

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [
    selectedAnswers,
    setSelectedAnswers,
  ] = useState([]);

  const [score, setScore] =
    useState(0);

  const [
    showResult,
    setShowResult,
  ] = useState(false);

  const [
    savedAnswers,
    setSavedAnswers,
  ] = useState([]);

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

      setSelectedAnswers(
        parsedData.selectedAnswers || []
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
        selectedAnswers,
        score,
        savedAnswers,
        showResult,
      })
    );
  }, [
    quiz,
    currentQuestion,
    selectedAnswers,
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

    let minPossibleScore = 0;
    let maxPossibleScore = 0;

    quiz?.questions?.forEach(
      (questionItem) => {
        const scores =
          questionItem.options?.map(
            (option) =>
              Number(option.score || 0)
          ) || [];

        minPossibleScore +=
          Math.min(...scores);
        maxPossibleScore +=
          Math.max(...scores);
      }
    );

    const percentage =
      maxPossibleScore ===
      minPossibleScore
        ? 0
        : ((finalScore -
            minPossibleScore) /
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
    const { percentage } =
      getScoreDetails(finalScore);

    const hasCustomResultGuides =
      quiz?.resultGuides?.low?.title &&
      quiz?.resultGuides?.medium
        ?.title &&
      quiz?.resultGuides?.high?.title;

    if (hasCustomResultGuides) {
      let guide = quiz.resultGuides.high;

      if (percentage <= 33) {
        guide = quiz.resultGuides.low;
      } else if (percentage <= 66) {
        guide =
          quiz.resultGuides.medium;
      }

      return {
        title: guide.title,
        message: guide.message,
        suggestion:
          guide.suggestion,
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
              "Building Emotional Intelligence",
            link: getBlogSearchLink(
              "emotional intelligence"
            ),
          },
        ],
      };
    }

    const quizType = getQuizType();

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
          title:
            "Moderate Concern Level",

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
        title:
          "Needs More Reflection",

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

  const calculateFinalScore = () => {
    return quiz.questions.reduce(
      (total, questionItem, index) => {
        const selectedOptionId =
          selectedAnswers[index];

        const selectedOption =
          questionItem.options.find(
            (option) =>
              option._id ===
              selectedOptionId
          );

        return (
          total +
          Number(
            selectedOption?.score || 0
          )
        );
      },
      0
    );
  };

  const createAnswerSummary = () => {
    return quiz.questions.map(
      (questionItem, index) => {
        const selectedOptionId =
          selectedAnswers[index];

        const selectedOption =
          questionItem.options.find(
            (option) =>
              option._id ===
              selectedOptionId
          );

        return {
          question:
            questionItem.question,
          answer:
            selectedOption?.text ||
            "Not answered",
        };
      }
    );
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

  const handleAnswerSelect = (
    optionId
  ) => {
    const updatedAnswers = [
      ...selectedAnswers,
    ];

    updatedAnswers[currentQuestion] =
      optionId;

    setSelectedAnswers(
      updatedAnswers
    );
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) {
      return;
    }

    setCurrentQuestion(
      currentQuestion - 1
    );
  };

  const handleNextQuestion =
    async () => {
      if (
        !selectedAnswers[
          currentQuestion
        ]
      ) {
        return;
      }

      if (
        currentQuestion + 1 <
        quiz.questions.length
      ) {
        setCurrentQuestion(
          currentQuestion + 1
        );

        return;
      }

      const finalScore =
        calculateFinalScore();

      const finalEvaluation =
        getEvaluation(finalScore);

      const finalSavedAnswers =
        createAnswerSummary();

      await saveResultToDatabase(
        finalScore,
        finalEvaluation
      );

      setScore(finalScore);

      setSavedAnswers(
        finalSavedAnswers
      );

      setShowResult(true);

      localStorage.removeItem(
        storageKey
      );
    };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xl sm:text-2xl">
        Loading Assessment...
      </div>
    );
  }

  const question =
    quiz.questions[currentQuestion];

  const selectedAnswer =
    selectedAnswers[
      currentQuestion
    ];

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
        <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-28 sm:pt-32 pb-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl"
          >
            <div className="bg-cyan-500/20 w-16 sm:w-20 h-16 sm:h-20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl text-cyan-300 mb-8">
              <FaBrain />
            </div>

            <p className="uppercase tracking-[0.22em] text-cyan-300 text-xs sm:text-sm mb-5">
              Emotional Evaluation
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              {evaluation.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-xl leading-8 sm:leading-9 mb-8">
              {evaluation.message}
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-3">
                  Your Score
                </h2>

                <p className="text-cyan-300 text-3xl font-bold">
                  {score} /{" "}
                  {
                    scoreDetails.maxPossibleScore
                  }
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-3">
                  Assessment Type
                </h2>

                <p className="text-cyan-300 text-xl font-semibold capitalize">
                  {quiz.category ||
                    "Self Awareness"}
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Suggested Reflection
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-8">
                {evaluation.suggestion}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-5">
                Reflection Summary
              </h2>

              <div className="space-y-4">
                {savedAnswers.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="border-b border-white/10 pb-4"
                    >
                      <p className="text-white text-base mb-2">
                        {index + 1}.{" "}
                        {item.question}
                      </p>

                      <p className="text-cyan-300 text-sm sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">
                Recommended Insights
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
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
                        className="bg-white/5 border border-white/10 rounded-3xl p-6"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                            {
                              article.title
                            }
                          </h3>

                          <FaArrowRight className="text-cyan-300 text-lg shrink-0" />
                        </div>
                      </motion.div>
                    </Link>
                  )
                )}
              </div>
            </div>

            {quiz.reference?.title && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
                <div className="flex items-center gap-4 mb-5">
                  <FaBookOpen className="text-cyan-300 text-xl" />

                  <h2 className="text-2xl font-bold">
                    Assessment Reference
                  </h2>
                </div>

                <p className="text-cyan-300 text-lg font-semibold mb-3">
                  {quiz.reference.title}
                </p>

                <p className="text-slate-300 text-base mb-5">
                  {quiz.reference.source}
                </p>

                {quiz.reference.url && (
                  <a
                    href={quiz.reference.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 underline break-all text-sm sm:text-base"
                  >
                    View original reference
                  </a>
                )}
              </div>
            )}

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6">
              <p className="text-slate-300 text-sm sm:text-base leading-8">
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
      className="min-h-screen text-white flex items-center justify-center px-4 sm:px-6 pt-24 pb-8 relative overflow-hidden"
      style={{
        fontFamily:
          "Poppins, sans-serif",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 bg-white/10 border border-white/10 backdrop-blur-xl p-5 sm:p-7 md:p-8 rounded-[28px] sm:rounded-[36px] w-full max-w-2xl shadow-2xl"
      >
        <div className="mb-5 sm:mb-6">
          <p className="text-cyan-300 tracking-[0.18em] uppercase text-[11px] sm:text-xs mb-3">
            Emotional Pattern Analysis
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {quiz.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-7 mb-4">
            {quiz.description}
          </p>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-500"
              style={{
                width: `${
                  ((currentQuestion +
                    1) /
                    quiz.questions.length) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <p className="mt-3 text-slate-300 text-sm">
            Question{" "}
            {currentQuestion + 1} of{" "}
            {quiz.questions.length}
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
          className="text-lg sm:text-xl md:text-2xl font-semibold mb-5 sm:mb-6 leading-8"
        >
          {question.question}
        </motion.h2>

        <div className="grid gap-3 sm:gap-4">
          {question.options.map(
            (option) => (
              <motion.button
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                key={option._id}
                onClick={() =>
                  handleAnswerSelect(
                    option._id
                  )
                }
                className={`p-4 sm:p-5 rounded-2xl text-left transition duration-300 border ${
                  selectedAnswer ===
                  option._id
                    ? "bg-cyan-500/20 border-cyan-400"
                    : "bg-white/5 border-white/10 hover:bg-cyan-500/10"
                }`}
              >
                <span className="text-sm sm:text-base md:text-lg leading-7">
                  {option.text}
                </span>
              </motion.button>
            )
          )}
        </div>

        <div className="mt-6 sm:mt-7 grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={
              handlePreviousQuestion
            }
            disabled={
              currentQuestion === 0
            }
            className="bg-white/10 border border-white/10 transition p-4 sm:p-5 rounded-2xl text-base sm:text-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <FaArrowLeft />
            Previous
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={
              handleNextQuestion
            }
            disabled={!selectedAnswer}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 transition p-4 sm:p-5 rounded-2xl text-base sm:text-lg font-semibold shadow-2xl shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {currentQuestion + 1 ===
            quiz.questions.length
              ? "Complete"
              : "Next"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default QuizDetails;