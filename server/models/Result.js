const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    quizTitle: {
      type: String,

      required: true,
    },

    score: {
      type: Number,

      required: true,
    },

    evaluation: {
      type: String,

      required: true,
    },

    completedAt: {
      type: Date,

      default: Date.now,
    },
  }
);

module.exports = mongoose.model(
  "Result",
  resultSchema
);