const Quiz = require("../models/Quiz");

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz({
      title: "Stress Assessment",

      description: "Analyze your stress levels",

      questions: [
        {
          question: "How often do you feel overwhelmed?",

          options: [
            {
              text: "Rarely",
              score: 1,
            },

            {
              text: "Sometimes",
              score: 2,
            },

            {
              text: "Often",
              score: 3,
            },
          ],
        },
      ],
    });

    const createdQuiz = await quiz.save();

    res.status(201).json(createdQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  createQuiz,
};