import { useState } from "react";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import {
  FaBrain,
  FaArrowRight,
} from "react-icons/fa";

import axios from "axios";

import "@fontsource/poppins";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mindmirror-backend-hit3.onrender.com/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem(
        "mindmirrorUser",
        JSON.stringify(response.data)
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden text-white"
      style={{
        fontFamily: "Poppins, sans-serif",

        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 w-full max-w-xl bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl"
      >
        <div className="bg-cyan-500/20 w-24 h-24 rounded-3xl flex items-center justify-center text-5xl text-cyan-300 mb-10">
          <FaBrain />
        </div>

        <p className="uppercase tracking-[0.3em] text-cyan-300 text-sm mb-6">
          MindMirror Emotional Space
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-8">
          Return to
          <br />

          Your Space
        </h1>

        <p className="text-slate-300 text-xl leading-[2] mb-10">
          Continue your emotional reflection
          journey, explore psychological
          insights, and reconnect with your
          wellness progress.
        </p>

        <div className="space-y-6 mb-8">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-3xl p-5 text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-3xl p-5 text-lg outline-none focus:border-cyan-400 transition placeholder:text-slate-400 text-white"
          />
        </div>

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-3xl text-xl font-semibold shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Logging in..."
            : "Continue Reflection Journey"}

          <FaArrowRight />
        </motion.button>

        <div className="mt-10 text-center">
          <p className="text-slate-300">
            New to MindMirror?
          </p>

          <Link to="/register">
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              className="mt-4 text-cyan-300 text-lg"
            >
              Begin Your Discovery
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;