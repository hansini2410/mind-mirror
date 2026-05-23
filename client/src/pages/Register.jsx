import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import { FaBrain, FaHeart } from "react-icons/fa";

import "@fontsource/poppins";

function Register() {
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL || "https://mindmirror-backend-hit3.onrender.com/api";

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all the fields.");

      return;
    }

    try {
      setLoading(true);

      setError("");

      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "mindmirrorUser",
        JSON.stringify(response.data)
      );

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
          MindMirror Emotional Wellness
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-8">
          Begin Your
          <br />

          Discovery
        </h1>

        <p className="text-slate-300 text-xl leading-[2] mb-10">
          Create your emotional reflection
          space and begin exploring
          psychology, emotional patterns,
          and self-awareness insights.
        </p>

        <div className="space-y-6 mb-8">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-3xl p-5 text-lg outline-none focus:border-cyan-400 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-3xl p-5 text-lg outline-none focus:border-cyan-400 transition"
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-3xl p-5 text-lg outline-none focus:border-cyan-400 transition"
          />
        </div>

        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/20 text-red-200 p-4 rounded-2xl">
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
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-3xl text-xl font-semibold shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-4 disabled:opacity-60"
        >
          {loading
            ? "Creating Space..."
            : "Create Emotional Space"}

          <FaHeart />
        </motion.button>

        <div className="mt-10 text-center">
          <p className="text-slate-300">
            Already part of MindMirror?
          </p>

          <Link to="/login">
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              className="mt-4 text-cyan-300 text-lg"
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