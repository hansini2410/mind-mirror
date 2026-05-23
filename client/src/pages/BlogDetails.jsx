import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaBrain,
} from "react-icons/fa";

import "@fontsource/poppins";

function BlogDetails() {
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden flex items-center justify-center px-8"
      style={{
        fontFamily:
          "Poppins, sans-serif",

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
        className="relative z-10 max-w-3xl bg-white/10 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl text-center"
      >
        <div className="bg-cyan-500/20 w-24 h-24 rounded-3xl flex items-center justify-center text-5xl text-cyan-300 mx-auto mb-10">
          <FaBrain />
        </div>

        <h1 className="text-5xl font-bold mb-8 leading-tight">
          Resources Have Moved
        </h1>

        <p className="text-slate-300 text-xl leading-[2] mb-10">
          MindMirror now connects users to
          trusted external psychology and
          wellness resources instead of
          showing copied internal blog
          content.
        </p>

        <Link to="/blogs">
          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-5 rounded-3xl text-lg font-semibold shadow-2xl shadow-blue-500/20 flex items-center gap-4 mx-auto"
          >
            <FaArrowLeft />

            Back to Resource Library
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default BlogDetails;