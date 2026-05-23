const mongoose = require("mongoose");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const Quiz = require("./models/Quiz");

const quizzes = require("./data/quizData");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Quiz.deleteMany({
      isCommunityCreated: false,
    });

    const defaultQuizzes = quizzes.map((quiz) => ({
      ...quiz,
      status: "approved",
      isCommunityCreated: false,
    }));

    await Quiz.insertMany(defaultQuizzes);

    console.log("Default MindMirror Quiz Data Imported Successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importData();