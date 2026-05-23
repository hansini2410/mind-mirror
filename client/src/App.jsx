import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Quizzes from "./pages/Quizzes";

import QuizDetails from "./pages/QuizDetails";

import Blogs from "./pages/Blogs";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import ContributeQuiz from "./pages/ContributeQuiz";

import AdminDashboard from "./pages/AdminDashboard";

function ProtectedRoute({ children }) {
  const userData = JSON.parse(
    localStorage.getItem("mindmirrorUser") ||
      "null"
  );

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return children;
}

function AdminRoute({ children }) {
  const userData = JSON.parse(
    localStorage.getItem("mindmirrorUser") ||
      "null"
  );

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (userData?.user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/quizzes"
          element={<Quizzes />}
        />

        <Route
          path="/quiz/:id"
          element={<QuizDetails />}
        />

        <Route
          path="/blogs"
          element={<Blogs />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contribute"
          element={
            <ProtectedRoute>
              <ContributeQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;