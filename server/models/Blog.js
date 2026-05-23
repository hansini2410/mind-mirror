const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
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
      default: "Psychology",
      trim: true,
    },

    sourceName: {
      type: String,
      required: true,
      trim: true,
    },

    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "approved",
        "under review",
        "needs improvement",
        "rejected",
      ],
      default: "under review",
    },

    feedback: {
      type: String,
      default: "",
      trim: true,
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isCommunityCreated: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Blog",
  blogSchema
);