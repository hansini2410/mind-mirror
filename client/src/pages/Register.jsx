import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import {
  FaBrain,
  FaHeart,
} from "react-icons/fa";

import "@fontsource/poppins";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mindmirror-backend-hit3.onrender.com/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleRegister = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("Please fill all the fields.");

      return;
    }

    try {
      setLoading(true);

      setError("");

      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          name: name.trim(),
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem(
        "mindmirrorUser",
        JSON.stringify(response.data)
      );

      window.scrollTo(0, 0);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 pb-16 relative overflow-hidden text-white"
      style={{
        fontFamily: "Poppins, sans-serif",

        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 w-full max-w-lg bg-white/10 border border-white/10 backdrop-blur-xl rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 md:p-10 shadow-2xl"
      >
        <div className="bg-cyan-500/20 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl text-cyan-300 mb-7">
          <FaBrain />
        </div>

        <p className="uppercase tracking-[0.2em] sm:tracking-[0.28em] text-cyan-300 text-xs mb-4 leading-6">
          MindMirror Emotional Wellness
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
          Begin Your
          <br />
          Discovery
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-8 mb-8">
          Create your emotional reflection
          space and begin exploring
          psychology, emotional patterns,
          and self-awareness insights.
        </p>

        <div className="space-y-4 mb-7">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-base outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-base outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-base outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
          />
        </div>

        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/20 text-red-200 p-4 rounded-2xl text-sm sm:text-base">
            {error}
          </div>
        )}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl text-base sm:text-lg font-semibold shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Creating Space..."
            : "Create Emotional Space"}

          <FaHeart />
        </motion.button>

        <div className="mt-8 text-center">
          <p className="text-slate-300 text-sm sm:text-base">
            Already part of MindMirror?
          </p>

          <Link to="/login">
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              className="mt-3 text-cyan-300 text-base"
            >
              Return to Your Space
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;