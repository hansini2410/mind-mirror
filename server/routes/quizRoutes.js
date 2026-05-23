const express = require("express");

const router = express.Router();

const Quiz = require("../models/Quiz");

const protect = require("../middleware/authMiddleware");

const isAdmin = require("../middleware/adminMiddleware");

const validateQuizData = (quizData) => {
  const {
    title,
    description,
    category,
    questions,
  } = quizData;

  if (!title || !title.trim()) {
    return "Quiz title is required.";
  }

  if (!description || !description.trim()) {
    return "Quiz description is required.";
  }

  if (!category || !category.trim()) {
    return "Quiz category is required.";
  }

  if (!questions || !Array.isArray(questions)) {
    return "Questions must be provided.";
  }

  if (questions.length < 5) {
    return "A contributed quiz must have at least 5 questions.";
  }

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    if (!question.question || !question.question.trim()) {
      return `Question ${i + 1} is incomplete.`;
    }

    if (!question.options || !Array.isArray(question.options)) {
      return `Question ${i + 1} must have options.`;
    }

    if (question.options.length < 2) {
      return `Question ${i + 1} must have at least 2 options.`;
    }

    for (let j = 0; j < question.options.length; j++) {
      const option = question.options[j];

      if (!option.text || !option.text.trim()) {
        return `Option ${j + 1} in Question ${i + 1} is incomplete.`;
      }

      if (
        option.score === undefined ||
        option.score === null ||
        Number.isNaN(Number(option.score))
      ) {
        return `Option ${j + 1} in Question ${i + 1} needs a valid score.`;
      }

      if (Number(option.score) < 1 || Number(option.score) > 5) {
        return `Score in Question ${i + 1}, Option ${j + 1} must be between 1 and 5.`;
      }
    }
  }

  return null;
};

router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      $or: [
        {
          status: "approved",
        },
        {
          status: {
            $exists: false,
          },
        },
      ],
    }).sort({
      createdAt: -1,
    });

    res.json(quizzes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/my-contributions", protect, async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      submittedBy: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(quizzes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/admin/pending", protect, isAdmin, async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      status: "under review",
      isCommunityCreated: true,
    })
      .populate("submittedBy", "name email")
      .sort({
        createdAt: -1,
      });

    res.json(quizzes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/admin/all", protect, isAdmin, async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      isCommunityCreated: true,
    })
      .populate("submittedBy", "name email")
      .sort({
        createdAt: -1,
      });

    res.json(quizzes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    if (quiz.status && quiz.status !== "approved") {
      return res.status(403).json({
        message: "This quiz is still under review.",
      });
    }

    res.json(quiz);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      questions,
    } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      category: category || "Self Awareness",
      questions,
      status: "approved",
      isCommunityCreated: false,
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/contribute", protect, async (req, res) => {
  try {
    const validationError = validateQuizData(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const {
      title,
      description,
      category,
      questions,
    } = req.body;

    const cleanedQuestions = questions.map((question) => ({
      question: question.question.trim(),
      options: question.options.map((option) => ({
        text: option.text.trim(),
        score: Number(option.score),
      })),
    }));

    const quiz = await Quiz.create({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      questions: cleanedQuestions,
      status: "under review",
      submittedBy: req.user._id,
      isCommunityCreated: true,
    });

    res.status(201).json({
      message: "Your quiz has been submitted for review.",
      quiz,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put("/admin/:id/approve", protect, isAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    quiz.status = "approved";
    quiz.feedback = "";

    await quiz.save();

    res.json({
      message: "Quiz approved successfully.",
      quiz,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put("/admin/:id/reject", protect, isAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    quiz.status = "rejected";
    quiz.feedback =
      req.body.feedback || "This quiz needs improvement.";

    await quiz.save();

    res.json({
      message: "Quiz rejected successfully.",
      quiz,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.delete("/admin/:id", protect, isAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    if (!quiz.isCommunityCreated) {
      return res.status(403).json({
        message: "Default MindMirror quizzes cannot be deleted from admin community moderation.",
      });
    }

    await Quiz.findByIdAndDelete(req.params.id);

    res.json({
      message: "Community quiz deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;