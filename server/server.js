const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const quizRoutes = require("./routes/quizRoutes");

const authRoutes = require("./routes/authRoutes");

const resultRoutes = require("./routes/resultRoutes");

const moodRoutes = require("./routes/moodRoutes");

const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/quizzes",
  quizRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/results",
  resultRoutes
);

app.use(
  "/api/moods",
  moodRoutes
);

app.use(
  "/api/blogs",
  blogRoutes
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});