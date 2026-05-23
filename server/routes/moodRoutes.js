const express = require("express");

const router = express.Router();

const Mood = require("../models/Mood");

const protect = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  async (req, res) => {
    try {
      const {
        mood,
        intensity,
        note,
      } = req.body;

      const newMood =
        await Mood.create({
          user: req.user._id,

          mood,

          intensity,

          note,
        });

      res.status(201).json(
        newMood
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

router.get(
  "/",
  protect,
  async (req, res) => {
    try {
      const moods =
        await Mood.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json(moods);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

module.exports = router;