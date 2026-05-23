import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaTrash,
  FaPaperPlane,
  FaPlus,
  FaBookOpen,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mindmirror-backend-hit3.onrender.com/api";

function ContributeQuiz() {
  const userData = JSON.parse(
    localStorage.getItem("mindmirrorUser") || "null"
  );

  const [contributionType, setContributionType] =
    useState("quiz");

  const createOption = (score = 1) => ({
    text: "",
    score,
  });

  const createQuestion = () => ({
    question: "",
    options: [createOption(1), createOption(2)],
  });

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Self Awareness");

  const [customCategory, setCustomCategory] =
    useState("");

  const [questions, setQuestions] = useState([
    createQuestion(),
    createQuestion(),
    createQuestion(),
    createQuestion(),
    createQuestion(),
  ]);

  const [blogUrl, setBlogUrl] = useState("");

  const [blogSource, setBlogSource] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] = useState("");

  const categories = [
    "Self Awareness",
    "Emotions",
    "Relationships",
    "Confidence",
    "Habits",
    "Social Behavior",
    "Stress",
    "Personality",
    "Motivation",
    "Burnout",
    "Anxiety",
    "Trauma",
    "Sleep",
    "Well Being",
    "Psychology",
    "Others",
  ];

  const resetCommonFields = () => {
    setTitle("");
    setDescription("");
    setCategory("Self Awareness");
    setCustomCategory("");
    setBlogUrl("");
    setBlogSource("");
  };

  const getFinalCategory = () => {
    return category === "Others"
      ? customCategory.trim()
      : category;
  };

  const updateQuestionText = (
    questionIndex,
    value
  ) => {
    const updatedQuestions = questions.map(
      (question, index) =>
        index === questionIndex
          ? {
              ...question,
              question: value,
            }
          : question
    );

    setQuestions(updatedQuestions);
  };

  const updateOptionText = (
    questionIndex,
    optionIndex,
    value
  ) => {
    const updatedQuestions = questions.map(
      (question, qIndex) => {
        if (qIndex !== questionIndex) {
          return question;
        }

        return {
          ...question,
          options: question.options.map(
            (option, oIndex) =>
              oIndex === optionIndex
                ? {
                    ...option,
                    text: value,
                  }
                : option
          ),
        };
      }
    );

    setQuestions(updatedQuestions);
  };

  const updateOptionScore = (
    questionIndex,
    optionIndex,
    value
  ) => {
    const updatedQuestions = questions.map(
      (question, qIndex) => {
        if (qIndex !== questionIndex) {
          return question;
        }

        return {
          ...question,
          options: question.options.map(
            (option, oIndex) =>
              oIndex === optionIndex
                ? {
                    ...option,
                    score: Number(value),
                  }
                : option
          ),
        };
      }
    );

    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      createQuestion(),
    ]);

    setMessage("");
  };

  const removeQuestion = (questionIndex) => {
    if (questions.length <= 5) {
      setMessage(
        "A community discovery requires at least 5 questions."
      );

      return;
    }

    const updatedQuestions = questions.filter(
      (_, index) => index !== questionIndex
    );

    setQuestions(updatedQuestions);

    setMessage("");
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = questions.map(
      (question, index) =>
        index === questionIndex
          ? {
              ...question,
              options: [
                ...question.options,
                createOption(1),
              ],
            }
          : question
    );

    setQuestions(updatedQuestions);

    setMessage("");
  };

  const removeOption = (
    questionIndex,
    optionIndex
  ) => {
    const selectedQuestion =
      questions[questionIndex];

    if (selectedQuestion.options.length <= 2) {
      setMessage(
        "Each question requires at least 2 options."
      );

      return;
    }

    const updatedQuestions = questions.map(
      (question, index) =>
        index === questionIndex
          ? {
              ...question,
              options: question.options.filter(
                (_, optionPosition) =>
                  optionPosition !== optionIndex
              ),
            }
          : question
    );

    setQuestions(updatedQuestions);

    setMessage("");
  };

  const validateCommonFields = () => {
    if (!title.trim()) {
      setMessage(
        contributionType === "quiz"
          ? "Please enter a quiz title."
          : "Please enter a blog title."
      );

      return false;
    }

    if (!description.trim()) {
      setMessage(
        contributionType === "quiz"
          ? "Please enter a quiz description."
          : "Please enter a blog description."
      );

      return false;
    }

    if (
      category === "Others" &&
      !customCategory.trim()
    ) {
      setMessage(
        "Please enter your custom category."
      );

      return false;
    }

    return true;
  };

  const validateQuiz = () => {
    if (!validateCommonFields()) {
      return false;
    }

    if (questions.length < 5) {
      setMessage(
        "A community quiz requires at least 5 questions."
      );

      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      if (!question.question.trim()) {
        setMessage(
          `Please complete Question ${i + 1}.`
        );

        return false;
      }

      if (question.options.length < 2) {
        setMessage(
          `Question ${i + 1} requires at least 2 options.`
        );

        return false;
      }

      for (
        let j = 0;
        j < question.options.length;
        j++
      ) {
        const option = question.options[j];

        if (!option.text.trim()) {
          setMessage(
            `Please complete Option ${j + 1} in Question ${i + 1}.`
          );

          return false;
        }

        if (
          option.score < 1 ||
          option.score > 5
        ) {
          setMessage(
            `Scores must be between 1 and 5 in Question ${i + 1}.`
          );

          return false;
        }
      }
    }

    return true;
  };

  const validateBlog = () => {
    if (!validateCommonFields()) {
      return false;
    }

    const trimmedBlogUrl = blogUrl.trim();

    if (!trimmedBlogUrl) {
      setMessage(
        "Please enter the blog/article link."
      );

      return false;
    }

    if (
      !trimmedBlogUrl.startsWith("http://") &&
      !trimmedBlogUrl.startsWith("https://")
    ) {
      setMessage(
        "Please enter a valid blog link starting with http:// or https://."
      );

      return false;
    }

    return true;
  };

  const submitQuiz = async () => {
    if (!userData?.token) {
      setMessage(
        "Please login before contributing."
      );

      return;
    }

    if (!validateQuiz()) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        `${API_URL}/quizzes/contribute`,
        {
          title: title.trim(),
          description: description.trim(),
          category: getFinalCategory(),
          questions,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      resetCommonFields();

      setQuestions([
        createQuestion(),
        createQuestion(),
        createQuestion(),
        createQuestion(),
        createQuestion(),
      ]);

      setMessage(
        "Your community quiz has been submitted for admin review."
      );
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to submit your quiz right now."
      );
    } finally {
      setLoading(false);
    }
  };

  const submitBlog = async () => {
    if (!userData?.token) {
      setMessage(
        "Please login before contributing."
      );

      return;
    }

    if (!validateBlog()) {
      return;
    }

    const trimmedBlogUrl = blogUrl.trim();

    const finalSource =
      blogSource.trim() ||
      "Community Suggested Resource";

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        `${API_URL}/blogs/contribute`,
        {
          title: title.trim(),
          description: description.trim(),
          category: getFinalCategory(),
          sourceName: finalSource,
          sourceUrl: trimmedBlogUrl,
          source: finalSource,
          url: trimmedBlogUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      resetCommonFields();

      setMessage(
        "Your blog resource has been submitted for admin review."
      );
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to submit your blog right now."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (contributionType === "quiz") {
      submitQuiz();
    } else {
      submitBlog();
    }
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        fontFamily: "Poppins, sans-serif",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-4 sm:px-6 py-3 rounded-full mb-8 backdrop-blur-xl max-w-full">
            <FaBrain className="text-cyan-300 shrink-0" />

            <p className="uppercase tracking-[0.18em] sm:tracking-[0.3em] text-cyan-200 text-xs sm:text-sm leading-6">
              Contribute to MindMirror
            </p>
          </div>

          <h1 className="font-bold leading-tight mb-6 md:mb-8 text-4xl sm:text-5xl md:text-7xl break-words">
            Share a Mind{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Discovery
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl md:text-2xl leading-8 sm:leading-9 md:leading-[2] max-w-4xl">
            Contribute either a self-reflection
            quiz or a useful psychology blog
            resource for the MindMirror
            community.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 mb-10 md:mb-12">
          <button
            type="button"
            onClick={() => {
              setContributionType("quiz");
              setMessage("");
            }}
            className={`px-6 sm:px-8 py-4 sm:py-5 rounded-3xl text-base sm:text-lg font-semibold flex items-center justify-center gap-4 transition ${
              contributionType === "quiz"
                ? "bg-cyan-500/20 border border-cyan-400/30 text-cyan-200"
                : "bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <FaBrain />
            Contribute Quiz
          </button>

          <button
            type="button"
            onClick={() => {
              setContributionType("blog");
              setMessage("");
            }}
            className={`px-6 sm:px-8 py-4 sm:py-5 rounded-3xl text-base sm:text-lg font-semibold flex items-center justify-center gap-4 transition ${
              contributionType === "blog"
                ? "bg-cyan-500/20 border border-cyan-400/30 text-cyan-200"
                : "bg-white/10 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <FaBookOpen />
            Contribute Blog
          </button>
        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 shadow-2xl mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            {contributionType === "quiz"
              ? "Quiz Details"
              : "Blog Details"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder={
                contributionType === "quiz"
                  ? "Quiz title"
                  : "Blog title"
              }
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
            />

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);

                if (e.target.value !== "Others") {
                  setCustomCategory("");
                }
              }}
              className="w-full bg-slate-950 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition text-white"
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-slate-950 text-white"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {category === "Others" && (
            <input
              value={customCategory}
              onChange={(e) =>
                setCustomCategory(e.target.value)
              }
              placeholder="Enter custom category..."
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white mb-6"
            />
          )}

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder={
              contributionType === "quiz"
                ? "Describe what this quiz helps users understand..."
                : "Describe what this blog/article helps users learn..."
            }
            className="w-full min-h-[140px] bg-white/5 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white mb-6"
          ></textarea>

          {contributionType === "blog" && (
            <div className="grid md:grid-cols-2 gap-6">
              <input
                value={blogUrl}
                onChange={(e) =>
                  setBlogUrl(e.target.value)
                }
                placeholder="Blog/article link"
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
              />

              <input
                value={blogSource}
                onChange={(e) =>
                  setBlogSource(e.target.value)
                }
                placeholder="Source name, example: APA, Verywell Mind, WHO..."
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
              />
            </div>
          )}
        </div>

        {contributionType === "quiz" && (
          <div className="space-y-8 md:space-y-10 mb-10 md:mb-12">
            {questions.map(
              (
                questionItem,
                questionIndex
              ) => (
                <motion.div
                  key={questionIndex}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Question{" "}
                      {questionIndex + 1}
                    </h2>

                    <button
                      type="button"
                      onClick={() =>
                        removeQuestion(
                          questionIndex
                        )
                      }
                      className="bg-red-500/10 border border-red-400/20 text-red-300 px-5 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-red-500/20 transition"
                    >
                      <FaTrash />
                      Remove Question
                    </button>
                  </div>

                  <input
                    value={questionItem.question}
                    onChange={(e) =>
                      updateQuestionText(
                        questionIndex,
                        e.target.value
                      )
                    }
                    placeholder="Write your question..."
                    className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition mb-8 placeholder:text-slate-400 text-white"
                  />

                  <div className="space-y-5">
                    {questionItem.options.map(
                      (
                        option,
                        optionIndex
                      ) => (
                        <div
                          key={`${questionIndex}-${optionIndex}`}
                          className="grid md:grid-cols-[1fr_140px_auto] gap-4 items-center"
                        >
                          <input
                            value={option.text}
                            onChange={(e) =>
                              updateOptionText(
                                questionIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                            placeholder={`Option ${
                              optionIndex + 1
                            }`}
                            className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
                          />

                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={option.score}
                            onChange={(e) =>
                              updateOptionScore(
                                questionIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-base sm:text-lg outline-none focus:border-cyan-400 transition text-white"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeOption(
                                questionIndex,
                                optionIndex
                              )
                            }
                            className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl hover:bg-red-500/20 hover:border-red-400/30 transition text-white"
                          >
                            Remove
                          </button>
                        </div>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addOption(questionIndex)
                    }
                    className="mt-8 bg-cyan-500/10 border border-cyan-400/20 px-6 py-4 rounded-2xl hover:bg-cyan-500/20 transition flex items-center gap-3"
                  >
                    <FaPlus />
                    Add Option
                  </button>
                </motion.div>
              )
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row flex-wrap gap-5 sm:gap-6 mb-10">
          {contributionType === "quiz" && (
            <button
              type="button"
              onClick={addQuestion}
              className="bg-white/10 border border-white/10 px-8 py-5 rounded-3xl text-base sm:text-lg font-semibold hover:bg-white/20 transition"
            >
              Add Another Question
            </button>
          )}

          <motion.button
            type="button"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-5 rounded-3xl text-base sm:text-lg font-semibold shadow-2xl shadow-blue-500/20 disabled:opacity-60 flex items-center justify-center gap-4"
          >
            {loading
              ? "Submitting..."
              : contributionType === "quiz"
              ? "Submit Quiz for Review"
              : "Submit Blog for Review"}

            <FaPaperPlane />
          </motion.button>
        </div>

        {message && (
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 sm:p-8">
            <p className="text-cyan-200 text-lg sm:text-xl leading-8 sm:leading-9">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContributeQuiz;