import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaBrain,
  FaHeart,
  FaBookOpen,
  FaChartLine,
} from "react-icons/fa";

import "@fontsource/poppins";

function Home() {
  return (
    <div
      className="min-h-screen text-white overflow-x-hidden relative"
      style={{
        fontFamily: "Poppins, sans-serif",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1d4ed8)",
      }}
    >
      <div className="absolute top-0 left-0 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 md:pt-40 pb-20 md:pb-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center mb-20 md:mb-32"
        >
          <div className="inline-flex max-w-full items-center gap-3 bg-white/10 border border-white/10 px-4 md:px-6 py-3 rounded-full mb-8 md:mb-10 backdrop-blur-xl">
            <FaBrain className="text-cyan-300 shrink-0" />

            <p className="uppercase tracking-[0.18em] md:tracking-[0.3em] text-cyan-200 text-[10px] md:text-sm leading-relaxed">
              MindMirror Emotional Wellness Platform
            </p>
          </div>

          <h1 className="font-bold leading-tight mb-8 md:mb-10 text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="block">Understand Your</span>

            <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Emotional World
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-2xl leading-8 md:leading-[2] max-w-4xl mx-auto mb-10 md:mb-14">
            MindMirror is an immersive emotional wellness and psychology
            platform designed to help users explore self-awareness, emotional
            intelligence, cognitive patterns, and reflective personal growth.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/quizzes">
              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 px-7 md:px-10 py-4 md:py-5 rounded-3xl text-base md:text-xl font-semibold shadow-2xl shadow-blue-500/20"
              >
                Explore Assessments
              </motion.button>
            </Link>

            <Link to="/blogs">
              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="w-full sm:w-auto bg-white/10 border border-white/10 px-7 md:px-10 py-4 md:py-5 rounded-3xl text-base md:text-xl font-semibold backdrop-blur-xl"
              >
                Read Psychology Insights
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32">
          <motion.div
            whileHover={{
              y: -10,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-7 md:p-10 shadow-2xl"
          >
            <div className="bg-cyan-500/20 w-16 md:w-20 h-16 md:h-20 rounded-3xl flex items-center justify-center text-3xl md:text-4xl text-cyan-300 mb-6 md:mb-8">
              <FaHeart />
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-5 md:mb-6 leading-tight">
              Guided Self-Reflection
            </h2>

            <p className="text-slate-300 text-base md:text-xl leading-8 md:leading-9">
              Explore emotional awareness, stress patterns, behavioral
              tendencies, and psychological insights through immersive wellness
              experiences.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-7 md:p-10 shadow-2xl"
          >
            <div className="bg-blue-500/20 w-16 md:w-20 h-16 md:h-20 rounded-3xl flex items-center justify-center text-3xl md:text-4xl text-blue-300 mb-6 md:mb-8">
              <FaBookOpen />
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-5 md:mb-6 leading-tight">
              Psychology Library
            </h2>

            <p className="text-slate-300 text-base md:text-xl leading-8 md:leading-9">
              Explore emotional wellness resources, behavioral psychology, and
              reflective learning content from trusted sources.
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-7 md:p-10 shadow-2xl"
          >
            <div className="bg-cyan-500/20 w-16 md:w-20 h-16 md:h-20 rounded-3xl flex items-center justify-center text-3xl md:text-4xl text-cyan-300 mb-6 md:mb-8">
              <FaChartLine />
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-5 md:mb-6 leading-tight">
              Emotional Growth
            </h2>

            <p className="text-slate-300 text-base md:text-xl leading-8 md:leading-9">
              Receive emotionally adaptive reflections, wellness guidance, and
              self-awareness suggestions.
            </p>
          </motion.div>
        </div>

        <div className="mb-20 md:mb-32">
          <h2 className="text-3xl md:text-6xl font-bold text-center mb-10 md:mb-20 leading-tight">
            Featured Experiences
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-7 md:p-10 shadow-2xl"
            >
              <p className="uppercase tracking-[0.22em] md:tracking-[0.3em] text-cyan-300 text-xs md:text-sm mb-5">
                Featured Assessment
              </p>

              <h3 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                Emotional Intelligence Analysis
              </h3>

              <p className="text-slate-300 text-base md:text-xl leading-8 md:leading-9 mb-8 md:mb-10">
                Understand emotional awareness, empathy, communication
                patterns, and emotional regulation through immersive
                self-reflection.
              </p>

              <Link to="/quizzes">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 px-7 md:px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-blue-500/20"
                >
                  Explore Assessment
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-7 md:p-10 shadow-2xl"
            >
              <p className="uppercase tracking-[0.22em] md:tracking-[0.3em] text-cyan-300 text-xs md:text-sm mb-5">
                Featured Insight
              </p>

              <h3 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                Understanding Anxiety and Overthinking
              </h3>

              <p className="text-slate-300 text-base md:text-xl leading-8 md:leading-9 mb-8 md:mb-10">
                Explore how repetitive thinking, emotional stress, and cognitive
                overload influence emotional wellbeing and mental clarity.
              </p>

              <Link to="/blogs?topic=anxiety%20overthinking">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="w-full sm:w-auto bg-white/10 border border-white/10 px-7 md:px-8 py-4 rounded-2xl font-semibold backdrop-blur-xl"
                >
                  Read Insight
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] md:rounded-[50px] px-6 sm:px-8 md:px-16 py-10 md:py-16 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 md:mb-10 leading-tight">
            <span className="block">Begin Your</span>
            <span className="block">Emotional</span>
            <span className="block">Reflection</span>
            <span className="block">Journey</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg md:text-2xl leading-8 md:leading-[2] max-w-4xl mx-auto mb-10 md:mb-12">
            Explore psychology, emotional intelligence, wellness patterns, and
            self-awareness through immersive digital experiences.
          </p>

          <Link to="/quizzes">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 px-8 md:px-12 py-5 md:py-6 rounded-3xl text-lg md:text-2xl font-semibold shadow-2xl shadow-blue-500/20"
            >
              Start Exploring
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;