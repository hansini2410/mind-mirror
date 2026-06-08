const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const resultGuideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    suggestion: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },
  },
  {
    _id: true,
  }
);

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    options: {
      type: [optionSchema],
      validate: {
        validator: function (options) {
          return options.length >= 2;
        },
        message:
          "Each question must have at least two options.",
      },
    },
  },
  {
    _id: true,
  }
);

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "Self Awareness",
      trim: true,
    },

    questions: {
      type: [questionSchema],
      validate: {
        validator: function (questions) {
          return questions.length >= 1;
        },
        message:
          "A quiz must contain at least one question.",
      },
    },

    reference: {
      type: referenceSchema,
      default: () => ({
        title: "",
        source: "",
        url: "",
      }),
    },

    resultGuides: {
      low: {
        type: resultGuideSchema,
        default: () => ({
          title: "",
          message: "",
          suggestion: "",
        }),
      },

      medium: {
        type: resultGuideSchema,
        default: () => ({
          title: "",
          message: "",
          suggestion: "",
        }),
      },

      high: {
        type: resultGuideSchema,
        default: () => ({
          title: "",
          message: "",
          suggestion: "",
        }),
      },
    },

    status: {
      type: String,
      enum: [
        "approved",
        "under review",
        "needs improvement",
        "rejected",
      ],
      default: "approved",
    },

    feedback: {
      type: String,
      default: "",
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isCommunityCreated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Quiz",
  quizSchema
);