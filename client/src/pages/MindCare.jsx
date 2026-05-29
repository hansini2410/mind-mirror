import { useState } from "react";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaLeaf,
  FaPen,
  FaHeart,
  FaRedo,
  FaWind,
} from "react-icons/fa";

import "@fontsource/poppins";

function MindCare() {
  const journalPrompts = [
    "What is one thing I handled better than I expected today?",
    "What emotion am I feeling right now, and what might it be trying to tell me?",
    "What is one small thing I can do today to feel lighter?",
    "What thought has been repeating in my mind, and is it fully true?",
    "What would I say to a friend who felt the way I feel right now?",
  ];

  const affirmations = [
    "I am allowed to take things one step at a time.",
    "My feelings are valid, but they do not control me.",
    "I can pause, breathe, and begin again.",
    "Small progress is still progress.",
    "I deserve patience, care, and kindness from myself.",
  ];

  const calmSteps = [
    "Pause and take three slow breaths.",
    "Name what you are feeling without judging it.",
    "Relax your shoulders and unclench your jaw.",
    "Drink water or step away for a short break.",
    "Choose one small next action instead of solving everything at once.",
  ];

  const [promptIndex, setPromptIndex] =
    useState(0);

  const [affirmationIndex, setAffirmationIndex] =
    useState(0);

  const changePrompt = () => {
    setPromptIndex(
      (promptIndex + 1) % journalPrompts.length
    );
  };

  const changeAffirmation = () => {
    setAffirmationIndex(
      (affirmationIndex + 1) %
        affirmations.length
    );
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        fontFamily: "Poppins, sans-serif",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-4 sm:px-6 py-3 rounded-full mb-8 backdrop-blur-xl">
            <FaLeaf className="text-cyan-300" />

            <p className="uppercase tracking-[0.18em] sm:tracking-[0.3em] text-cyan-200 text-xs sm:text-sm">
              MindMirror Self-Care Toolkit
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Your Quick
            <br />

            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              MindCare Space
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-8 sm:leading-9 max-w-4xl">
            Use these simple tools whenever you
            feel stressed, confused, overwhelmed,
            or need a small emotional reset.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          <motion.div
            whileHover={{
              y: -6,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
          >
            <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300 mb-6">
              <FaWind />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              60-Second Breathing Reset
            </h2>

            <p className="text-slate-300 leading-8 mb-6">
              Try this when your mind feels too
              full or your body feels tense.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-cyan-300 font-semibold mb-2">
                  Step 1
                </p>

                <p className="text-slate-300">
                  Breathe in slowly for 4 seconds.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-cyan-300 font-semibold mb-2">
                  Step 2
                </p>

                <p className="text-slate-300">
                  Hold your breath gently for 4 seconds.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-cyan-300 font-semibold mb-2">
                  Step 3
                </p>

                <p className="text-slate-300">
                  Breathe out slowly for 6 seconds.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
          >
            <div className="bg-blue-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-blue-300 mb-6">
              <FaBrain />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              5-4-3-2-1 Grounding
            </h2>

            <p className="text-slate-300 leading-8 mb-6">
              Use this when you feel anxious,
              disconnected, or overwhelmed.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                5 things you can see
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                4 things you can touch
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                3 things you can hear
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                2 things you can smell
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:col-span-2">
                1 thing you can taste or one slow breath
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          <motion.div
            whileHover={{
              y: -6,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
          >
            <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-cyan-300 mb-6">
              <FaPen />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Journal Prompt
            </h2>

            <p className="text-slate-300 leading-8 mb-6">
              Write a few honest lines based on
              this prompt.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
              <p className="text-xl sm:text-2xl leading-9 text-cyan-200">
                {journalPrompts[promptIndex]}
              </p>
            </div>

            <button
              type="button"
              onClick={changePrompt}
              className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl text-white font-semibold hover:bg-white/20 transition flex items-center gap-3"
            >
              <FaRedo />
              New Prompt
            </button>
          </motion.div>

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
          >
            <div className="bg-blue-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-blue-300 mb-6">
              <FaHeart />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Gentle Affirmation
            </h2>

            <p className="text-slate-300 leading-8 mb-6">
              Read this slowly and repeat it if
              it feels helpful.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
              <p className="text-xl sm:text-2xl leading-9 text-cyan-200">
                {affirmations[affirmationIndex]}
              </p>
            </div>

            <button
              type="button"
              onClick={changeAffirmation}
              className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl text-white font-semibold hover:bg-white/20 transition flex items-center gap-3"
            >
              <FaRedo />
              New Affirmation
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Calm-Down Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {calmSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-slate-300 leading-8"
              >
                <span className="text-cyan-300 font-semibold">
                  {index + 1}.
                </span>{" "}
                {step}
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-sm leading-7 mt-8">
            MindCare tools are for reflection,
            emotional grounding, and wellness
            support. They are not a replacement
            for professional mental health care.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default MindCare;