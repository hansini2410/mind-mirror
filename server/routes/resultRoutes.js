const express = require("express");

const router = express.Router();

const Result = require("../models/Result");

const protect = require("../middleware/authMiddleware");

/*
  GET:
  Fetch only the logged-in user's completed quiz results.
*/
router.get("/", protect, async (req, res) => {
  try {
    const results = await Result.find({
      user: req.user._id,
    }).sort({
      completedAt: -1,
    });

    res.json(results);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to load your results.",
    });
  }
});

/*
  POST:
  Save completed quiz result for logged-in user.
*/
router.post("/", protect, async (req, res) => {
  try {
    const { quizTitle, score, evaluation } =
      req.body;

    if (!quizTitle || score === undefined || !evaluation) {
      return res.status(400).json({
        message:
          "Quiz title, score, and evaluation are required.",
      });
    }

    const existingResult =
      await Result.findOne({
        user: req.user._id,
        quizTitle,
      }).sort({
        completedAt: -1,
      });

    const newResult = new Result({
      user: req.user._id,
      quizTitle,
      score,
      evaluation,
      previousScore:
        existingResult?.score || null,
    });

    await newResult.save();

    res.status(201).json({
      message: "Result saved successfully.",
      result: newResult,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to save result.",
    });
  }
});

module.exports = router;